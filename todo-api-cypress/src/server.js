const express = require('express');
const app = express();
app.use(express.json());

let tarefas = [];
let idAtual = 1;

// 1. Criar tarefa
app.post('/tarefas', (req, res) => {
  const { titulo, descricao, status, encerramento } = req.body;
  const novaTarefa = { id: idAtual++, titulo, descricao, status, encerramento };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// 2. Listar todas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

// 3. Buscar por ID
app.get('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id == req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(tarefa);
});

// 4. Editar tarefa
app.put('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id == req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

  const { titulo, descricao, status, encerramento } = req.body;
  tarefa.titulo = titulo ?? tarefa.titulo;
  tarefa.descricao = descricao ?? tarefa.descricao;
  tarefa.status = status ?? tarefa.status;
  tarefa.encerramento = encerramento ?? tarefa.encerramento;

  res.json(tarefa);
});

// 5. Excluir tarefa
app.delete('/tarefas/:id', (req, res) => {
  tarefas = tarefas.filter(t => t.id != req.params.id);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('API ToDo rodando em http://localhost:3000');
});
