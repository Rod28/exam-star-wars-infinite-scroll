// Types
import { SubmitProps, Props, ButtonPropsReturn } from './types';

/**
 * Funcion que se encarga de crear los estilos dinanimos del componente
 * Button y Submit
 * @param param Props del component Button o Submit
 * @returns Regresa un nuevo objeto con las clases dinamicas para el componente
 */
export const generateDynamicStyles = ({
  title,
  className,
  template,
  ariaLabel,
  color,
  textColor,
  size,
  shape,
  disabled
}: SubmitProps): ButtonPropsReturn => {
  // Tetx's colors
  const baseColor = color === 'white' ? 'text-black' : 'text-white';
  const templateColor = template && color ? `text-${color}` : baseColor;
  const classTextColor = textColor ? `text-${textColor}` : templateColor;
  const classTextColorDisabled = disabled ? 'text-gray-500' : classTextColor;

  // Background's colors
  const classBackgroundColor = !template ? `bg-${color}` : '';
  const classBackgroundColorDisabled = disabled
    ? 'bg-gray-400'
    : classBackgroundColor;

  // Border's colors
  const classBorderColor = template !== 'text' ? `border-${color}` : '';
  const classBorderColorDisabled = disabled
    ? 'border-gray-400'
    : classBorderColor;

  // Styles disabled
  const stylesDisabled = disabled ? 'button--disabled' : '';

  // Classes group
  const classesButtonText = `
    button
    button--${template}
    button--${size}
    button--${shape}
    ${classTextColorDisabled}
    ${classBackgroundColorDisabled}
    ${classBorderColorDisabled}
    ${stylesDisabled}
    ${className}
  `;
  const classesButtonIcon = `
    button
    button__icon
    button--${template}
    button__icon--${size}
    button__icon--${shape}
    ${classTextColorDisabled}
    ${classBackgroundColorDisabled}
    ${classBorderColorDisabled}
    ${stylesDisabled}
    ${className}
  `;

  // Agrega los props del elemento button
  let buttonProps: Props = {
    'aria-label': ariaLabel,
    disabled
  };

  if (title) {
    buttonProps.className = classesButtonText;
  }

  // Agrega las clases que necesita el componente Icon
  const classStartIcon = title
    ? 'button__has-icon button__has-icon--left'
    : classesButtonIcon;
  const classEndIcon = 'button__has-icon button__has-icon--right';

  return {
    buttonProps,
    classStartIcon,
    classEndIcon
  };
};
