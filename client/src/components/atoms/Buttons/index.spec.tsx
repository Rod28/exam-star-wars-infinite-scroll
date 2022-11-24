import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
// i18n
import i18n from '../../../i18n';
// Components
import Button from './Button';

describe('Tests para el componente Button', () => {
  it('Localiza el elemento button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Button title="Boton" onClick={() => {}} />
      </I18nextProvider>
    );

    expect(screen.getByText('Boton')).toBeInTheDocument();
  });

  it('Simula evento click', () => {
    const handleClick = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <Button title="Boton" onClick={handleClick} />
      </I18nextProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
