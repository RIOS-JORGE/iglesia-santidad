export default function handler(req, res) {
  const siteUrl = process.env.SITE_URL || 'https://iglesia-santidad-orcin.vercel.app';
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).json({ error: 'GITHUB_CLIENT_ID not configured' });
    return;
  }

  const redirectUri = `${siteUrl}/api/callback`;
  const state = Math.random().toString(36).substring(7);

  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=repo` +
    `&state=${state}`;

  res.redirect(302, url);
}
