const crypto = require('crypto')
exports.generateVerificationToken=()=>{
    return crypto.randomBytes(32).toString('hex')
}

