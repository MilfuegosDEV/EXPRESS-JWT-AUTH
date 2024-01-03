import i18n from '../config/i18n';

export const globalErrorHandler = (err, _req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({
      errors: [{ msg: i18n.__('messages.error.serverError') }],
      info: err,
    });
    return next();
  }

  res
    .status(500)
    .json({ errors: [{ msg: i18n.__('messages.error.serverError') }] });

  return next();
};

export const resourceNotFound = (_req, res, _next) => {
  return res
    .status(404)
    .json({ errors: [{ msg: i18n.__('messages.error.notFound') }] });
};
