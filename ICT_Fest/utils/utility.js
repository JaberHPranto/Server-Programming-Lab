const crypto = require('crypto');

const participationCodeGenerator = () => {
    const secret = crypto.randomBytes(4).toString('hex')
    const code = crypto.createHash('sha256').update(secret).digest('hex')

    return code
}

module.exports = {
    participationCodeGenerator
};
