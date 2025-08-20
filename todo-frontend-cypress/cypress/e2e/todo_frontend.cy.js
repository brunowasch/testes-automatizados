describe('ToDo List - Frontend SPA', () => {
  const tarefa = {
    titulo: 'Testar Cypress',
    descricao: 'Fazer testes end-to-end',
    encerramento: '2025-12-31T23:59'
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.contains('h1', 'ToDo List'); 
  });

  it('1. Deve carregar a página', () => {
    cy.get('h1').should('contain', 'ToDo List');
  });

  it('2. Deve criar uma nova tarefa via UI', () => {
    cy.get('#titulo').type(tarefa.titulo);
    cy.get('#descricao').type(tarefa.descricao);
    cy.get('#encerramento').type(tarefa.encerramento);
    cy.get('#btn-criar').click();

    cy.contains(tarefa.titulo);
  });

  it('3. Deve exibir em "Tarefas Pendentes"', () => {
    cy.get('#tarefas-pendentes').should('contain', tarefa.titulo);
  });

  it('4. Deve buscar tarefa específica por ID', () => {
    cy.request('GET', 'http://localhost:3000/tarefas').then((res) => {
      const candidatas = res.body.filter(t => t.titulo === tarefa.titulo);
      expect(candidatas, 'deve existir ao menos uma tarefa com esse título').to.have.length.greaterThan(0);
      const alvo = candidatas.reduce((max, t) => t.id > max.id ? t : max, candidatas[0]);

      cy.intercept('GET', `**/tarefas/${alvo.id}`).as('getById');
      cy.get('#busca-id').clear().type(String(alvo.id));
      cy.get('#btn-buscar').click();
      cy.wait('@getById');

      cy.get('#busca-especifica').should('contain', tarefa.titulo);
    });
  });

    it('5. Deve alterar status da tarefa para concluída', () => {
      cy.contains('#tarefas-geral li', tarefa.titulo)
        .within(() => {
          cy.contains('Concluir').click();
        });

      cy.contains('#tarefas-geral li', tarefa.titulo)
        .should('contain', 'concluída');
    });

  it('6. Deve excluir a tarefa', () => {
    const tituloUnico = `Testar Cypress ${Date.now()}`;

    cy.request('POST', 'http://localhost:3000/tarefas', {
      titulo: tituloUnico,
      descricao: 'Fazer testes end-to-end',
      encerramento: '2025-12-31T23:59',
      status: 'pendente'
    }).then((res) => {
      const id = res.body.id;

      cy.intercept('DELETE', '**/tarefas/*').as('del');
      cy.intercept('GET', '**/tarefas').as('list');

      cy.visit('http://localhost:3000');

      cy.get(`#tarefas-geral li[data-id="${id}"]`)
        .should('exist')
        .within(() => {
          cy.contains('Excluir').scrollIntoView().click({ force: true });
        });

      cy.wait('@del');
      cy.wait('@list');

      cy.request('GET', 'http://localhost:3000/tarefas')
        .its('body')
        .should((tarefas) => {
          expect(tarefas.find(t => t.id === id)).to.be.undefined;
        });

      cy.reload();
      cy.get('#tarefas-geral').should('not.contain', tituloUnico);
      cy.get('#tarefas-pendentes').should('not.contain', tituloUnico);
    });
  });
});