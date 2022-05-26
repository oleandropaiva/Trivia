import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';
import Game from '../pages/Game';

describe('Testes para atingir 90% de cobertura da tela de Jogo', () => {

  test('1 - Verifica se a tela de jogo é renderizada', async () => {
   const { history } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    const textbox = screen.getAllByRole('textbox');

    userEvent.type(textbox[0], 'grupo13@gmail.com');
    userEvent.type(textbox[1], 'Grupo13');
    expect(playButton).not.toBeDisabled();
    
    userEvent.click(playButton);
    await screen.findByText("TESTE");
    const player = screen.getByText(/Grupo13/i)
    expect(player).toBeInTheDocument();
    expect(history.location.pathname).toBe('/game')

  });
  test('2 - Verifica se o nome do jogador é renderizado na tela', async () => {
    renderWithRouterAndRedux(<Game />);

     const score = screen.getByText(/placar/i);

     expect(score).toBeInTheDocument();
   });
   test('3 - Verifica se um avatar é renderizado na tela', async () => {
    renderWithRouterAndRedux(<Game />);

     const avatar = screen.getByRole('img');

     expect(avatar).toBeDefined();
     expect(avatar).toHaveAttribute('alt', 'gravatar')
   });
})
