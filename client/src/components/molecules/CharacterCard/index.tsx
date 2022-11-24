import { useCallback } from 'react';
// Components
import FieldDescription from '../../../components/molecules/FieldDescription';
import Spinner from '../../../components/atoms/Spinner';
import Button from '../../../components/atoms/Buttons/Button';
import Typography from '../../../components/atoms/Typography';
import Icon from '../../../components/atoms/Icon';
// Utils
import { getValue } from './utils';
// Assets
import { AVATAR } from '../../../constants/avatars';
// Types
import { CharacterCardProps } from './types';
import { ResultsType } from '../../../interfaces/swPeople';

const CharacterCard = ({
  isModeDelete,
  characters,
  favoriteCharacters,
  loading,
  onToggleFavorites
}: CharacterCardProps) => {
  /**
   * Funcion que manda al componente padre, el elemento seleccionado.
   * @param character  elemento seleccionado
   */
  const handleToggleFavorites = useCallback(
    (character: ResultsType): (() => void) =>
      (): void => {
        onToggleFavorites(character);
      },
    [onToggleFavorites]
  );

  if (isModeDelete && !loading && !characters.length) {
    return (
      <div className="flex flex-col items-center px-6 sm:px-8 py-10 md:py-16 lg:py-24 rounded-lg shadow-xl overflow-hidden bg-neutral-200">
        <Icon
          className="w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 mb-4 md:mb-6"
          name="face-sad"
          color="gray-light"
        />
        <Typography
          title={{ value: 'screens.MyFavorites.emptyMessage' }}
          align="center"
          size="medium"
          weight="medium"
          color="gray-light"
          className="max-w-xs sm:max-w-sm md:max-w-md leading-7 md:leading-8"
        />
      </div>
    );
  }

  // Si el componente esta cargando y no hay elementos, renderiza un spinner
  if (loading && !characters.length) {
    return (
      <div className="w-full h-36 flex items-center justify-center">
        <Spinner isLoading type="bars" color="gray-lighter" />
      </div>
    );
  }

  return (
    <>
      {characters.map((character, index) => {
        // Obtenemos el nombre del personaje
        const name = character.name || '';

        // Buscamos si el peronaje acutal, esta almacenado como favorito
        const findFavoriteCharacters = favoriteCharacters.find(
          (item) => item.name === character.name
        );

        // Generamos una key para cada elemento con el nombre del personaje.
        const keyName = name.toLowerCase().replaceAll(' ', '-');

        const IconLike = findFavoriteCharacters ? 'like-full' : 'like';
        const colorIconLike = findFavoriteCharacters ? 'error' : 'gray-light';

        return (
          <div
            key={`${keyName}-${index}`}
            className="relative flex flex-col md:flex-row px-6 sm:px-8 py-5 sm:py-6 mb-9 last:mb-0 rounded-lg shadow-xl overflow-hidden bg-neutral-200"
          >
            <Button
              startIcon={isModeDelete ? 'trash' : IconLike}
              className="absolute top-4 right-4 z-50"
              color={isModeDelete ? 'secondary' : 'bg-neutral-200'}
              textColor={isModeDelete ? 'white' : colorIconLike}
              onClick={handleToggleFavorites(character)}
            />

            {/* Avatar */}
            <div className="md:w-32 flex flex-col shrink-0 md:mr-6 items-center text-center">
              <img
                src={AVATAR[character.gender]}
                alt={name}
                className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 mb-2 md:mb-3 rounded-full overflow-hidden"
              />
              <FieldDescription
                items={[
                  {
                    id: '1',
                    name: { value: 'screens.welcome.name' },
                    description: name
                  }
                ]}
              />
            </div>

            {/*  Body */}
            <div className="flex items-start mt-6 md:mt-0 pt-4 md:pt-0 border-t-2 md:border-t-0 border-gray-400 w-full">
              <div className="w-1/2 md:w-2/5">
                <FieldDescription
                  items={[
                    {
                      id: '1',
                      name: { value: 'screens.welcome.name' },
                      description: getValue(name)
                    },
                    {
                      id: '2',
                      name: { value: 'screens.welcome.height' },
                      description: getValue(character.height + ' cm')
                    },
                    {
                      id: '3',
                      name: { value: 'screens.welcome.gender' },
                      description: getValue(character.gender)
                    },
                    {
                      id: '4',
                      name: { value: 'screens.welcome.yearBirth' },
                      description: getValue(character.birth_year)
                    }
                  ]}
                />
              </div>
              <div className="w-1/2 md:w-2/5">
                <FieldDescription
                  items={[
                    {
                      id: '1',
                      name: { value: 'screens.welcome.weight' },
                      description: getValue(character.mass + ' kg')
                    },
                    {
                      id: '2',
                      name: { value: 'screens.welcome.skinColor' },
                      description: getValue(character.skin_color)
                    },
                    {
                      id: '3',
                      name: { value: 'screens.welcome.hairColor' },
                      description: getValue(character.hair_color)
                    },
                    {
                      id: '4',
                      name: { value: 'screens.welcome.eyeColor' },
                      description: getValue(character.eye_color)
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Load more elements */}
      {loading && (
        <div className="w-full h-28 flex items-center justify-center">
          <Spinner isLoading type="bars" color="gray-lighter" />
        </div>
      )}
    </>
  );
};

CharacterCard.defaultProps = {
  isModeDelete: false,
  findFavoriteCharacters: []
};

export default CharacterCard;
