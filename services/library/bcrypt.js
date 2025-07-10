import bcrypt, { hashSync } from "bcrypt";

export const createHashedPassword = async (userplainpassword) => {
  const salttime = 10;
  try {
    const sec_key = process.env.SECRET_KEY;
    if (!sec_key) {
      console.log("secret key in not found in env file");
    }

    const salt = await bcrypt.genSalt(salttime);
    const hashedpassword = await bcrypt.hash(userplainpassword + sec_key, salt);
     console.log("inside hashed password", hashedpassword);
      

    return hashedpassword;
  } catch (error) {
    console.log("error occurred while hashedpassword", error);
  }
};

export const verifiedhashedpassword = async (
  userplainpassword,
  hashedpassword
) => {
  try {
    const sec_key = process.env.SECRET_KEY;
    if (!sec_key) {
      console.log("secret key in not found in env file");
    }
    const result = await bcrypt.compare(
      userplainpassword + sec_key,
      hashedpassword
    );
    return result;
  } catch (error) {
    console.log("error occured while verifying password", error);
  }
};
