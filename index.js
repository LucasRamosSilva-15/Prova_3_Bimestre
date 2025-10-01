const corpoTabelaListagem = document.getElementById("corpoTabelaListagem");
let listaAlunos = [];

function efetuarCadastroAluno() {
  const matricula = document.getElementById("matricula").value;
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const nota1 = parseFloat(document.getElementById("nota1").value) || 0;
  const nota2 = parseFloat(document.getElementById("nota2").value) || 0;

  const aluno = criarAluno(matricula, nome, idade, "", nota1, nota2);
  calculoMedia(aluno);
  incluirAlunoTabelaResultadoBusca(aluno);
  apagarCamposHTMLDadosAluno();

  listaAlunos.push(aluno);
}

function criarAluno(matricula, nome, idade, email, nota1, nota2) {
  return { matricula, nome, idade, email, nota1, nota2, media: 0, conceito: "" };
}

function calculoMedia(aluno) {
  const media = (aluno.nota1 + aluno.nota2) / 2;
  aluno.media = media.toFixed(2);
  aluno.conceito = media >= 7 ? "Aprovado" : "Reprovado";
}

function incluirAlunoTabelaResultadoBusca(aluno) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${aluno.matricula}</td>
    <td>${aluno.nome}</td>
    <td>${aluno.idade}</td>
    <td>${aluno.nota1}</td>
    <td>${aluno.nota2}</td>
    <td>${aluno.media}</td>
    <td>${aluno.conceito}</td>`;
  corpoTabelaListagem.appendChild(tr);
}

function apagarCamposHTMLDadosAluno() {
  document.getElementById("matricula").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
}
function buscarAluno() {
  const matriculaBusca = document.getElementById("busca").value;
  const resultadoDiv = document.getElementById("colunapia3");

  const aluno = listaAlunos.find(a => a.matricula === matriculaBusca);

  if (aluno) {
    resultadoDiv.innerHTML = `
      <h2>Aluno encontrado:</h2>
      <p>
      <strong>Matrícula:</strong> ${aluno.matricula}
      <strong>Nome:</strong> ${aluno.nome}
      </p>
      <p>
      <strong>Idade:</strong> ${aluno.idade}
      <strong>Nota 1:</strong> ${aluno.nota1}
      </p>
      <p>
      <strong>Nota 2:</strong> ${aluno.nota2}
      <strong>Média:</strong> ${aluno.media}
      </p>
      <p>
      <strong>Conceito:</strong> ${aluno.conceito}
      </p>
    `;
  } else {
    resultadoDiv.innerHTML = "<h2>Aluno não encontrado.</h2>";
  }
}

function removerAluno() {
  const matriculaRemover = document.getElementById("remover").value;
  const resultadoDiv = document.getElementById("colunapia2_3");

  const index = listaAlunos.findIndex(a => a.matricula === matriculaRemover);

  if (index !== -1) {
    listaAlunos.splice(index, 1); // remove do array
    atualizarTabela();
    resultadoDiv.innerHTML = `<h2>Aluno de matrícula ${matriculaRemover} removido com sucesso.</h2>`;
  } else {
    resultadoDiv.innerHTML = `<h2>Aluno não encontrado.</h2>`;
  }
}

function editarNotas() {
  const matriculaEditar = document.getElementById("editar").value;
  const novaNota1 = parseFloat(document.getElementById("editnota1").value) || 0;
  const novaNota2 = parseFloat(document.getElementById("editnota2").value) || 0;
  const msgEditar = document.getElementById("msgEditar");

  const aluno = listaAlunos.find(a => a.matricula === matriculaEditar);

  if (aluno) {
    aluno.nota1 = novaNota1;
    aluno.nota2 = novaNota2;
    calculoMedia(aluno);
    atualizarTabela();
    msgEditar.innerHTML = `<h2>Notas atualizadas para o aluno ${aluno.nome}.</h2>`;
  } else {
    msgEditar.innerHTML = `<h2>Aluno não encontrado.</h2>`;
  }
}

function atualizarTabela() {
  corpoTabelaListagem.innerHTML = `
    <tr>
      <th>Matrícula</th>
      <th>Nome</th>
      <th>Idade</th>
      <th>Nota 1</th>
      <th>Nota 2</th>
      <th>Média</th>
      <th>Conceito</th>
    </tr>
  `;

  listaAlunos.forEach(aluno => incluirAlunoTabelaResultadoBusca(aluno));
}