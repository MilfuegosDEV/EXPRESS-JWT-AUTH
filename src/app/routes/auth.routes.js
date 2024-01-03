import i18n from 'i18n';
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { handleValidation, fieldNotEmpty, setLocale } from '../middlewares';

const router = Router();

router.post('/signin', setLocale, validateSignIn, AuthController.signin);

export default router;

// endpoints validation
async function validateSignIn(req, res, next) {
  return handleValidation(
    [
      (req) => fieldNotEmpty(req.body.email, i18n.__('fields.email')),
      (req) => fieldNotEmpty(req.body.password, i18n.__('fields.password')),
    ],
    req,
    res,
    next
  );
}
