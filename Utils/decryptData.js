const CryptoJS = require('crypto-js');

exports.decryptData=(encryptedData) =>{
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'sonamkotauko');
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}