const fs = require('fs');

const path = 'src/layouts/BaseLayout.astro';

const newScript = `---
import '../styles/main.scss';
const { title = 'Demo' } = Astro.props;

// Determine CSP based on environment
const isProd = import.meta.env.MODE === 'production';
const scriptSrc = isProd ? "'self'" : "'self' 'unsafe-inline' 'unsafe-eval'";
const styleSrc = "'self' 'unsafe-inline'"; // Keep unsafe-inline for styles as Astro often injects them
const csp = \`default-src 'self'; script-src \${scriptSrc}; style-src \${styleSrc}; img-src 'self' data: https:; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;\`;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content={csp}>
  <title>{title}</title>
</head>
<body>
  <slot />
</body>
</html>`;

fs.writeFileSync(path, newScript, 'utf-8');
console.log('Updated BaseLayout.astro');
