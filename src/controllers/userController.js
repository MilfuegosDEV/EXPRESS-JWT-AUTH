import UserService from '../services/userService.js';
import {
  fieldNotEmpty,
  fieldMinLength,
  passwordMatches,
  fieldIsEmail,
  handleValidation,
} from '../middlewares/validators.js';

/**
 * Controller for users requests
 * @extends {UserService}
 */
export class UserController extends UserService {
  /**
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {ErrorCallback} next
   * @returns { Promise<{name: String, lastname: String, email: String, password: String, creationDate: Date, verificated: Boolean } >}
   * @throws {Error}
   */
  async createUser(req, res, next) {
    const validations = [
      (req) => fieldNotEmpty(req.body.name, 'name'),
      (req) => fieldNotEmpty(req.body.lastname, 'lastname'),
      (req) => fieldNotEmpty(req.body.email, 'email'),
      (req) => fieldNotEmpty(req.body.password, 'password'),
      (req) => fieldNotEmpty(req.body.password2, 'Confirm password'),
      (req) => passwordMatches(req.body.password, req.body.password2),
      (req) => fieldMinLength(req.body.password, 8, 'password'),
      (req) => fieldIsEmail(req.body.email),
    ];

    const errors = handleValidation(validations, req);

    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    try {
      // Creates a new user
      const user = await super.createUser(req.body);

      return res
        .status(201)
        .json({ result: { msg: 'User registered successfully', user: user } });
    } catch (err) {
      // for uniqueness constraint
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ errors: { msg: `${err.keyValue.email} already in use.` } });
      }
      return next(err);
    }
  }

  /**
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {ErrorCallback} next
   * @returns { Promise<{name: String, lastname: String, email: String, password: String, creationDate: Date, verificated: Boolean } >}
   * @throws {Error}
   */
  async findByID(req, res, next) {
    const validations = [(req) => fieldNotEmpty(req.query.id, 'id')];
    const errors = handleValidation(validations, req);

    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    try {
      const user = await super.findByID(req.query.id);

      if (user === null) {
        return res.status(404).json({ errors: [{ msg: 'User not found' }] });
      }

      return res.status(200).json({ user: user });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(422).json({ errors: [{ msg: 'Invalid id' }] });
      }
      return next(err);
    }
  }
}

export default new UserController();
