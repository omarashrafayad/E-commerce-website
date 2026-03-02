import jwt, { SignOptions } from 'jsonwebtoken';

const createToken = (payload: string): string => {
  return jwt.sign(
    { userId: payload },
    process.env.JWT_SECRET as jwt.Secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    }
  );
};
export default createToken;
