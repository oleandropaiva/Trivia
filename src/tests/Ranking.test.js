import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Ranking from '../pages/Ranking';

describe('Testes para atingir 90% de cobertura da tela de Ranking', () => {

  test('1 - Verifica se a página possui um título "Ranking"', async () => {
      renderWithRouterAndRedux(<Ranking />);

      const title = screen.getByRole('heading', { name: /Ranking/i, level: 1 });
      await expect(title).toBeInTheDocument();
  });

  test('2 - Verifica se a página possui um botão "Tela inicial"', async () => {
    renderWithRouterAndRedux(<Ranking />);

    const initialScreenBtn = screen.getByRole('button', { name: /Tela inicial/i});
    await expect(initialScreenBtn).toBeInTheDocument();
  });

  test('3 - Verifica se o botão redireciona para "Tela de login"', async () => {
   const { history } = renderWithRouterAndRedux(<Ranking />);

    const initialScreenBtn = screen.getByRole('button', { name: /Tela inicial/i});
    await expect(initialScreenBtn).toBeInTheDocument();

    userEvent.click(initialScreenBtn);

    await expect(history.location.pathname).toBe('/');
  });
})