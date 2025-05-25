const Joi = require('joi');

function validatesignup(data) {
  const signupschema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .pattern(/^[a-zA-Z\s\-']+$/),
    
    email: Joi.string()
      .email()
      .required(),
    
    password: Joi.string()
      .min(8)
      .max(128)
      .required()
      .pattern(/[A-Z]/)
      .pattern(/[a-z]/)
      .pattern(/\d/)
      .pattern(/[@$!%*?&]/),
    
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
  }).messages({
    'string.pattern.base': 'Invalid name format',
    'string.email': 'Please provide a valid email address',
    'string.min': 'Password must contain at least 8 characters',
    'string.max': 'Password must contain at most 128 characters',
    'string.empty': 'Password cannot be empty',
    'any.only': 'Passwords must match',
    'string.required': 'This field is required'
  });

  const { error } = signupschema.validate(data);
  if (error) {
    return { success: false, message: error.details[0].message };
  }
  return { success: true };
}

const validatelogin = (data) => {
  const loginschema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  });

  const { error } = loginschema.validate(data);
  if (error) {
    return { success: false, message: error.details[0].message };
  }
  return { success: true };
};


function authenticateuser(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}


module.exports = { validatesignup, validatelogin, authenticateuser};
