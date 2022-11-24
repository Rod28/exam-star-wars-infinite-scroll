// Validations
import {
  isValidText,
  isValidSpaces,
  isValidMail,
  isValidPhone
} from '../helpers/validations';

/**
 * La funcion regresa un objeto que indica que el campo es obligatorio.
 */
export const Rule_Required = {
  required: { value: true, message: 'rules.required' }
};

/**
 * La funcion regresa un texto de error, en caso de que `value` no contenga
 * la longitud deseada.
 * @param length Numero de caracteresvalidos
 */
export const Rule_MinLength = (length: number) => ({
  validate: {
    formatMinLength: (value: string): string | undefined => {
      if (value.length < length) {
        if (length === 3) {
          return 'rules.invalidMinLenght3';
        }

        if (length === 8) {
          return 'rules.invalidMinLenght8';
        }

        return 'rules.invalidMinLenght';
      }
    }
  }
});

/**
 * La funcion regresa un texto de error, en caso de que `value` no contenga
 * caracteres validos.
 */
export const Rule_OnlyText = {
  validate: {
    formatText: (value: string): string | undefined => {
      if (!isValidText(value)) {
        return 'rules.invalidText';
      }
    }
  }
};

/**
 * La funcion regresa un texto de error, en caso de que `value` no contenga
 * elcaracteres validos o la longitus esperada.
 */
export const Rule_WithoutSpaces = {
  validate: {
    formatTextWithoutSpaces: (value: string): string | undefined => {
      if (value && isValidSpaces(value)) {
        return 'rules.invalidText';
      }
    }
  }
};

/**
 * La funcion regresa un texto de error, en caso de que `value` no sea
 * un correo valido.
 */
export const Rule_Mail = {
  validate: {
    formatMail: (value: string): string | undefined => {
      if (!isValidMail(value)) {
        return 'rules.invalidMail';
      }
    }
  }
};

/**
 * La funcion regresa un texto de error, en caso de que `value` no sea
 * un numero telefonico valido.
 */
export const Rule_Phone = {
  validate: {
    formatPhone: (value: string): string | undefined => {
      if (!isValidPhone(value)) {
        return 'rules.invalidPhone';
      }
    }
  }
};
