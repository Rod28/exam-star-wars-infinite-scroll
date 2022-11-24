/**
 * Funcion que evalua un valor y regresa el mismo, o '- - -' si el valor es 'none'.
 * @param value Valor a evaluar
 * @returns valor por default o el actual
 */
export const getValue = (value: string): string => {
  if (value === 'none') {
    return '- - -';
  }

  return value;
};
