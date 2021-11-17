import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next-auth/client');
jest.mock('next/router');

const useSessionMocked = mocked(useSession);
const useRouterMocked = mocked(useRouter);

describe(' SubscribeButton component', () => {
  it('renders correctly ', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('should called signIn function when not authentication ', () => {
    const signInMocked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });
  //descomentar esse teste quando acabar o componente SubscribeButton:

  // it('should redirects to posts when user already has a subscription ', () => {
  //   const pushMocked = jest.fn();

  //   useSessionMocked.mockReturnValueOnce([
  //     {
  //       user: { name: 'John Doe', email: 'john.doe@example.com' },
  //       activeSubscription: 'fake-active-subscription',
  //       expires: 'fake-expires',
  //     },
  //     false,
  //   ]);

  //   useRouterMocked.mockReturnValueOnce({
  //     push: pushMocked,
  //   } as any);

  //   render(<SubscribeButton />);

  //   const subscribeButton = screen.getByText('Subscribe now');

  //   fireEvent.click(subscribeButton);

  //   expect(pushMocked).toHaveBeenCalledWith('/posts');
  // });
});
