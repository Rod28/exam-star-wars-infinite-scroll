import { useCallback, MouseEvent } from 'react';
import isEmpty from 'lodash/isEmpty';
// Components
import Icon from '../Icon';
import MessageI18n from '../MessageI18n';
// Utils
import { generateDynamicStyles } from './utils';
// Types
import { ButtonProps } from './types';
// Default props
import { defaultProps } from './defaultProps';
// Styles
import './style.scss';

/**
 * Renderiza un componente boton que puede contener un texto e icono, cualquiera
 * de los dos o ser simplemente un icono.
 */
const Button = (props: ButtonProps) => {
  // Props
  const { startIcon, endIcon, title, onClick, ...resProps } = props;
  // Dynamic styles
  const { buttonProps, classStartIcon, classEndIcon } = generateDynamicStyles({
    ...resProps,
    title
  });

  /**
   * Manda al padre un onClick como callback.
   * @param e Evento del elemento que llama a esta funcion
   */
  const handleOnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      onClick();
    },
    [onClick]
  );

  return (
    <button {...buttonProps} onClick={handleOnClick}>
      {/* Start icon */}
      {(startIcon || isEmpty(title)) && (
        <Icon name={startIcon || ''} className={classStartIcon} />
      )}

      {/* Title */}
      <MessageI18n title={title} />

      {/* End icon */}
      {endIcon && title && <Icon name={endIcon} className={classEndIcon} />}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
