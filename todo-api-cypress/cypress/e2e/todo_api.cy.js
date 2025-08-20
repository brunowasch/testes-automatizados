describe('API ToDo List', () => {
  const API = 'http://localhost:3000';
  let idCriado;

  before(() => {
    cy.request('POST', `${API}/__reset`);
  });

  it('1. Deve criar uma nova tarefa', () => {
    cy.request('POST', `${API}/tarefas`, {
      titulo: 'Estudar Cypress',
      descricao: 'Comandos básicos',
      status: 'pendente',
      encerramento: '2025-12-31T23:59:59'
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      idCriado = res.body.id;
    });
  });

  it('2. Deve listar todas as tarefas', () => {
    cy.request('GET', `${API}/tarefas`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array').and.have.length.greaterThan(0);
    });
  });

  it('3. Deve buscar uma tarefa pelo ID', () => {
    cy.request('GET', `${API}/tarefas/${idCriado}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.titulo).to.eq('Estudar Cypress');
    });
  });

  it('4. Deve editar uma tarefa existente', () => {
    cy.request('PUT', `${API}/tarefas/${idCriado}`, {
      status: 'concluída'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.status).to.eq('concluída');
    });
  });

  it('5. Deve excluir uma tarefa pelo ID', () => {
    cy.request('DELETE', `${API}/tarefas/${idCriado}`).then((res) => {
      expect(res.status).to.eq(204);
    });
  });
});