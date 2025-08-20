# Testes automatizados com Cypress 🤖

Este projeto é uma lista de tarefas simples (ToDo List) desenvolvida com o objetivo de praticar e demonstrar o uso de testes automatizados utilizando o [Cypress](https://www.cypress.io).

## Funcionalidades da aplicação
- Criar novas tarefas
- Listar tarefas pendentes e concluídas
- Atualizar informações de uma tarefa
- Excluir tarefas

O projeto possui interface simples e feita unicamente para testes automatizados.

## Os testes foram implementados com Cypress para validar:
- Criação de uma nova tarefa
- Exibição de tarefas pendentes
- Exibição de todas as tarefas cadastradas
- Alteração de status de uma tarefa (pendente → concluída)
- Exclusão de tarefas]

## Como rodar o projeto?
```bash
# Clone o repositório
git clone https://github.com/brunowasch/testes-automatizados.git
cd testes-automatizados

# Configure e rode o Backend (API)
cd todo-api-cypress

# Instale as dependências do backend 
npm install

# Inicie o servidor backend
npm start

# Obs: mantenha esse terminal aberto rodando a API!

# Configure o Frontend

cd ../todo-frontend-cypress

# Instala as dependências do frontend
npm install

# Inicie o frontend
npm start

# Rode os testes com Cypress  (A API e o Frontend devem estar rodando)

# Execute o comando:
npx cypress open

# Isso abrirá a interface do Cypress para rodar os testes E2E.

```
