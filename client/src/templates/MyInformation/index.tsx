import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import LocalStorage from 'local-storage-to-object';
import moment from 'moment';
// Context
import { useLoading } from '../../context/LoadingProvider/context';
import { useAuth } from '../../context/LoginProvider/context';
// Components
import Container from '../../components/atoms/Container';
import MotionWrapp from '../../components/atoms/MotionWrapp';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Buttons/Button';
import FieldDescription from '../../components/molecules/FieldDescription';
import Modal from '../../components/atoms/Modal';
// Custom Hooks
import useLogout from '../../hooks/useLogout';
// Assets
import AvatarM from '../../assets/images/avatar-m.webp';
import AvatarF from '../../assets/images/avatar-f.webp';
// Types
import { UserType } from '../../interfaces/login';
import { UserGenderType } from '../../interfaces/user';

const MyInformation = () => {
  // Contexts
  const {
    actions: { setLoading }
  } = useLoading();
  const {
    state: { activeUser }
  } = useAuth();

  // Translations
  const { t } = useTranslation();

  // Custom Hooks
  const { handleLogout } = useLogout();

  // Cada uno de los elementos de la información del usuario
  const itemsFieldDescription = [
    {
      id: '1',
      name: { value: 'inputs.fullName' },
      description: `${activeUser?.name} ${activeUser?.lastName} ${activeUser?.motherLastName}`
    },
    {
      id: '2',
      name: { value: 'inputs.user' },
      description: activeUser?.user || '- - -'
    },
    {
      id: '3',
      name: { value: 'inputs.gender' },
      description: activeUser?.gender || '- - -'
    },
    {
      id: '4',
      name: { value: 'inputs.phone' },
      description: activeUser?.phone || '- - -'
    },
    {
      id: '5',
      name: { value: 'inputs.dateBirth' },
      description: moment(activeUser?.dateBirth, 'YYYY-MM-DD').format(
        'DD/MM/yyyy'
      )
    }
  ];

  // State
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Current image avatar
  const currentAvatar = useMemo(
    () => (activeUser?.gender === UserGenderType.feminine ? AvatarF : AvatarM),
    [activeUser?.gender]
  );

  /**
   * Funcion que se encarga de eliminar la cuenta del usuario actual.
   */
  const handleDeleteAccount = useCallback(async (): Promise<void> => {
    try {
      setIsOpenModal(false);
      setLoading(true);

      const localStorageUsers: Array<UserType> = LocalStorage.getItem(
        'Login',
        'users',
        []
      );

      // Filtra los usuarios que no coincidan con el que esta actualmente loggeado
      const resUsers = localStorageUsers.filter(
        (item) => item.user !== activeUser?.user
      );

      // Eliminamos al usuario del localStorage
      LocalStorage.setItem('Login', { users: resUsers });

      await handleLogout();
    } finally {
      setLoading(false);
    }
  }, [setLoading, handleLogout, activeUser?.user]);

  /**
   * Funcion que se encarga de abrir la modal de alerta.
   */
  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  /**
   * Funcion que se encarga de cerrar la modal de alerta.
   */
  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <>
      <Container className="my-10">
        {/* Card */}
        <div className="mb-10 sm:flex justify-start items-center">
          <MotionWrapp
            classesIn="getin-bottom-animation"
            classesOut="getin-bottom-animation--init"
            options={{
              rootMargin: '-150px'
            }}
          >
            <img
              src={currentAvatar}
              alt="Avatar del usuario"
              className="mb-5 sm:mb-0 sm:mr-5 md:mr-8 w-28 md:w-40 h-28 md:h-40 rounded-full overflow-hidden"
            />
          </MotionWrapp>

          <MotionWrapp
            startTheView
            classesIn="getin-bottom-animation"
            classesOut="getin-bottom-animation--init"
            options={{
              delay: 450,
              rootMargin: '-400px'
            }}
          >
            <Typography
              title={`${activeUser?.name} ${activeUser?.lastName}`}
              color="secondary"
              size="big"
              weight="bold"
              className="leading-8"
            />
          </MotionWrapp>
        </div>

        <MotionWrapp
          startTheView
          classesIn="getin-bottom-animation"
          classesOut="getin-bottom-animation--init"
          options={{
            delay: 700,
            rootMargin: '-400px'
          }}
        >
          <div className="max-w-screen-md rounded-lg shadow-xl overflow-hidden bg-neutral-200">
            <div className="px-4 md:px-8 pt-5 pb-4 bg-neutral-300">
              <h1 className="text-neutral-700 font-bold text-lg">
                {t('screens.myInformation.title')}
              </h1>
            </div>

            {/* Content */}
            <div className="px-4 md:px-8 py-5 md:flex md:justify-between">
              <FieldDescription items={itemsFieldDescription} />

              <Button
                title={{ value: 'buttons.delete' }}
                endIcon="trash"
                className="mt-8 md:mt-0 h-10"
                color="error"
                onClick={handleOpenModal}
              />
            </div>
          </div>
        </MotionWrapp>
      </Container>

      <Modal
        type="warning"
        isOpen={isOpenModal}
        title={{ value: 'modals.deleteAccount.title' }}
        message={{ value: 'modals.deleteAccount.message' }}
        textButton={{ value: 'buttons.continue' }}
        closeModal={handleDeleteAccount}
        actionSecondary={handleCloseModal}
      />
    </>
  );
};

export default MyInformation;
