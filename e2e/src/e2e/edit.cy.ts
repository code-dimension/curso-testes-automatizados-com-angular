describe('Fluxo para editar tarefa', () => {
  beforeEach(() => {
    cy.setUserAsLoggedIn();
    cy.visit('/');
  });

  it('deve editar uma tarefa pendente', () => {
    cy.intercept('GET', '/api/tasks', {
      fixture: 'edit/pending/get-tasks',
    }).as('getTasks');

    cy.wait('@getTasks');

    cy.intercept('GET', '/api/tasks/1', {
      fixture: 'edit/pending/get-task-by-id',
    }).as('getTaskById');

    cy.getByTestId('todo-list').within(() => {
      cy.getByTestId('todo-list-item').should('have.length', 1);

      cy.getByTestId('list-item-edit-action').click();
    });

    cy.wait('@getTaskById');

    cy.location('pathname').should('equal', '/edit/1');

    cy.fixture('edit/pending/get-task-by-id').then(task => {
      cy.getByTestId('edit-task-title').should('have.value', task.title);
      cy.isCheckboxChecked('edit-task-completed').should('be.false', task.completed);
    })

    cy.fixture('edit/pending/patch-payload').then(payload => {
        cy.getByTestId('edit-task-title').clear();
        cy.getByTestId('edit-task-title').type(payload.title);
        cy.getByTestId('edit-task-completed').check();

        cy.intercept('PUT', '/api/tasks/1', (req) => {
            expect(req.body).to.have.property('title', payload.title);
            expect(req.body).to.have.property('completed', payload.completed);

            req.reply({ fixture: 'edit/pending/patch-response' });
        })

        cy.getByTestId('edit-task-form').submit();

        cy.location('pathname').should('equal', '/');
    });
  });

  it('deve editar uma tarefa concluída', () => {
    cy.intercept('GET', '/api/tasks', {
      fixture: 'edit/completed/get-tasks',
    }).as('getTasks');

    cy.wait('@getTasks');

    cy.intercept('GET', '/api/tasks/1', {
      fixture: 'edit/completed/get-task-by-id',
    }).as('getTaskById');

    cy.getByTestId('completed-list').within(() => {
      cy.getByTestId('completed-list-item').should('have.length', 1);

      cy.getByTestId('list-item-edit-action').click();
    });

    cy.wait('@getTaskById');

    cy.location('pathname').should('equal', '/edit/1');

    cy.fixture('edit/completed/get-task-by-id').then(task => {
      cy.getByTestId('edit-task-title').should('have.value', task.title);
      cy.isCheckboxChecked('edit-task-completed').should('be.true', task.completed);
    })

    cy.fixture('edit/completed/patch-payload').then(payload => {
        cy.getByTestId('edit-task-title').clear();
        cy.getByTestId('edit-task-title').type(payload.title);
        cy.getByTestId('edit-task-completed').uncheck();

        cy.intercept('PUT', '/api/tasks/1', (req) => {
            expect(req.body).to.have.property('title', payload.title);
            expect(req.body).to.have.property('completed', payload.completed);

            req.reply({ fixture: 'edit/completed/patch-response' });
        })

        cy.getByTestId('edit-task-form').submit();

        cy.location('pathname').should('equal', '/');
    });
  });
});
