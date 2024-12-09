import ClientError from './ClientError.js';

class InputError extends ClientError {
  constructor(message) {
    super(message, 400);
    this.name = 'InputError';
  }
}

export default InputError;