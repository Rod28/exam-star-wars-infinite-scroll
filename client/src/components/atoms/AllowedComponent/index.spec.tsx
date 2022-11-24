import { render, screen } from '@testing-library/react';
// Components
import AllowedComponent from './';

describe('Tests para el componente AllowedComponent', () => {
  it('Componente hijo no restringido', () => {
    render(
      <AllowedComponent path="/" restrict={['/my-favorites']}>
        <p>Ejemplo</p>
      </AllowedComponent>
    );

    expect(screen.getByText('Ejemplo')).toBeInTheDocument();
  });

  it('Componente hijo permitido', () => {
    render(
      <AllowedComponent path="/welcome" allow={['/welcome', '/my-information']}>
        <p>Ejemplo</p>
      </AllowedComponent>
    );

    expect(screen.getByText('Ejemplo')).toBeInTheDocument();
  });

  it('Componente hijo restringido', () => {
    render(
      <AllowedComponent
        path="/my-favorites"
        restrict={['/welcome', '/my-favorites']}
      >
        <p>Ejemplo</p>
      </AllowedComponent>
    );

    expect(screen.queryByText('Ejemplo')).not.toBeInTheDocument();
  });

  it('Componente hijo no permitido', () => {
    render(
      <AllowedComponent path="/" allow={['/welcome', '/my-information']}>
        <p>Ejemplo</p>
      </AllowedComponent>
    );

    expect(screen.queryByText('Ejemplo')).not.toBeInTheDocument();
  });
});
