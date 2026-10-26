const fs = require('fs');

const images = JSON.parse(fs.readFileSync('extracted_images.json', 'utf8'));
const logoEduBase64 = fs.readFileSync('logo_edu.jpg').toString('base64');
let template = fs.readFileSync('template.html', 'utf8');

// Replace Image Tokens
template = template.split('{{LOGO_EDU}}').join('data:image/jpeg;base64,' + logoEduBase64);
// Replace all occurrences of all image tokens
const tokens = ['dI', 'nI', 'LI', 'SI', 'DI', 'PI', '_I', 'mI', 'fI', 'oI', 'hI', 'aL', 'cL', 'd'];
for (const key of tokens) {
  if (images[key]) {
    template = template.split(`{{IMAGE_${key}}}`).join(images[key]);
  }
}

fs.writeFileSync('index.html', template, 'utf8');
console.log('Successfully generated index.html! File size:', fs.statSync('index.html').size);
