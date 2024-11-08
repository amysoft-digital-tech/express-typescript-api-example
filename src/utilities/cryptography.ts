import * as crypto from "crypto";

const generateSalt = () => {
    return crypto.randomBytes(32).toString('hex');
};

const hashPassword = (password: string, salt: string) => {
    const hmac = crypto.createHmac('sha256', salt);
    hmac.update(password);
    return hmac.digest('hex');
};

export default {
    generateSalt,
    hashPassword,
}