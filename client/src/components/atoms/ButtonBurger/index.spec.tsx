import { render, screen, fireEvent } from '@testing-library/react';
// Components
import ButtonBurger from './';

describe('Tests para el componente ButtonBurger', () => {
  it('Localiza el elemento button', () => {
    render(<ButtonBurger isActive={false} onClick={() => {}} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Simula evento click', () => {
    const handleClick = jest.fn();
    render(<ButtonBurger isActive={false} onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
