/**
 * Checks if a field is not empty.
 *
 * @param {String} value - The value of the field.
 * @param {String} field - The name of the field.
 * @returns {String | null} - Returns a message if the field is empty; otherwise, returns null.
 */
export function fieldNotEmpty(value, field) {
  return !value || value.trim().length === 0
    ? { msg: `${field} must not be empty.` }
    : null;
}

/**
 * Checks if a field is a valid email.
 *
 * @param {String} value - The value of the email field.
 * @returns {String | null} - Returns a message if the email is not valid; otherwise, returns null.
 */
export function fieldIsEmail(value) {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? { msg: `${value} isn't a valid email.` }
    : null;
}

/**
 * Checks if two passwords match.
 *
 * @param {String} password - The first password.
 * @param {String} password2 - The second password to compare.
 * @returns {String | null} - Returns a message if passwords don't match; otherwise, returns null.
 */
export function passwordMatches(password, password2) {
  return password !== password2 ? { msg: "Password doesn't match" } : null;
}

/**
 * Checks if a field's length exceeds a maximum length.
 *
 * @param {String} value - The value of the field.
 * @param {Number} maxLength - The maximum allowed length.
 * @param {String} field - The name of the field.
 * @returns {String | null} - Returns a message if the length exceeds maxLength; otherwise, returns null.
 */
export function fieldMaxLength(value, maxLength, field) {
  return value.length > maxLength
    ? { msg: `${field} must be at least ${maxLength} characters long.` }
    : null;
}

/**
 * Checks if a field's length is below a minimum length.
 *
 * @param {String} value - The value of the field.
 * @param {Number} minLength - The minimum required length.
 * @param {String} field - The name of the field.
 * @returns {String | null} - Returns a message if the length is below minLength; otherwise, returns null.
 */
export function fieldMinLength(value, minLength, field) {
  return !value || value.length < minLength
    ? { msg: `${field} must be at least ${minLength} characters long.` }
    : null;
}

/**
 * Checks if a field's length is within a specified range.
 *
 * @param {String} value - The value of the field.
 * @param {Number} minLength - The minimum required length.
 * @param {Number} maxLength - The maximum allowed length.
 * @param {String} field - The name of the field.
 * @returns {String | null} - Returns a message if the length is outside the specified range; otherwise, returns null.
 */
export function fieldLengthRange(value, minLength, maxLength, field) {
  return typeof fieldMaxLength(value, maxLength, field) === 'string' ||
    typeof fieldMinLength(value, minLength, field) === 'string'
    ? {
        msg: `${field} must be within the range of ${minLength} to ${maxLength} characters.`,
      }
    : null;
}

/**
 * Applies an array of validation functions to a request object and returns an array of error messages.
 *
 * @param {Function[]} validations - Array of validation functions.
 * @param {Express.Request} req - The Express Request object.
 * @returns {String[]} - An array of error messages. Returns an empty array if there are no errors.
 */
export const handleValidation = (validations, req, _res) => {
  return validations
    .map((validation) => validation(req))
    .filter((result) => result !== null && result !== undefined);
};
