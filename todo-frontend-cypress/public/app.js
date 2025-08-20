const API_URL = "http://localhost:3000/tarefas";

const $ = (sel) => document.querySelector(sel);

$('#btn-criar').addEventListener('click', async () => {
  const titulo = $('#titulo').value.trim();
  const descricao = $('#descricao').value.trim();
  const encerramento = $('#encerramento').value;

  if (!titulo) { alert('Título é obrigatório'); return; }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descricao, encerramento, status: "pendente" })
  });
  await carregarTarefas();
  $('#titulo').value = '';
  $('#descricao').value = '';
  $('#encerramento').value = '';
});

$('#btn-buscar').addEventListener('click', async () => {
  const id = $('#busca-id').value;
  const ul = $('#busca-especifica');
  ul.innerHTML = '';
  if (!id) return;

  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    ul.innerHTML = `<li>Não encontrado</li>`;
    return;
  }
  const tarefa = await res.json();
  ul.innerHTML = `<li data-id="${tarefa.id}">${tarefa.titulo} - ${tarefa.status}</li>`;
});

async function carregarTarefas() {
  const res = await fetch(API_URL);
  const tarefas = await res.json();
  const pendentes = $('#tarefas-pendentes');
  const geral = $('#tarefas-geral');
  pendentes.innerHTML = "";
  geral.innerHTML = "";

  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.setAttribute('data-id', t.id);
    li.innerHTML = `
      <strong>${t.titulo}</strong> - <span class="status">${t.status}</span>
      <button class="btn-concluir">Concluir</button>
      <button class="btn-excluir">Excluir</button>
    `;
    geral.appendChild(li);

    if (t.status === "pendente") {
      const liPend = document.createElement('li');
      liPend.textContent = `${t.titulo} - ${t.descricao ?? ''}`;
      pendentes.appendChild(liPend);
    }
  });

  geral.querySelectorAll('.btn-concluir').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.closest('li').getAttribute('data-id');
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "concluída" })
      });
      await carregarTarefas();
    });
  });

  geral.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.closest('li').getAttribute('data-id');
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      await carregarTarefas();
    });
  });
}

carregarTarefas().catch(() => {
  $('#tarefas-geral').innerHTML = '<li>API offline</li>';
  $('#tarefas-pendentes').innerHTML = '<li>API offline</li>';
});