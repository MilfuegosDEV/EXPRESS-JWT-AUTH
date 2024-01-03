import i18n from 'i18n';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

class Controller extends UserService {
  async signin(req, res, next) {
    try {
      const user = await super.findbyEmail(req.body.email);

      // User not found
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: i18n.__('messages.error.userNotFound') }] });
      }

      const matchPassword = await bcryptjs.compare(
        req.body.password,
        user.password
      );

      // Password don't match
      if (!matchPassword) {
        return res.status(401).json({
          token: null,
          errors: [{ msg: i18n.__('messages.error.invalidPassword') }],
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(200).json({ token: token });
    } catch (err) {
      return next(err);
    }
  }
}

const AuthController = new Controller();

export default AuthController;
