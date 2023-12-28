/**
 * Express error handler.
 * @param {Error} err
 * @param {Express.Request} _req
 * @param {Express.Response} res
 * @param {ErrorCallback} _next
 * @returns
 */
export default function ErrorCallback(err, _req, res, _next) {
  res.status(500).json({ errors: [{ msg: 'Unexpected Error', info: err }] });
}
