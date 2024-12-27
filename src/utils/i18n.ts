import path from 'path';

import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'my'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en'
});

export default i18n;
