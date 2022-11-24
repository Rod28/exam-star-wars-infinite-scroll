import { useState, useCallback } from 'react';
// Context
import { useAuth } from '../../context/LoginProvider/context';
// Components
import Container from '../../components/atoms/Container';
import MotionWrapp from '../../components/atoms/MotionWrapp';
import Heading from '../../components/atoms/Heading';
import Typography from '../../components/atoms/Typography';
import Modal from '../../components/atoms/Modal';
import CharacterCard from '../../components/molecules/CharacterCard';
// Types
import { ResultsType } from '../../interfaces/swPeople';

const MyFavoriteThings = () => {
  // Contexts
  const {
    state: { activeUser },
    actions: { setToggleFavoriteThingsData }
  } = useAuth();

  // State
  const [isOpenModalRemove, setIsOpenModalRemove] = useState(false);
  const [deleteElement, setDeleteElement] = useState<undefined | ResultsType>();

  /**
   * Funcion que se encarga de abrir la modal para eliminar elementos.
   * @param data Datos del elemento o eliminar
   */
  const handleOpenModalRemove = useCallback((data: ResultsType): void => {
    setIsOpenModalRemove(true);
    setDeleteElement(data);
  }, []);

  /**
   * Funcion que se encarga de cerrar la modal para eliminar elementos.
   */
  const handleCloseModalRemove = useCallback((): void => {
    setIsOpenModalRemove(false);
  }, []);

  /**
   * Eliminamos el elemento seleccionado.
   */
  const handleAddRemoveFavoriteThings = useCallback((): void => {
    if (deleteElement) {
      setIsOpenModalRemove(false);
      setToggleFavoriteThingsData(activeUser?.user || '', deleteElement);
    }
  }, [activeUser?.user, deleteElement, setToggleFavoriteThingsData]);

  return (
    <>
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
            title={{ value: 'screens.MyFavorites.title' }}
            color="primary"
          />
        </MotionWrapp>

        {/* Message */}
        <MotionWrapp
          startTheView
          classesIn="getin-bottom-animation"
          classesOut="getin-bottom-animation--init"
          options={{
            delay: 500,
            rootMargin: '-300px'
          }}
        >
          <Typography
            title={{ value: `screens.MyFavorites.message` }}
            size="medium"
            weight="medium"
            highlighters={['local storage']}
            highlightColor="primary"
            highlightWeight="bold"
            className="max-w-screen-sm md:max-w-screen-md leading-7 md:leading-8"
          />
        </MotionWrapp>

        {/* Content */}
        <MotionWrapp
          startTheView
          classesIn="getin-bottom-animation"
          classesOut="getin-bottom-animation--init"
          options={{
            delay: 700,
            rootMargin: '-400px'
          }}
        >
          <div className="w-full max-w-screen-sm md:max-w-screen-md mx-auto my-16 md:my-24">
            {/* Characters */}
            <CharacterCard
              isModeDelete
              characters={activeUser?.favoriteThings || []}
              favoriteCharacters={activeUser?.favoriteThings || []}
              loading={false}
              onToggleFavorites={handleOpenModalRemove}
            />
          </div>
        </MotionWrapp>
      </Container>

      <Modal
        type="warning"
        isOpen={isOpenModalRemove}
        title={{ value: 'modals.deleteElement.title' }}
        message={{ value: 'modals.deleteElement.message' }}
        closeModal={handleAddRemoveFavoriteThings}
        actionSecondary={handleCloseModalRemove}
      />
    </>
  );
};

export default MyFavoriteThings;
