import i18n from 'i18n';
import UserService from '../services/user.service';

/**
 * Controller for users requests
 * @extends {UserService}
 */
export class Controller extends UserService {
  async createUser(req, res, next) {
    try {
      await super.createUser({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.roles,
      });

      return res.status(201).json({
        result: {
          success: [{ msg: i18n.__('messages.success.new') }],
          info: [{ msg: i18n.__('messages.info.requestValidateEmail') }],
        },
      });
    } catch (err) {
      // for uniqueness constraint
      if (err.code === 11000) {
        return res.status(403).json({
          errors: {
            msg: i18n.__('messages.error.alreadyInUse', err.keyValue.email),
          },
        });
      }
      return next(err);
    }
  }

  async ownAccount(req, res, next) {
    try {
      const user = await super.findOwnAccount(req.userID);

      if (user === null) {
        return res.status(404).json({
          errors: [
            {
              msg: i18n.__('messages.error.documentNotFound'),
            },
          ],
        });
      }

      return res.status(200).json({ result: user });
    } catch (err) {
      if (err.name === 'CastError') {
        return res
          .status(422)
          .json({ errors: [{ msg: i18n.__('messages.error.invalidID') }] });
      }
      return next(err);
    }
  }

  async findByID(req, res, next) {
    try {
      let user = await super.findByID(req.params.id);

      if (user === null) {
        return res.status(404).json({
          errors: [
            {
              msg: i18n.__('messages.error.documentNotFound'),
            },
          ],
        });
      }

      return res.status(200).json({ result: user });
    } catch (err) {
      if (err.name === 'CastError') {
        return res
          .status(422)
          .json({ errors: [{ msg: i18n.__('messages.error.invalidID') }] });
      }
      return next(err);
    }
  }

  async getAll(_req, res, next) {
    try {
      const users = await super.getAll();

      if (!users || users.length === 0) {
        return res.status(404).json({
          errors: [{ msg: i18n.__('messages.error.documentsNotFound') }],
        });
      }

      return res.status(200).json({ result: users });
    } catch (err) {
      return next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      await super.updateUser(req.params.id, req.body);

      return res.status(200).json({
        result: {
          success: [
            {
              msg: i18n.__('messages.success.update'),
            },
          ],
        },
      });
    } catch (err) {
      if (err.name === 'CastError') {
        return res
          .status(422)
          .json({ errors: [{ msg: i18n.__('messages.error.invalidID') }] });
      }
      // for uniqueness constraint
      if (err.code === 11000) {
        return res.status(403).json({
          errors: {
            msg: i18n.__('messages.error.alreadyInUse', err.keyValue.email),
          },
        });
      }
      return next(err);
    }
  }
}

const UserController = new Controller();
export default UserController;
