describe('ToDo List - Frontend SPA', () => {
  const tarefa = {
    titulo: 'Testar Cypress',
    descricao: 'Fazer testes end-to-end',
    encerramento: '2025-12-31T23:59'
  };

  before(() => {
    cy.visit('http://localhost:3000'); // ou caminho ajustado conforme servidor estático
  });

  it('1. Deve criar uma nova tarefa', () => {
    cy.get('#titulo').type(tarefa.titulo);
    cy.get('#descricao').type(tarefa.descricao);
    cy.get('#encerramento').type(tarefa.encerramento);
    cy.get('#btn-criar').click();
    cy.contains(tarefa.titulo);
  });

  it('2. Deve exibir tarefas pendentes', () => {
    cy.get('#tarefas-pendentes').should('contain', tarefa.titulo);
  });

  it('3. Deve exibir todas as tarefas', () => {
    cy.get('#tarefas-geral').should('contain', tarefa.titulo);
  });

  it('4. Deve buscar tarefa específica por ID', () => {
    cy.get('#busca-id').type('1'); // usar ID válido
    cy.get('#btn-buscar').click();
    cy.get('#busca-especifica').should('contain', tarefa.titulo);
  });

  it('5. Deve alterar status da tarefa', () => {
    cy.contains(tarefa.titulo).parent().contains('Concluir').click();
    cy.contains(tarefa.titulo).parent().should('contain', 'concluída');
  });

  it('6. Deve excluir uma tarefa', () => {
    cy.contains(tarefa.titulo).parent().contains('Excluir').click();
    cy.get('#tarefas-geral').should('not.contain', tarefa.titulo);
  });
});
