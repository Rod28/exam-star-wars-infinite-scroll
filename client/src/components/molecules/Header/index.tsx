import { useMemo, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Routes
import { PATHS, ROUTES } from '../../../routes';
// Context
import { useLoading } from '../../../context/LoadingProvider/context';
import { useAuth } from '../../../context/LoginProvider/context';
// Components
import Container from '../../atoms/Container';
import ButtonBurger from '../../atoms/ButtonBurger';
import Button from '../../atoms/Buttons/Button';
import LanguageChanger from '../../molecules/LanguageChanger';
// Custom Hooks
import useLogout from '../../../hooks/useLogout';
import useToggle from '../../../hooks/useToggle';
// Assets
import AvatarM from '../../../assets/images/avatar-m.webp';
import AvatarF from '../../../assets/images/avatar-f.webp';
// Types
import { UserGenderType } from '../../../interfaces/user';
// Styles
import './style.scss';

const Header = () => {
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
  const { toggle, toggleChange, toggleOff } = useToggle();

  // Current image avatar
  const currentAvatar = useMemo(
    () => (activeUser?.gender === UserGenderType.feminine ? AvatarF : AvatarM),
    [activeUser?.gender]
  );

  // Dynamic styles
  const activeMenu = toggle ? 'header__menu--active' : 'header__menu--inactive';

  /**
   * Funcion que se encarga de cerrar la sesion del usuario.
   */
  const handleSessionLogout = useCallback(async (): Promise<void> => {
    try {
      toggleOff();
      setLoading(true);

      await handleLogout();
    } finally {
      setLoading(false);
    }
  }, [handleLogout, toggleOff, setLoading]);

  /**
   * Funcion que se encarga de desplegar o contraer el menu para modo mobile / tablet.
   */
  const handleToogleShowMenu = useCallback((): void => {
    toggleChange();
  }, [toggleChange]);

  return (
    <header className="header">
      <Container>
        <nav className="header__nav">
          <ButtonBurger
            className="header__button-burger"
            isActive={toggle}
            onClick={handleToogleShowMenu}
          />

          {/* User image */}
          <Link to={PATHS.MyInformation} className="header__image-container">
            <img
              src={currentAvatar}
              alt="Avatar del usuario"
              className="header__image"
            />
          </Link>

          <ul className={`header__menu ${activeMenu}`}>
            {ROUTES.map((route) => {
              return (
                <li key={route.id} className="header__container">
                  <NavLink
                    to={route.path}
                    className={({ isActive }) => {
                      const activeItem = isActive
                        ? 'text-sky-500'
                        : 'header__item--inactive';
                      return `header__item ${activeItem}`;
                    }}
                    onClick={toggleOff}
                  >
                    {t(`paths.${route.name}`)}
                  </NavLink>
                </li>
              );
            })}

            <li>
              <Button
                title={{ value: 'buttons.logout' }}
                className="header__button-logout"
                onClick={handleSessionLogout}
              />
            </li>
          </ul>

          <LanguageChanger />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
