import crypto from "crypto";

export const genPassword = (password:string) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

  return {
    salt,
    hash,
  };
};

export const validatePassword = (password:string, hash:string, salt:string) => {
  const hashVarify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVarify;
};

