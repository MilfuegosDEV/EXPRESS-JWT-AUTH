import i18n from 'i18n';

export function fieldNotEmpty(value, field) {
  return !value || value.trim().length === 0
    ? { msg: i18n.__('messages.error.fieldEmpty', field) }
    : null;
}

export function fieldIsEmail(value) {
  return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? { msg: i18n.__('messages.error.fieldIsNotEmail') }
    : null;
}

export function passwordMatches(password, password2) {
  return password !== password2 && password && password2
    ? { msg: i18n.__('messages.error.passwordDontMatches') }
    : null;
}

export function fieldMaxLength(value, maxLength, field) {
  return value.length > maxLength
    ? { msg: i18n.__('messages.error.fieldMaxLength', field, maxLength) }
    : null;
}

export function fieldMinLength(value, minLength, field) {
  return value && value.length < minLength
    ? { msg: i18n.__('messages.error.fieldMinLength', field, minLength) }
    : null;
}

export function fieldLengthRange(value, minLength, maxLength, field) {
  return value.length < minLength || value.length > maxLength
    ? {
        msg: i18n.__(
          'messages.error.fieldLengthRange',
          field,
          minLength,
          maxLength
        ),
      }
    : null;
}

export const handleValidation = (validations, req, res, next) => {
  const errors = validations
    .map((validation) => validation(req))
    .filter((result) => result !== null && result !== undefined);
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }
  next();
};
