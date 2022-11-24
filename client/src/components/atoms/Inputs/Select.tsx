import { useCallback } from 'react';
// Components
import BaseWrapperInput from './BaseWrapperInput';
// Types
import { SelectProps, RenderInputProps } from './types';
// Default props
import { defaultProps } from './defaultProps';
// Styles
import './style.scss';

/**
 * Renderiza un input customizado que puede ser de tipo text, email o password.
 */
const Select = ({ options, onValue, ...resProps }: SelectProps) => {
  /**
   * Función que detecta el valor del input cada que se escribe en el.
   * @param e Evento del campo input
   * @param _onChangeInput Funcion onChange para cambiar el valor del input
   */
  const handleOnChange = useCallback(
    (
      e: React.ChangeEvent<HTMLSelectElement>,
      _onChangeInput: (v: string) => void
    ): void => {
      const currentName = e.target.name;
      const currentValue = e.target.value;

      _onChangeInput(currentValue);
      onValue && onValue(currentName, currentValue);
    },
    [onValue]
  );

  return (
    <BaseWrapperInput
      {...resProps}
      type="text"
      renderInput={(props: RenderInputProps) => (
        <select
          autoComplete="off"
          onChange={(v) => handleOnChange(v, props.onChangeInput)}
          // BaseWrapperInput props
          id={props.nameInput}
          name={props.nameInput}
          value={props.valueInput}
          className={props.classesInput}
          disabled={props.disabledInput}
        >
          {options.map((option, index) => {
            return (
              <option key={`id-${index}`} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      )}
    />
  );
};

Select.defaultProps = defaultProps;

export default Select;
