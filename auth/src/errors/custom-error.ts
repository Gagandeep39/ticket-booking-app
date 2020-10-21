/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 14:28:23
 * @modify date 2020-10-21 14:28:23
 * @desc Abstract class to define structure of Errors. Interface dot ecist in JS and abstract class do, also it allows usig 'instance of'
 */
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
