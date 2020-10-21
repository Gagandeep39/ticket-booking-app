/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 18:27:07
 * @modify date 2020-10-21 18:27:07
 * @desc Perform Hashing
 */
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static toHash(password: string) {
    const salt = randomBytes(8).toString('hex');

    // Returns a promise that will give us Hash
    return scryptAsync(password, salt, 64).then((buff: unknown) => {
      return `${(<Buffer>buff).toString('hex')}.${salt}`;
    });
  }
  static compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    return scryptAsync(suppliedPassword, salt, 64).then((buff: unknown) => {
      return (<Buffer>buff).toString('hex') === hashedPassword;
    });
  }

}
