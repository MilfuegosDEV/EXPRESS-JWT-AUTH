import { parse } from 'accept-language-parser';

export function acceptLanguage(req, _res, next) {
  const lang = parse(req.headers['accept-language']);

  if (!lang || lang.length === 0) {
    req.language = 'en';
    return next();
  }

  req.language = lang[0].code;
  return next();
}
