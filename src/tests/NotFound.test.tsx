import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('testando o componente NotFound', () => {
  test('Testando se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { name: 'Page requested not found' })).toBeInTheDocument();
  });

  test('Testando se a página mostra a imagem com o texto alternativo designado', () => {
    renderWithRouter(<NotFound />);
    const altImg = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
    expect(altImg).toHaveAttribute('src', '/404.gif');
  });
});
