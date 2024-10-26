const jwt = require('jsonwebtoken');
const { AppError } = require('../exception/errorHandler');

module.exports.createToken = async (data) => {
  try {
    const secreteKey = process.env.SECRET_KEY;
    const expireIn = '1m'; // expires in 1 minute;
    const token = await jwt.sign(data, secreteKey, {
      expiresIn: expireIn,
    });
    return token;
  } catch (error) {
    console.log('error createToken : ' + error);
  }
};

module.exports.decodeToken = async (token) => {
  try {
    jwt.verify(token, process.env.SECRET_KEY);

    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('--TokenExpiredError--', error.message);
      // return {
      //   error: true,
      //   statusCode: 500,
      //   message: 'Token is expire.',
      // };
    } else {
      console.log('Error decoding token:', error.message);
      // return {
      //   error: true,
      //   message: 'Error in decoding token',
      // };
    }
  }
};
