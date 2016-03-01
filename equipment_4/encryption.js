'use strict'

const secret="adllsdfjalkldjkhfalkdjguiylha";

const algorithms = 'aes-256-ctr';

const crypto = require('crypto');

class Encryption {
  salt(){
    return crypto.randomBytes(32).toString('hex').slice(0,32);
  }

  digest(plaintext) {
    const hash = crypto.createHash('sha256');
    hash.update(plaintext);
    return hash.digest('hex');
  }

  cipher(plaintext) {
    crypto.createCipher(algorithms, secret);
    var encrypted = cipher.update(plaintext);
    encrypted += cipher.final('utf8');
    return encrypted
  }

  decipher(ciphertext) {
    const decipher = crypto.createCipher(algorithms, secret);
    var deciphered = decipher.update(ciphertext, 'hex', 'utf8');
    deciphered += decipher.final('utf8');
    return deciphered;
  }
}

module.exports = exports = new Encryption();
