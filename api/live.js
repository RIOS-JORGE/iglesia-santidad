/**
 * Live-status probe for the church YouTube channel.
 *
 * This runs server-side on purpose: the browser cannot inspect a cross-origin
 * YouTube iframe, and YouTube stopped exposing the live state in the channel
 * page HTML, so client-side detection is not possible.
 *
 * Uses the official YouTube Data API v3 (2 quota units per cold check):
 *   1. playlistItems.list -> latest uploads (live streams appear there)
 *   2. videos.list        -> liveStreamingDetails for those videos
 */
const CHANNEL_ID = 'UCMbh0FCJ4JHtwMap7hi0FrK';
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;
const MAX_RESULTS = 10;
const CACHE_SECONDS = 45;
const REQUEST_TIMEOUT_MS = 5000;

export default async function handler(request, response) {
  response.setHeader(
    'Cache-Control',
    `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=180`,
  );

  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) {
    response.status(200).json({ live: false, videoId: null, configured: false });
    return;
  }

  try {
    const broadcast = await findLiveBroadcast(apiKey);
    response.status(200).json({
      ...broadcast,
      configured: true,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Never break the section because YouTube is slow or the quota ran out.
    response.status(200).json({
      live: false,
      videoId: null,
      configured: true,
      unavailable: true,
      reason: describeError(error),
    });
  }
}

async function findLiveBroadcast(apiKey) {
  const videoIds = await fetchRecentVideoIds(apiKey);
  if (videoIds.length === 0) return { live: false, videoId: null };

  const videos = await fetchVideos(apiKey, videoIds);
  const liveVideo = videos.find(isLiveNow);
  if (!liveVideo) return { live: false, videoId: null };

  return {
    live: true,
    videoId: liveVideo.id,
    title: liveVideo.snippet?.title ?? null,
  };
}

function isLiveNow(video) {
  const details = video.liveStreamingDetails;
  return Boolean(details?.actualStartTime) && !details?.actualEndTime;
}

async function fetchRecentVideoIds(apiKey) {
  const params = new URLSearchParams({
    part: 'contentDetails',
    playlistId: UPLOADS_PLAYLIST_ID,
    maxResults: String(MAX_RESULTS),
    key: apiKey,
  });
  const data = await fetchJson(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`);

  return (data.items ?? [])
    .map((item) => item?.contentDetails?.videoId)
    .filter((id) => typeof id === 'string' && id.length > 0);
}

async function fetchVideos(apiKey, videoIds) {
  const params = new URLSearchParams({
    part: 'snippet,liveStreamingDetails',
    id: videoIds.join(','),
    key: apiKey,
  });
  const data = await fetchJson(`https://www.googleapis.com/youtube/v3/videos?${params}`);
  return data.items ?? [];
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    let detail = '';
    try {
      const payload = await response.json();
      detail = payload?.error?.message ?? '';
    } catch {
      // Body was not JSON; the status code is enough.
    }
    throw new Error(
      `YouTube API responded ${response.status}${detail ? `: ${detail}` : ''}`,
    );
  }
  return response.json();
}

function describeError(error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  return message.slice(0, 180);
}
