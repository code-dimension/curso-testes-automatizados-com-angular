describe('fluxo de autenticação', () => {
  context('quando o usuário não estiver logado', () => {
    beforeEach(() => cy.visit('/'));

    it('deve redirecionar para a rota de login, autenticar usuário e redirecionar para a listagem', () => {
      cy.location('pathname').should('be.eq', '/login');

      cy.fixture('credentials').then((credentials) => {
        cy.getByTestId('login-email').type(credentials.email);
        cy.getByTestId('login-password').type(credentials.password);
      });

      cy.getByTestId('login-form').submit();

      cy.location('pathname').should('be.eq', '/');
    });

    it('não deve existir um botão de logout', () => {
      cy.location('pathname').should('be.eq', '/login');

      cy.getByTestId('header-logout').should('not.exist');
    });
  });

  context('quando o usuário estiver logado', () => {
    beforeEach(() => {
      cy.setUserAsLoggedIn();
      cy.visit('/'); 
    });

    it('deve permanecer na rota de listagem', () => {
      cy.location('pathname').should('equal', '/');
    });

    it.only('deve fazer o logout do usuário', () => {
      cy.pause();

      cy.getByTestId('header-logout').click();

      cy.pause();

      cy.location('pathname').should('equal', '/login');
    });
  });
});
