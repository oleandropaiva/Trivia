import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Feedback from '../pages/Feedback';

describe('Testes para atingir 90% de cobertura da tela de Feedbacks', () => {

  test('1 - Verifica se a página possui um botão "Ranking"', () => {
      renderWithRouterAndRedux(<Feedback />);

      const RankingButton = screen.getByRole('button', { name: /Ranking/i });
      expect(RankingButton).toBeInTheDocument();
  });
  test('2 - Verifica se o botão "Ranking" redireciona para "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const RankingButton = screen.getByRole('button', { name: /Ranking/i });
    expect(RankingButton).toBeInTheDocument();

    userEvent.click(RankingButton);

    expect(history.location.pathname).toBe('/ranking');
  });
  test('3 - Verifica se o botão "Play Again" redireciona para "/"', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);

    const playAgainButton = screen.getByRole('button', { name: /PLay Again/i });
    expect(playAgainButton).toBeInTheDocument();

    userEvent.click(playAgainButton);

    expect(history.location.pathname).toBe('/');
  });
  test('4 - Verifica se a tela renderiza o título "Feedback"', () => {
    renderWithRouterAndRedux(<Feedback />);

    const title = screen.getByRole('heading', { name: /Feedback/i, level: 1 });
    expect(title).toBeInTheDocument();
  });
})
