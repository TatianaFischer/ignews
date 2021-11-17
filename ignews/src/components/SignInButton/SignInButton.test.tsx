import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';
import { debug } from 'console';
import { SignInButton } from '.';
// o null siginifica que o usuário não está logado:
jest.mock('next-auth/client');

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticade', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);
    //a função mockReturnValue determina que a partir dessa linha toda a vez que a função useSession for chamada ela vai retornar null, deslogado  e false, loader.
    //Porém se colocar o once no final significa que somente vai retornar esse valores na primeira linha excutada após.

    render(<SignInButton />);

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticade', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John Doe', email: 'jdoe@gmail.com' },
        expires: 'fake exp',
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
