import { body, validationResult} from "express-validator"

export const validateUser = [

    body('email')
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail(),
    body('password')
      .isString().withMessage('Password must be a string')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one number')
      .matches(/[\W_]/).withMessage('Password must contain at least one special character')
      .trim().escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];