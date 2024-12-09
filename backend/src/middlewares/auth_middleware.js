import jwt from 'jsonwebtoken';
import { app_key } from '../../config/app.js';

export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token is missing.' });
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token, app_key, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token.' });

      req.user = user;
      next();
    });
  };
  

