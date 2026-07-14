export default async function handler(req, res) {
  const { code, state } = req.query;
  const clientId = process.env.github_client_id;
  const clientSecret = process.env.github_client_secret;

  if (!code) {
    res.status(400).json({ error: 'Missing code' });
    return;
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      res.status(400).json({ error: data.error });
      return;
    }

    const token = data.access_token;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    try {
      window.opener.postMessage({ token: '${token}', provider: 'github' }, '*');
    } catch(e) {
      console.error('Failed to send token:', e);
    }
    window.close();
  })();
</script>
</body>
</html>
    `);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
