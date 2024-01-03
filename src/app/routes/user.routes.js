import i18n from 'i18n';

import { Router } from 'express';
import UserController from '../controllers/user.controller';
import {
  fieldIsEmail,
  fieldMinLength,
  fieldNotEmpty,
  handleValidation,
  isAdmin,
  isAdminOrSameUser,
  passwordMatches,
  setLocale,
  verifyToken,
} from '../middlewares';

const router = Router();

router.get('/', setLocale, [verifyToken, isAdmin], UserController.getAll);

router.get(
  '/profile/:id',
  verifyToken,
  isSameUser,
  validateUserID,
  UserController.findByID
);

router.get('/profile', setLocale, verifyToken, UserController.ownAccount);

router.post(
  '/',
  setLocale,
  [verifyToken, isAdmin],
  validateCreateUser,
  UserController.createUser
);
router.put(
  '/profile/:id',
  setLocale,
  [verifyToken, isAdminOrSameUser],
  validateUpdateUser,
  UserController.updateUser
);

export default router;

// Endpoints validations
async function validateUserID(req, res, next) {
  return handleValidation(
    [
      (req) =>
        !req.params.id
          ? { msg: i18n.__('messages.error.notProvided', 'ID') }
          : null,
    ],
    req,
    res,
    next
  );
}

async function isSameUser(req, res, next) {
  if (req.params.id === req.userID) {
    return res.status(302).redirect('/api/users/profile');
  }
  next();
}

async function validateCreateUser(req, res, next) {
  return handleValidation(
    [
      (req) => fieldNotEmpty(req.body.name, i18n.__('fields.name')),
      (req) => fieldNotEmpty(req.body.lastname, i18n.__('fields.lastname')),
      (req) => fieldNotEmpty(req.body.email, i18n.__('fields.email')),
      (req) => fieldNotEmpty(req.body.password, i18n.__('fields.password')),
      (req) =>
        fieldNotEmpty(req.body.password2, i18n.__('fields.confirm-password')),
      (req) => passwordMatches(req.body.password, req.body.password2),
      (req) => fieldMinLength(req.body.password, 8, i18n.__('fields.password')),
      (req) => fieldIsEmail(req.body.email),
    ],
    req,
    res,
    next
  );
}

async function validateUpdateUser(req, res, next) {
  const validations = [
    (req) =>
      !req.params.id
        ? { msg: i18n.__('messages.error.notProvided', 'ID') }
        : null,
  ];

  // If data was not supplied.
  if (!req.body.password && !req.body.password2 && !req.body.email) {
    return res.status(422).json({
      errors: [
        {
          msg: i18n.__('messages.error.notProvided', i18n.__('fields.email')),
        },
        {
          msg: i18n.__(
            'messages.error.notProvided',
            i18n.__('fields.password')
          ),
        },
      ],
    });
  }

  if (req.body.password || req.body.password2) {
    // If password is provided to update.
    validations.push(
      (req) => fieldNotEmpty(req.body.password, i18n.__('fields.password')),
      (req) =>
        fieldNotEmpty(req.body.password2, i18n.__('fields.confirm-password')),
      (req) => passwordMatches(req.body.password, req.body.password2),
      (req) =>
        fieldMinLength(
          req.body.password2,
          8,
          i18n.__('fields.confirm-password')
        )
    );
  }

  // If email is provided to update.
  if (req.body.email) {
    validations.push((req) => fieldIsEmail(req.body.email));
  }

  return handleValidation(validations, req, res, next);
}
