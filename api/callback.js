export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.github_client_id;
  const clientSecret = process.env.github_client_secret;

  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'github_client_id or github_client_secret not configured' });
  }

  let token = null;
  let errorMsg = null;

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
      errorMsg = `GitHub error: ${data.error} - ${data.error_description || ''}`;
    } else if (!data.access_token) {
      errorMsg = 'No access_token in GitHub response';
    } else {
      token = data.access_token;
    }
  } catch (err) {
    errorMsg = `Fetch error: ${err.message}`;
  }

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; padding: 2rem; text-align: center; background: #1E3A5F; color: #F8FAFC; }
    .error { color: #FCA5A5; }
    .success { color: #86EFAC; }
  </style>
</head>
<body>
  <h2>Autenticación</h2>
  ${token
    ? `<p class="success">✅ Token obtenido correctamente</p>`
    : `<p class="error">❌ Error: ${errorMsg || 'Desconocido'}</p>`
  }
  <p>Cerrando ventana...</p>
  <script>
    const token = ${token ? `'${token}'` : 'null'};
    const error = ${errorMsg ? `'${errorMsg}'` : 'null'};

    if (token && window.opener) {
      window.opener.postMessage({ token: token, provider: 'github' }, 'https://iglesia-santidad-orcin.vercel.app');
    }

    setTimeout(function() {
      window.close();
      if (!window.closed) {
        document.body.innerHTML += '<p>No se pudo cerrar automáticamente. Podés cerrar esta ventana.</p>';
      }
    }, 1500);
  </script>
</body>
</html>
  `);
}
