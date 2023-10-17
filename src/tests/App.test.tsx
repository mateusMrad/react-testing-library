import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente app', () => {
  test('Testando se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favoritePokemon = screen.getByText('Favorite Pokémon');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });

  test('Testando se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home', async () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    await userEvent.click(home);
    expect(screen.getByText('Encountered Pokémon')).toBeInTheDocument();
  });

  test('Testando se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About', async () => {
    renderWithRouter(<App />);
    const about = screen.getByText('About');
    await userEvent.click(about);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  test('Testando se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon', async () => {
    renderWithRouter(<App />);
    const favoritePokemon = screen.getByText('Favorite Pokémon');
    await userEvent.click(favoritePokemon);
    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
  });

  test('Testando se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
    renderWithRouter(<App />, { route: '/germanCano' });
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
