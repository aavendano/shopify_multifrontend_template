const fs = require('fs');

// src/atoms/StockLabel.astro
let content = fs.readFileSync('src/atoms/StockLabel.astro', 'utf-8');
content = content.replace("let status = 'in-stock';", "");
fs.writeFileSync('src/atoms/StockLabel.astro', content);

// src/molecules/FormField.astro
content = fs.readFileSync('src/molecules/FormField.astro', 'utf-8');
content = content.replace("const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;", "const inputId = id || `input-${Math.random().toString(36).substring(2, 11)}`;");
content = content.replace("<Input id={inputId} {...inputProps} error={!!error} />", "<Input id={inputId} {...(inputProps as any)} error={!!error} />");
fs.writeFileSync('src/molecules/FormField.astro', content);

// src/molecules/QuantitySelector.astro
content = fs.readFileSync('src/molecules/QuantitySelector.astro', 'utf-8');
content = content.replace("const update = (newValue) => {", "const update = (newValue: number) => {");
fs.writeFileSync('src/molecules/QuantitySelector.astro', content);

// src/organisms/ProductGallery.astro
content = fs.readFileSync('src/organisms/ProductGallery.astro', 'utf-8');
content = content.replace("const btn = e.target.closest('.thumbnail-btn');", "const target = e.target as HTMLElement;\n      if (!target) return;\n      const btn = target.closest('.thumbnail-btn');");
fs.writeFileSync('src/organisms/ProductGallery.astro', content);

// src/pages/test-organisms.astro
content = fs.readFileSync('src/pages/test-organisms.astro', 'utf-8');
content = content.replace("detail.formData.forEach((value, key) => {", "detail.formData.forEach((value: any, key: string) => {");
fs.writeFileSync('src/pages/test-organisms.astro', content);
