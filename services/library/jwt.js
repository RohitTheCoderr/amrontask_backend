import jwt from "jsonwebtoken";

export function jwtGenToken(id) {
  const key = process.env.JWT_SECRET_KEY;
  const expiretime = process.env.JWT_EXPIRES_IN;
  if (!key || !expiretime) {
    throw new Error("jwt_secret_key or jwt_expire is not present in env file");
  }

  const options = { expiresIn: expiretime };
  const payload = { userID: id };
  try {
    const token = jwt.sign(payload, key, options);
    console.log("token in jwt", token);
    
    return token;
  } catch (error) 
  {
    throw new Error("Token not generated");
  }
}


export function jwtVerifyToken(token) {
    const key = process.env.JWT_SECRET_KEY;

    if (!key ) 
    { throw new Error("JWT_SECRET_KEY is not defined in env file") }

    console.log("tokrn", token);
    
      try {
          const decode = jwt.verify(token, key);
          return decode;
      } catch (error) {
          console.log(`Exception occurred at validation token ${error}`)
          throw new Error('Token validator failed');
        }
}
