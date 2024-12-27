import fs from 'fs';
import path from 'path';

interface SeoDetail {
  title?: string;
  description?: string;
  image?: string;
}

export function appendSeoDetail({ title, description, image }: SeoDetail): string {
  const _title = title ?? 'POUCH - Packaging News App';
  const _subtitle =
    description ??
    'Pouch is a news aggregator application for the Packaging industry that summarises news articles and stories sourced from various third-party links including industry journals, expert blogs, and innovative company releases';
  const _image = image ?? 'https://www.pouch.news/cropped-pulse%201.png';

  // Load HTML template
  const templatePath = path.join(__dirname, '../index.html');

  try {
    // Replace placeholders with provided content
    const source = fs
      .readFileSync(templatePath, { encoding: 'utf-8' })
      .replace(/{{title}}/g, _title)
      .replace(/{{description}}/g, _subtitle)
      .replace(/{{image}}/g, _image);

    return source;
  } catch (error: any) {
    throw new Error(`Error reading or processing template: ${error.message}`);
  }
}
