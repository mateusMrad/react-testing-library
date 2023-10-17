import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('testando o componente favorite Pokémon', () => {
  test('É exibida na tela a mensagem No favorite Pokémon found caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<FavoritePokemon />);
    expect(screen.getByText('No favorite Pokémon found'));
  });

  test('Apenas são exibidos os Pokémon favoritados.', async () => {
    renderWithRouter(<App />, { route: '/pokemon/151' });
    const favCheckbox = screen.getByRole('checkbox');
    await userEvent.click(favCheckbox);
    const favPokemon = screen.getByText('Favorite Pokémon');
    await userEvent.click(favPokemon);
    expect(screen.getByText('Mew')).toBeInTheDocument();
  });
});
