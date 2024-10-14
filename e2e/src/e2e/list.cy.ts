describe('Fluxo de listagem', () => {
  beforeEach(() => {
    cy.setUserAsLoggedIn();
    cy.visit('/');
  });

  context('Cenários de listagem de tarefas', () => {
    it('deve renderizar nenhuma tarefa', () => {
      cy.intercept('GET', '/api/tasks', []).as('getTasks');

      cy.wait('@getTasks');

      cy.location('pathname').should('equal', '/');

      cy.getByTestId('todo-list').within(() => {
        cy.getByTestId('todo-list-item').should('have.length', 0);
        cy.getByTestId('no-items-message').should('have.length', 1);
      });

      cy.getByTestId('completed-list').within(() => {
        cy.getByTestId('completed-list-item').should('have.length', 0);
        cy.getByTestId('no-items-message').should('have.length', 1);
      });
    });

    it('deve renderizar 2 tarefas pendentes e 1 concluída', () => {
      cy.intercept('GET', '/api/tasks', {
        fixture: 'list/2-tasks-completed-1-not-completed.json',
      }).as('getTasks');

      cy.wait('@getTasks');

      cy.getByTestId('todo-list').within(() => {
        cy.getByTestId('todo-list-item').should('have.length', 2);
        cy.getByTestId('no-items-message').should('have.length', 0);
      });

      cy.getByTestId('completed-list').within(() => {
        cy.getByTestId('completed-list-item').should('have.length', 1);
        cy.getByTestId('no-items-message').should('have.length', 0);
      });
    });
  });

  context('Cenário de concluir e desconcluir tarefas', () => {
    it('deve completar uma tarefa', () => {
      cy.intercept('GET', '/api/tasks', {
        fixture: 'list/complete/get-tasks',
      }).as('getTasks');

      cy.wait('@getTasks');

      cy.getByTestId('todo-list').within(() => {
        cy.getByTestId('todo-list-item').should('have.length', 1);
        cy.getByTestId('no-items-message').should('have.length', 0);
      });

      cy.intercept('PATCH', '/api/tasks/1', (req) => {
        expect(req.body).to.have.property('completed', true);

        req.reply({ fixture: 'list/complete/patch-response' });
      });

      cy.getByTestId('list-item-complete-action').click();

      cy.getByTestId('todo-list').within(() => {
        cy.getByTestId('todo-list-item').should('have.length', 0);
        cy.getByTestId('no-items-message').should('have.length', 1);
      });

      cy.getByTestId('completed-list').within(() => {
        cy.getByTestId('completed-list-item').should('have.length', 1);
        cy.getByTestId('no-items-message').should('have.length', 0);
      });
    });

    it('deve descompletar uma tarefa', () => {
      cy.intercept('GET', '/api/tasks', {
        fixture: 'list/uncomplete/get-tasks',
      }).as('getTasks');

      cy.wait('@getTasks');

      cy.getByTestId('completed-list').within(() => {
        cy.getByTestId('completed-list-item').should('have.length', 1);
        cy.getByTestId('no-items-message').should('have.length', 0);
      });

      cy.intercept('PATCH', '/api/tasks/1', (req) => {
        expect(req.body).to.have.property('completed', false);

        req.reply({ fixture: 'list/uncomplete/patch-response' });
      });

      cy.getByTestId('list-item-mark-as-pending-action').click();

      cy.getByTestId('completed-list').within(() => {
        cy.getByTestId('completed-list-item').should('have.length', 0);
        cy.getByTestId('no-items-message').should('have.length', 1);
      });

      cy.getByTestId('todo-list').within(() => {
        cy.getByTestId('todo-list-item').should('have.length', 1);
        cy.getByTestId('no-items-message').should('have.length', 0);
      });
    });
  });

  context('Cenário de remover tarefas', () => {
    it('deve remover uma tarefa pendente', () => {
      cy.intercept('GET', '/api/tasks', {
        fixture: 'list/remove/pending/get-tasks',
      }).as('getTasks');

      cy.wait('@getTasks');

      cy.getByTestId('todo-list').within(() => {
        cy.getByTestId('todo-list-item').should('have.length', 1);
        cy.getByTestId('no-items-message').should('have.length', 0);
      });

      cy.intercept('DELETE', '/api/tasks/1', {
        fixture: 'list/remove/pending/delete-response',
      }).as('deleteTask');

      cy.getByTestId('list-item-remove-action').click();

      cy.wait('@deleteTask');

      cy.getByTestId('todo-list').within(() => {
        cy.getByTestId('todo-list-item').should('have.length', 0);
        cy.getByTestId('no-items-message').should('have.length', 1);
      });
    });

    it('deve remover uma tarefa concluída', () => {
        cy.intercept('GET', '/api/tasks', {
          fixture: 'list/remove/completed/get-tasks',
        }).as('getTasks');
  
        cy.wait('@getTasks');
  
        cy.getByTestId('completed-list').within(() => {
          cy.getByTestId('completed-list-item').should('have.length', 1);
          cy.getByTestId('no-items-message').should('have.length', 0);
        });
  
        cy.intercept('DELETE', '/api/tasks/1', {
          fixture: 'list/remove/completed/delete-response',
        }).as('deleteTask');
  
        cy.getByTestId('list-item-remove-action').click();
  
        cy.wait('@deleteTask');
  
        cy.getByTestId('completed-list').within(() => {
          cy.getByTestId('completed-list-item').should('have.length', 0);
          cy.getByTestId('no-items-message').should('have.length', 1);
        });
      });
  });
});
