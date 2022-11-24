// Components
import Typography from '../../../components/atoms/Typography';
// Types
import { FieldDescriptionProps } from './types';

const FieldDescription = ({ items, align }: FieldDescriptionProps) => {
  // No renderiza nada si no hay elementos
  if (!items.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-start">
      {items.map((item, index) => {
        return (
          <div key={`index-${item.id}-${index}`} className="mb-5 last:mb-0">
            <Typography
              title={item.name}
              color="secondary"
              weight="bold"
              align={align}
              className="leading-5 sm:leading-6 pr-3 sm:pr-0"
            />
            <Typography
              title={item.description}
              color="gray"
              size="medium"
              weight="semi-bold"
              align={align}
              className="leading-5 sm:leading-6 pr-3 sm:pr-0"
            />
          </div>
        );
      })}
    </div>
  );
};

export default FieldDescription;
