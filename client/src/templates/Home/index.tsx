import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';
import LocalStorage from 'local-storage-to-object';
// Routes
import { PATHS } from '../../routes';
// Context
import { useLoading } from '../../context/LoadingProvider/context';
import { useModal } from '../../context/ModalProvider/context';
import { useAuth } from '../../context/LoginProvider/context';
// Components
import Login from './Login';
import SignUp from './SignUp';
import Button from '../../components/atoms/Buttons/Button';
import Submit from '../../components/atoms/Buttons/Submit';
import Typography from '../../components/atoms/Typography';
import Form from '../../components/atoms/Form';
// Helpers
import { sleep } from '../../helpers';
// Types
import {
  UserType,
  LoginType,
  SignUpType,
  AllTypesSignUp
} from '../../interfaces/login';

const Home = () => {
  // Navigation
  const navigate = useNavigate();

  // Contexts
  const {
    actions: { setLoading }
  } = useLoading();
  const {
    state: { isOpen: isOpenModal },
    actions: { openModalGlobal }
  } = useModal();
  const {
    actions: { setHasAuth, setActiveUser }
  } = useAuth();

  // States
  const [isLogin, setIsLogin] = useState(true);
  const [methods, setMethods] = useState<UseFormReturn>();

  // Estlos dinamicos para el contenedor pricipal
  const wrapperStyles = isLogin ? 'sm:w-2/3 max-w-md' : 'sm:w-4/5 max-w-xl';

  /**
   * Funcion que se encarga limpiar todos los datos del formulario.
   */
  const handleCleanForm = useCallback(async (): Promise<void> => {
    const formData = Object.keys(AllTypesSignUp);

    formData.forEach((data) => methods && methods.setValue(data, ''));
    methods && (await methods.trigger(formData));
    methods && methods.clearErrors(formData);
  }, [methods]);

  /**
   * Funcion que se encarga de alternar entre el inicio de sesion y el registro.
   */
  const handleToogleLogin = useCallback((): void => {
    setIsLogin((prevVal) => !prevVal);
  }, []);

  /**
   * Funcion que se encarga de simular un logion exitoso, o erroneo en
   * en caso de que las credenciales no existan en localStorage.
   * @param formData Datos del formulario de inicio de sesion
   */
  const handleSubmit = useCallback(
    async (formData: LoginType): Promise<void> => {
      try {
        // Evitamos hacer peticiones mientas la modal este activa
        if (isOpenModal) {
          return;
        }

        setLoading(true);

        // Simula peticion al API
        await sleep(2000);

        const localStorageUsers: Array<UserType> = LocalStorage.getItem(
          'Login',
          'users',
          []
        );

        // Verificamos que el usuario exista en localStorage
        const availableUser = localStorageUsers.filter(
          (item): boolean =>
            item.user === formData.user && item.password === formData.password
        );

        // Simula un error si no existe el usuario en localStorage
        if (!availableUser.length) {
          throw new Error();
        }

        // Login exitoso
        setHasAuth(true);
        setActiveUser(availableUser[0]);
        navigate(PATHS.Welcome, { replace: true });
      } catch {
        openModalGlobal({
          title: { value: 'modals.errorLogin.title' },
          message: { value: 'modals.errorLogin.message' }
        });
      } finally {
        setLoading(false);
      }
    },
    [
      isOpenModal,
      navigate,
      openModalGlobal,
      setActiveUser,
      setHasAuth,
      setLoading
    ]
  );

  /**
   * Funcion que se encarga de simular un registro de usuario nuevo.
   * @param formData Datos del formulario de registro
   */
  const handleSignUp = useCallback(
    async (formData: SignUpType): Promise<void> => {
      try {
        setLoading(true);

        // Simula peticion al API
        await sleep(2000);

        let availableUser = true;
        const localStorageUsers: Array<UserType> = LocalStorage.getItem(
          'Login',
          'users',
          []
        );

        // Verificamos que el usuario exista en localStorage
        localStorageUsers.forEach((item): void => {
          if (item.user === formData.user) {
            availableUser = false;
          }
        });

        // Simula un error si el usuario esta repetido en localStorage
        if (!availableUser) {
          throw new Error();
        }

        // Simula un error si no existe el usuario en localStorage
        LocalStorage.setItem('Login', {
          users: [...localStorageUsers, formData]
        });

        // Se limpia el formulario;
        handleCleanForm();

        // Usuario crado con exito
        openModalGlobal({
          type: 'successful',
          title: { value: 'modals.newUserCreated.title' },
          message: { value: 'modals.newUserCreated.message' }
        });

        // Se cambia a la pantalla de login
        setIsLogin(true);
      } catch {
        setLoading(false);
        openModalGlobal({
          title: { value: 'modals.invalidUser.title' },
          message: { value: 'modals.invalidUser.message' }
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, handleCleanForm, openModalGlobal]
  );

  return (
    <div
      className={`w-4/5 ${wrapperStyles} my-16 mx-auto shadow-2xl p-6 rounded-lg bg-neutral-300`}
    >
      {/* Renderizamos un Form para cada seccion, para eviatar validaciones al cargar el componente */}
      {isLogin && (
        <Form onMethods={setMethods} onSubmit={handleSubmit}>
          {/* Title */}
          <Typography
            title={{ value: 'screens.home.title.login' }}
            size="large"
            weight="bold"
            className="text-center uppercase leading-10 mb-7"
            color="primary"
          />

          {/* Inputs */}
          <Login />

          {/* Actions */}
          <div className="mt-5 text-center flex flex-col">
            <Button
              size="small"
              template="text"
              title={{ value: 'buttons.signUp' }}
              className="mb-4"
              onClick={handleToogleLogin}
            />

            <Submit
              size="small"
              template="outline"
              title={{ value: 'buttons.login' }}
            />
          </div>
        </Form>
      )}

      {!isLogin && (
        <Form onMethods={setMethods} onSubmit={handleSignUp}>
          {/* Title */}
          <Typography
            title={{ value: 'screens.home.title.signUp' }}
            size="large"
            weight="bold"
            className="text-center uppercase leading-10 mb-7"
            color="primary"
          />

          {/* Inputs */}
          <SignUp />

          {/* Actions */}
          <div className="mt-5 text-center flex flex-col">
            <Button
              size="small"
              template="text"
              title={{ value: 'buttons.login' }}
              className="mb-4"
              onClick={handleToogleLogin}
            />

            <Submit
              size="small"
              template="outline"
              title={{ value: 'buttons.signUp' }}
            />
          </div>
        </Form>
      )}
    </div>
  );
};

export default Home;
