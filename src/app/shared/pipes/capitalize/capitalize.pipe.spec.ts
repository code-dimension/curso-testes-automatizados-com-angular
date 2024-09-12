import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('deve retornar o texto com a primeira letra maiúscula', () => {
    const pipe = new CapitalizePipe();

    const fakeText = 'essa é uma tarefa de mentira';
    const result = 'Essa é uma tarefa de mentira';

    expect(pipe.transform(fakeText)).toBe(result);
  });
});
