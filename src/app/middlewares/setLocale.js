import i18n from 'i18n';

export function setLocale(req, _res, next) {
  i18n.setLocale(req.language);
  next();
}
