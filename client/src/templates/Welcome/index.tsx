import { useState, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
// Context
import { useModal } from '../../context/ModalProvider/context';
import { useAuth } from '../../context/LoginProvider/context';
// Components
import Container from '../../components/atoms/Container';
import MotionWrapp from '../../components/atoms/MotionWrapp';
import Typography from '../../components/atoms/Typography';
import Heading from '../../components/atoms/Heading';
import CharacterCard from '../../components/molecules/CharacterCard';
// Custom Hooks
import useCancelToken from '../../hooks/useCancelToken';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
// API
import { getPeopleSW } from '../../api/people';
// Types
import { ResultsType } from '../../interfaces/swPeople';

const Welcome = () => {
  // Contexts
  const {
    actions: { openModalGlobal }
  } = useModal();
  const {
    state: { activeUser },
    actions: { setToggleFavoriteThingsData }
  } = useAuth();

  // Translations
  const { t } = useTranslation();

  // Custom Hooks
  const { newCancelToken } = useCancelToken();

  // State
  const [enabledScroll, setEnabledScroll] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [data, setData] = useState<Array<ResultsType>>([]);

  // Elemento a rastrear para el scroll infinitop
  const targetDivElement = useRef<HTMLDivElement>(null);

  // Habilita el scroll cuando 'enabledScroll' es true y no se ha pedido la ultima pagina.
  const enabled = useMemo(
    () => enabledScroll && (pages ? currentPage < pages : true),
    [currentPage, enabledScroll, pages]
  );

  /**
   * Peticion al API para obtener personajes de star wars por pagina.
   */
  const handleFetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setEnabledScroll(false);

      const response = await getPeopleSW(currentPage, newCancelToken);
      const totalPages = Math.ceil((response.count || 0) / 10);
      setCurrentPage((preVal) => preVal + 1);
      setPages(totalPages);

      // Agregamos nuevos elementos a los ya existentes
      setData((preVal) => [...preVal, ...response.results]);
    } catch {
      openModalGlobal({
        title: { value: 'modals.errorLoadInfo.title' },
        message: { value: 'modals.errorLoadInfo.message' }
      });
    } finally {
      setLoading(false);
      setEnabledScroll(true);
    }
  }, [currentPage, newCancelToken, openModalGlobal]);

  /**
   * Agregamos o eliminamos el elemento seleccionado.
   * @param data Datos del elemento a guardar o eliminar
   */
  const handleAddRemoveFavoriteThings = useCallback(
    (data: ResultsType): void => {
      setToggleFavoriteThingsData(activeUser?.user || '', data);
    },
    [activeUser?.user, setToggleFavoriteThingsData]
  );

  /**
   * Permite cargas mas elementos, mientras existan mas que pedir y se alcance al final de la pagina.
   */
  useInfiniteScroll({
    target: targetDivElement,
    enabled,
    options: {
      threshold: 0.1
    },
    callback: handleFetchData
  });

  return (
    <Container className="my-10">
      {/* Title */}
      <MotionWrapp
        classesIn="getin-bottom-animation"
        classesOut="getin-bottom-animation--init"
        options={{
          delay: 500,
          rootMargin: '-150px'
        }}
      >
        <Heading
          h={1}
          title={{ value: 'screens.welcome.title' }}
          color="primary"
        />
        <Heading
          h={2}
          title={{ value: 'screens.welcome.subtitle' }}
          color="primary"
          className="font-normal max-w-screen-sm md:max-w-screen-md"
        />
      </MotionWrapp>

      {/* Message */}
      <MotionWrapp
        startTheView
        classesIn="getin-bottom-animation"
        classesOut="getin-bottom-animation--init"
        options={{
          delay: 400,
          rootMargin: '-400px'
        }}
      >
        <Typography
          title={{ value: 'screens.welcome.message' }}
          size="medium"
          weight="medium"
          highlighters={['STAR WARS']}
          highlightColor="warning"
          highlightWeight="bold"
          className="max-w-screen-sm md:max-w-screen-md mt-10 leading-7 md:leading-8"
        />
      </MotionWrapp>

      {/* Message two */}
      <MotionWrapp
        startTheView
        classesIn="getin-bottom-animation"
        classesOut="getin-bottom-animation--init"
        options={{
          delay: 700,
          rootMargin: '-400px'
        }}
      >
        <Typography
          title={{
            value: 'screens.welcome.messageTwo',
            keys: {
              title: `"${t('paths.MyLikes') || ''}"`
            }
          }}
          size="medium"
          weight="medium"
          highlighters={['local storage']}
          highlightColor="primary"
          highlightWeight="bold"
          className="max-w-screen-sm md:max-w-screen-md mt-6 leading-7 md:leading-8"
        />
      </MotionWrapp>

      {/* Content */}
      <MotionWrapp
        startTheView
        classesIn="getin-bottom-animation"
        classesOut="getin-bottom-animation--init"
        options={{
          delay: 800,
          rootMargin: '-200px'
        }}
      >
        <div className="w-full max-w-screen-sm md:max-w-screen-md mx-auto my-16 md:my-24">
          {/* Characters */}
          <CharacterCard
            characters={data}
            favoriteCharacters={activeUser?.favoriteThings || []}
            loading={loading}
            onToggleFavorites={handleAddRemoveFavoriteThings}
          />
          <div ref={targetDivElement} />
        </div>
      </MotionWrapp>
    </Container>
  );
};

export default Welcome;
