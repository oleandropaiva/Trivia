import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Trivia from '../components/Trivia';

describe('Testes para componente "Trivia"', () => {

  test('1 - Verifica se a página possui um título "Trivia"', async () => {
      renderWithRouterAndRedux(<Trivia />);

      const loading = screen.getByText(/carregando/i);
        expect(loading).toBeInTheDocument();

    // jest.setTimeout(5000);

    // await waitFor(() => {
    //     const button = screen.getByRole('button');
    //     expect(button).toBeInTheDocument();
    // });

  })
});