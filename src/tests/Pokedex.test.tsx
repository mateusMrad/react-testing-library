import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testando o componente pokedéx', () => {
  test('Testando se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: 'Encountered Pokémon' })).toBeInTheDocument();
  });

  test('Testando se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', async () => {
    renderWithRouter(<App />);
    const nextPkmBtn = screen.getByText('Próximo Pokémon');
    expect(nextPkmBtn).toBeInTheDocument();
    await userEvent.click(nextPkmBtn);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    await userEvent.click(nextPkmBtn);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    await userEvent.click(nextPkmBtn);
    await userEvent.click(nextPkmBtn);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    await userEvent.click(nextPkmBtn);
    await userEvent.click(nextPkmBtn);
    await userEvent.click(nextPkmBtn);
    await userEvent.click(nextPkmBtn);
    await userEvent.click(nextPkmBtn);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Testando se a Pokédex tem os botões de filtro', async () => {
    renderWithRouter(<App />);
    const typesBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByText('All');

    expect(typesBtn).toHaveLength(7);
    expect(typesBtn[0]).toHaveTextContent('Electric');
    expect(typesBtn[1]).toHaveTextContent('Fire');
    expect(typesBtn[2]).toHaveTextContent('Bug');
    expect(typesBtn[3]).toHaveTextContent('Poison');
    expect(typesBtn[4]).toHaveTextContent('Psychic');
    expect(typesBtn[5]).toHaveTextContent('Normal');
    expect(typesBtn[6]).toHaveTextContent('Dragon');
    await userEvent.click(typesBtn[4]);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    await userEvent.click(typesBtn[6]);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();

    expect(allBtn).toBeInTheDocument();
    expect(allBtn).toBeEnabled();
  });

  test('Testando se a Pokédex contém um botão para resetar o filtro:', async () => {
    renderWithRouter(<App />);
    const typesBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByText('All');
    await userEvent.click(typesBtn[2]);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    await userEvent.click(allBtn);
    expect(allBtn).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(allBtn).toBeEnabled();
  });
});
