import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../../App';

describe('Testes para atingir 90% de cobertura da tela de Login', () => {

  test('1 - Verifica se a página possui um botão "play"', () => {
      renderWithRouterAndRedux(<App />);

      const playButton = screen.getByRole('button', { name: /play/i });
      expect(playButton).toBeInTheDocument();
  });
  test('2 - Verifica se a página possui um botão "settings" ', () => {
    renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton).toBeInTheDocument();
  });
  test('3 - Verifica se a página possui dois inputs de texto', () => {
    renderWithRouterAndRedux(<App />);

    const textbox = screen.getAllByRole('textbox');
    expect(textbox).toHaveLength(2);
  });
  test('4 - Verifica se o botão "settings" redireciona para configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });

    userEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/settings')

  });
  test('5 - Verifica se o botão "play" inicia desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    
    const playButton = screen.getByRole('button', { name: /play/i });
    
    expect(playButton).toBeDisabled();

  });
  test('6 - Verifica se o botão "play" é habilitado após o preenchimento dos inputs', () => {
   const { history } = renderWithRouterAndRedux(<App />);
    
    const playButton = screen.getByRole('button', { name: /play/i });
    const textbox = screen.getAllByRole('textbox');

    userEvent.type(textbox[0], 'grupo13@gmail.com');
    userEvent.type(textbox[1], 'Grupo13');

    expect(playButton).not.toBeDisabled();
  });
  test('7 - Verifica se o botão "play" está desabilitado se o campo de "email" estiver vazio', () => {
    renderWithRouterAndRedux(<App />);
    
    const playButton = screen.getByRole('button', { name: /play/i });
    const textbox = screen.getAllByRole('textbox');

    userEvent.type(textbox[0], '');
    userEvent.type(textbox[1], 'Grupo13');

    expect(playButton).toBeDisabled();
  });
  test('8 - Verifica se o botão "play" está desabilitado se o campo de "player" estiver vazio', () => {
    renderWithRouterAndRedux(<App />);
    
    const playButton = screen.getByRole('button', { name: /play/i });
    const textbox = screen.getAllByRole('textbox');

    userEvent.type(textbox[0], 'grupo13@gmail.com');
    userEvent.type(textbox[1], '');

    expect(playButton).toBeDisabled();
  });
  test('9 - Verifica se o botão "play" redireciona para games', async () => {
   const { history } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    const textbox = screen.getAllByRole('textbox');

    userEvent.type(textbox[0], 'grupo13@gmail.com');
    userEvent.type(textbox[1], 'Grupo13');
    expect(playButton).not.toBeDisabled();
    
    userEvent.click(playButton);

    await screen.findByText("Game");

    expect(history.location.pathname).toBe('/game')
  });
})