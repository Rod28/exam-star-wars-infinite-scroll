import { useFormContext } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
// Components
import Icon from '../Icon';
import MessageI18n from '../MessageI18n';
// Utils
import { generateDynamicStyles } from './utils';
// Types
import { SubmitProps } from './types';
// Default props
import { defaultProps } from './defaultProps';
// Styles
import './style.scss';

/**
 * Renderiza un componente boton de tipo submit que puede contener un texto e icono, cualquiera
 * de los dos o ser simplemente un icono.
 * Al ser de tipo submit debe ir dentro de un componente `Form` ya que hace uso de `react-hook-form`
 * para deshabiltar el boton en caso de que no pase la validacion del formulario.
 */
const Submit = (props: SubmitProps) => {
  // Se obtienen todos los metodos de useForm
  const {
    formState: { isValid }
  } = useFormContext();

  // Props
  const { startIcon, endIcon, title, disabled, ...resProps } = props;

  // Disabled submit
  const hasDisabled = disabled || !isValid;

  // Dynamic styles
  const { buttonProps, classStartIcon, classEndIcon } = generateDynamicStyles({
    ...resProps,
    title,
    disabled: hasDisabled
  });

  return (
    <button {...buttonProps} onClick={() => {}}>
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

Submit.defaultProps = defaultProps;

export default Submit;
