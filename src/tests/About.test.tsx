import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('testando o componente about', () => {
  test('Testando se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('What does this app do?')).toBeInTheDocument();
  });

  test('Testando se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('heading', { name: 'About Pokédex' })).toBeInTheDocument();
  });

  test('Testando se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémon by type/i);
    expect(firstParagraph).toHaveTextContent(/This application simulates a Pokédex/i);
    expect(secondParagraph).toHaveTextContent(/One can filter Pokémon by type/i);
  });

  test('Testando se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img', { name: 'Pokédex' });
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
