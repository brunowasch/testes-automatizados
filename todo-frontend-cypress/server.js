const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

let tarefas = [];
let idAtual = 1;

app.use(express.json());

app.post('/tarefas', (req, res) => {
  const { titulo, descricao, status, encerramento } = req.body;
  const novaTarefa = { id: idAtual++, titulo, descricao, status, encerramento };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});


app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.get('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id == req.params.id);
  if (!tarefa) return res.status(404).send('Tarefa não encontrada');
  res.json(tarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id == req.params.id);
  if (!tarefa) return res.status(404).send('Tarefa não encontrada');
  tarefa.status = req.body.status;
  res.json(tarefa);
});


app.delete('/tarefas/:id', (req, res) => {
  tarefas = tarefas.filter(t => t.id != req.params.id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});