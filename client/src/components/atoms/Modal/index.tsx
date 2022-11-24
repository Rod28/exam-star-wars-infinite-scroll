import { useEffect } from 'react';
// Components
import Typography from '../Typography';
import Button from '../Buttons/Button';
import Icon from '../Icon';
// Helpers
import { enabledScroll, disabledScroll } from '../../../helpers/utils';
// Types
import { ModalProps } from './types';
// Styles
import './style.scss';

/**
 * Renderiza una modal personalizable que admite uno de los 3 estados, 'successful' o
 * 'warning' o 'error'.
 *
 * Cada uno de los 3 estados contiene un color de icono específico, al abrirse la modal,
 * se desactiva el scroll vertical de la app, y se reativa al cerrar la misma.
 */
const Modal = ({
  isOpen,
  type,
  title,
  message,
  textButton,
  textButtonSecondary,
  closeModal,
  actionSecondary
}: ModalProps) => {
  // Animaciones para abrir la modal
  const classesOpenModal = isOpen
    ? 'modal-notification--open'
    : 'modal-notification--close';
  const classesOpenBody = isOpen ? 'modal-notification__body--open' : '';

  /**
   * Al detectar que 'isOpen' esta como true, se deshabilita el scroll.
   * Si esta como false, se vuelve a habilitar.
   */
  useEffect(() => {
    if (isOpen) {
      disabledScroll();
      return;
    }

    enabledScroll();
  }, [isOpen]);

  return (
    <div className={`modal-notification ${classesOpenModal}`}>
      <div className={`modal-notification__body ${classesOpenBody}`}>
        <div className={`modal-notification__icon bg-${type}`}>
          <Icon name={type} color="white" />
        </div>

        {/* Content */}
        <Typography
          className="modal-notification__title"
          align="center"
          title={title}
        />

        {message && (
          <Typography
            className="modal-notification__message"
            align="center"
            title={message}
          />
        )}

        <div className="modal-notification__button-container">
          <Button
            title={textButton ? textButton : { value: 'buttons.understood' }}
            color={type}
            className="modal-notification__button"
            size="small"
            template="outline"
            onClick={closeModal}
          />

          {actionSecondary && (
            <Button
              title={
                textButtonSecondary
                  ? textButtonSecondary
                  : { value: 'buttons.cancel' }
              }
              color="gray-lighter"
              className="modal-notification__button"
              size="small"
              template="outline"
              onClick={actionSecondary}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  isOpen: false,
  type: 'successful',
  title: 'Titulo de Modal',
  message: 'Mensaje de Modal...'
};

export default Modal;
