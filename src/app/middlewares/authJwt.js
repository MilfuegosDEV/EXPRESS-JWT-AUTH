import i18n from 'i18n';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: i18n.__('messages.error.tokenNotProvided') }] });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id, { password: false });

    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ msg: i18n.__('message.error.userNotFound') }] });
    }

    req.userID = decoded.id;
    next();
  } catch {
    return res
      .status(401)
      .json({ errors: [{ msg: i18n.__('messages.error.unauthorized') }] });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userID, { password: false });

    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ msg: i18n.__('messages.error.userNotFound') }] });
    }

    let roles = await Role.find({ _id: { $in: user.roles } });
    roles = roles.map((role) => role.name);

    if (!roles.includes('admin')) {
      return res
        .status(403)
        .json({ errors: [{ msg: i18n.__('messages.error.forbidden') }] });
    }
    next();
  } catch {
    return res
      .status(403)
      .json({ errors: [{ msg: i18n.__('messages.error.forbidden') }] });
  }
};

export const isAdminOrSameUser = async (req, res, next) => {
  try {
    // If is not the same user who is authenticated.
    if (req.params.id !== req.userID) {
      return isAdmin(req, res, next); // Validates if the user is an administrator
    }

    next();
  } catch {
    return res
      .status(403)
      .json({ errors: [{ msg: i18n.__('messages.error.forbidden') }] });
  }
};
