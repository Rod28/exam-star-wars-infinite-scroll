import { useTranslation } from 'react-i18next';
// Components
import Input from '../../../components/atoms/Inputs/Input';
import Numeric from '../../../components/atoms/Inputs/Numeric';
import Select from '../../../components/atoms/Inputs/Select';
// Rules
import {
  Rule_OnlyText,
  Rule_WithoutSpaces,
  Rule_Phone,
  Rule_MinLength
} from '../../../rules';
// Types
import { AllTypesSignUp } from '../../../interfaces/login';
import { UserGenderType } from '../../../interfaces/user';

const SignUp = () => {
  // Translations
  const { t } = useTranslation();
  return (
    <>
      <div className="sm:flex justify-between">
        <Input
          autoFocus
          stopLabelAnimation
          name={AllTypesSignUp.name}
          title={{ value: 'inputs.name' }}
          iconName="id"
          className="sm:w-5/12"
          maxLength={25}
          rules={{
            validate: {
              ...Rule_MinLength(3).validate,
              ...Rule_OnlyText.validate,
              ...Rule_WithoutSpaces.validate
            }
          }}
          isRequired
        />

        <Input
          stopLabelAnimation
          name={AllTypesSignUp.lastName}
          title={{ value: 'inputs.lastName' }}
          iconName="id"
          className="sm:w-5/12"
          maxLength={25}
          rules={{
            validate: {
              ...Rule_MinLength(3).validate,
              ...Rule_OnlyText.validate,
              ...Rule_WithoutSpaces.validate
            }
          }}
          isRequired
        />
      </div>

      <div className="sm:flex justify-between">
        <Input
          stopLabelAnimation
          name={AllTypesSignUp.motherLastName}
          title={{ value: 'inputs.motherLastName' }}
          iconName="id"
          className="sm:w-5/12"
          maxLength={25}
          rules={{
            validate: {
              ...Rule_MinLength(3).validate,
              ...Rule_OnlyText.validate,
              ...Rule_WithoutSpaces.validate
            }
          }}
          isRequired
        />

        <Input
          stopLabelAnimation
          type="date"
          name={AllTypesSignUp.dateBirth}
          title={{ value: 'inputs.dateBirth' }}
          iconName="calendar"
          className="sm:w-5/12"
          maxLength={8}
          isRequired
        />
      </div>

      <div className="sm:flex justify-between">
        <Numeric
          stopLabelAnimation
          type="tel"
          name={AllTypesSignUp.phone}
          title={{ value: 'inputs.phone' }}
          iconName="phone"
          className="sm:w-5/12"
          maxLength={10}
          rules={Rule_Phone}
          isRequired
        />

        <Select
          stopLabelAnimation
          name={AllTypesSignUp.gender}
          title={{ value: 'inputs.gender' }}
          options={[
            {
              label: t('inputs.feminine'),
              value: 'feminine'
            },
            {
              label: t('inputs.male'),
              value: 'male'
            }
          ]}
          defaultValue={UserGenderType.feminine}
          iconName="gender"
          className="sm:w-5/12"
          isRequired
        />
      </div>

      <div className="sm:flex justify-between">
        <Input
          stopLabelAnimation
          isPreventCopy
          isPreventPaste
          name={AllTypesSignUp.user}
          title={{ value: 'inputs.user' }}
          iconName="user"
          className="sm:w-5/12"
          maxLength={15}
          rules={{
            validate: {
              ...Rule_MinLength(8).validate,
              ...Rule_WithoutSpaces.validate
            }
          }}
          isRequired
        />

        <Input
          stopLabelAnimation
          isPreventCopy
          isPreventPaste
          type="password"
          name={AllTypesSignUp.password}
          title={{ value: 'inputs.password' }}
          iconName="pass"
          className="sm:w-5/12"
          maxLength={15}
          rules={{
            validate: {
              ...Rule_MinLength(8).validate,
              ...Rule_WithoutSpaces.validate
            }
          }}
          isRequired
        />
      </div>
    </>
  );
};

export default SignUp;
