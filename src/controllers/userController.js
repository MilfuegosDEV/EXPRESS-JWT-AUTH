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
      await super.createUser({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });

      return res.status(201).json({
        result: [
          { msg: 'User registered successfully' },
          { msg: 'Check your email to validate your account.' },
        ],
      });
    } catch (err) {
      // for uniqueness constraint
      if (err.code === 11000) {
        return res
          .status(403)
          .json({ errors: { msg: `${err.keyValue.email} already in use.` } });
      }
      return next(err);
    }
  }

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

      return res.status(200).json({ result: user });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(422).json({ errors: [{ msg: 'Invalid id' }] });
      }
      return next(err);
    }
  }

  async getAll(_req, res, next) {
    try {
      const users = await super.getAll();

      if (!users || users.length === 0) {
        return res.status(404).json({ errors: [{ msg: 'Users not found' }] });
      }

      return res.status(200).json({ result: users });
    } catch (err) {
      return next(err);
    }
  }

  async updateUser(req, res, next) {
    const validations = [
      (req) => (!req.body.id ? { msg: "User's id not supplied" } : null),
    ];

    // if data was not supply.
    if (!req.body.password && !req.body.password2 && !req.body.email) {
      return res.status(422).json({ errors: [{ msg: 'Data not provided' }] });
    }

    if (req.body.password || req.body.password2) {
      // if password is provided to update.
      validations.push(
        (req) => fieldNotEmpty(req.body.password, 'password'),
        (req) => fieldNotEmpty(req.body.password2, 'Confirm password'),
        (req) => passwordMatches(req.body.password, req.body.password2)
      );
    }

    // if email is provided to update.
    if (req.body.email) {
      validations.push((req) => fieldIsEmail(req.body.email));
    }

    const errors = handleValidation(validations, req);

    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }

    try {
      await super.updateUser(req.body.id, {
        email: req.body.email,
        password: req.body.password,
      });

      return res.status(200).json({ result: [{ msg: 'User updated!' }] });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(422).json({ errors: [{ msg: 'Invalid id' }] });
      }
      // for uniqueness constraint
      if (err.code === 11000) {
        return res
          .status(403)
          .json({ errors: [{ msg: `${err.keyValue.email} already in use.` }] });
      }
      return next(err);
    }
  }
}

//
const userController = new UserController();
export default userController;
