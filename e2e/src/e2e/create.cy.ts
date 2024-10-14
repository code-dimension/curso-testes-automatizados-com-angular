describe('Fluxo para criar tarefa', () => {
    
    beforeEach(() => {
        cy.setUserAsLoggedIn();
        cy.visit('/');
    });

    it('deve criar uma tarefa', () => {
        cy.getByTestId('list-create-task').click();

        cy.location('pathname').should('equal', '/create');

        cy.fixture('create/post-payload').then((payload) => {
            cy.intercept('POST', '/api/tasks', req => {
                expect(req.body).to.have.property('title', payload.title);
                expect(req.body).to.have.property('completed', payload.completed);

                req.reply({ fixture: 'create/post-response' });
            })

            cy.getByTestId('create-task-title').type(payload.title);
        });

        cy.getByTestId('create-task-form').submit();

        cy.location('pathname').should('equal', '/');
    });

});