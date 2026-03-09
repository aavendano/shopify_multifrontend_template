const fs = require('fs');

let content = fs.readFileSync('src/lib/config.ts', 'utf-8');

content = content.replace(
  /catch\s*\(\s*error\s*:\s*any\s*\)\s*\{\s*if\s*\(\s*error\.code\s*===\s*'ENOENT'\s*\)\s*\{\s*throw\s+new\s+Error\(\s*`Theme config not found for site: \$\{siteId\}`\s*\)\s*;\s*\}\s*throw\s+error\s*;\s*\}/,
  `catch (error: unknown) {\n    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {\n      throw new Error(\`Theme config not found for site: \${siteId}\`);\n    }\n    throw error;\n  }`
);

content = content.replace(
  /catch\s*\(\s*error\s*:\s*any\s*\)\s*\{\s*if\s*\(\s*error\.code\s*===\s*'ENOENT'\s*\)\s*\{\s*throw\s+new\s+Error\(\s*`Routes config not found for site: \$\{siteId\}`\s*\)\s*;\s*\}\s*throw\s+error\s*;\s*\}/,
  `catch (error: unknown) {\n    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {\n      throw new Error(\`Routes config not found for site: \${siteId}\`);\n    }\n    throw error;\n  }`
);

fs.writeFileSync('src/lib/config.ts', content);
