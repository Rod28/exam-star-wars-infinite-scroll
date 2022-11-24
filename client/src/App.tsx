import { lazy, useState } from 'react';
import { Route } from 'react-router-dom';
import ResponsiveDetecter from 'react-responsive-detecter';
// Routes
import { PATHS, PATHS_TYPE } from './routes';
// Contexts
import { useLoading } from './context/LoadingProvider/context';
import { useModal } from './context/ModalProvider/context';
// Screens
import HomeScreen from './screens/HomeScreen';
// Templates
import AppInit from './templates/AppInit';
import RoutesMain from './templates/RoutesMain';
// Components
import FallbackLazyLoading from './components/molecules/FallbackLazyLoading';
import ProtectedRoute from './components/atoms/ProtectedRoute';
import AllowedComponent from './components/atoms/AllowedComponent';
// Styles
import './sass/main.scss';

// Lazy components imports
const LoadingScreen = lazy(
  () => import('./components/molecules/LoadingScreen')
);
const ModalNotification = lazy(() => import('./components/atoms/Modal'));
const Header = lazy(() => import('./components/molecules/Header'));
// Lazy screens imports
const WelcomeScreen = lazy(() => import('./screens/WelcomeScreen'));
const MyInformationScreen = lazy(() => import('./screens/MyInformationScreen'));
const MyFavoriteThingsScreen = lazy(
  () => import('./screens/MyFavoriteThingsScreen')
);

const App = () => {
  // Contexts
  const {
    state: { isLoading }
  } = useLoading();
  const {
    state: { isOpen, type, title, message, textButton },
    actions: { closeModalGlobal }
  } = useModal();

  // State
  const [currentPath, setCurrentPath] = useState<PATHS_TYPE>('/');

  return (
    <AppInit>
      {/* Development stencil */}
      <FallbackLazyLoading>
        <ResponsiveDetecter disable={process.env.NODE_ENV === 'production'} />
      </FallbackLazyLoading>

      {/* Loader global */}
      <FallbackLazyLoading>
        <LoadingScreen isLoading={isLoading} />
      </FallbackLazyLoading>

      {/* Modals success / warning / error */}
      <FallbackLazyLoading>
        <ModalNotification
          isOpen={isOpen}
          type={type}
          title={title}
          message={message}
          textButton={textButton}
          closeModal={closeModalGlobal}
        />
      </FallbackLazyLoading>

      {/* Language changer */}
      <AllowedComponent path={currentPath} restrict={[PATHS.Root]}>
        <FallbackLazyLoading>
          <Header />
        </FallbackLazyLoading>
      </AllowedComponent>

      {/* Pages */}
      <RoutesMain>
        {/* Public routes */}
        <Route
          path={PATHS.Root}
          element={
            <ProtectedRoute path={PATHS.Root} onCurrentPath={setCurrentPath}>
              <HomeScreen />
            </ProtectedRoute>
          }
        />

        {/* Private routes */}
        <Route
          path={PATHS.Welcome}
          element={
            <ProtectedRoute path={PATHS.Welcome} onCurrentPath={setCurrentPath}>
              <FallbackLazyLoading>
                <WelcomeScreen />
              </FallbackLazyLoading>
            </ProtectedRoute>
          }
        />
        <Route
          path={PATHS.MyInformation}
          element={
            <ProtectedRoute
              path={PATHS.MyInformation}
              onCurrentPath={setCurrentPath}
            >
              <FallbackLazyLoading>
                <MyInformationScreen />
              </FallbackLazyLoading>
            </ProtectedRoute>
          }
        />
        <Route
          path={PATHS.MyFavorites}
          element={
            <ProtectedRoute
              path={PATHS.MyFavorites}
              onCurrentPath={setCurrentPath}
            >
              <FallbackLazyLoading>
                <MyFavoriteThingsScreen />
              </FallbackLazyLoading>
            </ProtectedRoute>
          }
        />

        {/* Not found */}
        <Route
          path={PATHS.NotFound}
          element={
            <ProtectedRoute
              path={PATHS.NotFound}
              onCurrentPath={setCurrentPath}
            />
          }
        />
      </RoutesMain>
    </AppInit>
  );
};

export default App;
