import { render, screen } from '@testing-library/react';

import { Header } from '.';

// teste sendo feito antes de finalizar o componente. Por isso tem código comentado que não está sendo usado ainda, como o mock da rota next.

// mock da rota do next com return fictício:
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

// mock com return fictício do useSession que vem do next-auth/xlient usado pelo componente SignInButton :

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe('Header component', () => {
  it('should renders header correctly with ancora', () => {
    render(<Header />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});
