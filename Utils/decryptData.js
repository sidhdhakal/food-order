const CryptoJS = require('crypto-js');

exports.decryptData=(encryptedData) =>{
    const bytes = CryptoJS.AES.decrypt(encryptedData,  process.env.RSA_SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}