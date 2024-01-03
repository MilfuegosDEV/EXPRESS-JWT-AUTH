import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', '..', 'resources', 'locales'),
  defaultLocale: 'en',
  cookie: 'lang',
  objectNotation: true,
});
export default i18n;
