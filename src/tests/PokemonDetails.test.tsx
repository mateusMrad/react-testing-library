import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const alakaz = '/pokemon/65';

describe('testando o componente Pokemon Details', () => {
  test('Testando se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />, { route: alakaz });
    expect(screen.getByRole('heading', { name: 'Alakazam Details' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    const prg = screen.getByText(/Closing both its eyes heightens all its other senses/i);
    expect(prg).toHaveTextContent(/Closing both its eyes heightens all its other senses/i);
  });
  test('Testando se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />, { route: alakaz });
    expect(screen.getByRole('heading', { name: 'Game Locations of Alakazam' })).toBeInTheDocument();
    const img = screen.getByAltText('Alakazam location');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/4/44/Unova_Accumula_Town_Map.png');
    expect(screen.getByText('Unova Accumula Town')).toBeInTheDocument();
  });
  test('Testando se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    renderWithRouter(<App />, { route: alakaz });
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    const img = screen.getByAltText('Alakazam is marked as favorite');
    expect(img).toBeInTheDocument();
    await userEvent.click(checkbox);
    expect(img).not.toBeInTheDocument();
  });
});
