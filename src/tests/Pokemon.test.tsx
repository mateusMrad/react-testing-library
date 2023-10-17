import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const detalhes = 'More details';

describe('Testando o componente Pokemon', () => {
  test('Testando se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Testando se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: detalhes });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemon/25');
  });
  test('Testando se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: detalhes });
    await userEvent.click(moreDetails);
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' })).toBeInTheDocument();
    const { pathname } = window.location;
    expect(pathname).toBe('/pokemon/25');
  });
  test('Testando se existe um ícone de estrela nos Pokémon favoritados', async () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: detalhes });
    await userEvent.click(moreDetails);
    const checkBox = screen.getByRole('checkbox');
    await userEvent.click(checkBox);
    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toHaveAttribute('src', '/star-icon.png');
  });
});
