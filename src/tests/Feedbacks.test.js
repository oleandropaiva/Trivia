import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Feedback from '../pages/Feedback';

describe('Testes para atingir 90% de cobertura da tela de Feedbacks', () => {

  test('1 - Verifica se a página possui um botão "Ver Ranking"', () => {
      renderWithRouterAndRedux(<Feedback />);

      const verRankingButton = screen.getByRole('button', { name: /Ver Ranking/i });
      expect(verRankingButton).toBeInTheDocument();
  });
})
