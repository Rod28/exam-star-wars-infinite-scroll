// Components
import Input from '../../../components/atoms/Inputs/Input';
// Rules
import { Rule_WithoutSpaces } from '../../../rules';
// Types
import { AllTypesLogin } from '../../../interfaces/login';

const Login = () => (
  <>
    <Input
      autoFocus
      isPreventCopy
      isPreventPaste
      name={AllTypesLogin.user}
      title={{ value: 'inputs.user' }}
      iconName="user"
      maxLength={15}
      rules={Rule_WithoutSpaces}
      isRequired
    />

    <Input
      isPreventCopy
      isPreventPaste
      type="password"
      name={AllTypesLogin.password}
      title={{ value: 'inputs.password' }}
      iconName="pass"
      maxLength={15}
      rules={Rule_WithoutSpaces}
      isRequired
    />
  </>
);

export default Login;
