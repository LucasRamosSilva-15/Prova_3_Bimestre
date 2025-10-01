const corpoTabelaListagem = document.getElementById("corpoTabelaListagem"); // HTML elem

const id = document.getElementById("livroID"); // HTML elem
const título = document.getElementById("livroTitulo"); // HTML elem
const ano = document.getElementById("livroAno"); // HTML elem
const inputBuscarTitulo = document.getElementById("inputBuscarTitulo"); // HTML elem

let mensagemBusca = document.getElementById("parResultadoBusca");
let livro;

let listaLivros = []; // lista (array) de objetos livros


function efetuarCadastroLivro() {
	livro = criarLivro(id.value, título.value, ano.value);

	// incluir o objeto livro na lista de livros
	listaLivros.push(livro);
	
	// incluir o livro na tabela de resultado da busca
	incluirLivroTabelaResultadoBusca();
	apagarCamposHTMLDadosLivro();
}

function criarLivro(umId, umTítulo, umAno) {
	// criar objeto livro
	const objetoLivro = {
		id: umId,
		titulo: umTítulo,
		ano: umAno,
	};

	return objetoLivro;
}

function incluirLivroTabelaResultadoBusca() {
	const novaLinha = criarNovaLinhaComDadosLivro();
	corpoTabelaListagem.appendChild(novaLinha);
}

function criarNovaLinhaComDadosLivro() {
	const novaLinha = document.createElement("tr");
	novaLinha.innerHTML = `<td class="aero-glass">${livro.id}</td><td class="aero-glass">${livro.titulo}</td><td class="aero-glass">${livro.ano}</td>`;
	return novaLinha;
}

function apagarCamposHTMLDadosLivro() {
	// apagar os valores dos campos
	id.value = "";
	título.value = "";
	ano.value = "";
}

function processarBuscaLivroPorTítulo() {
	// ler o valor do campo HTML input de busca de título
	const parteTituloDigitado = inputBuscarTitulo.value.toLowerCase();
	// varrer a lista de objetos livros (achouu ou não)
	const livroRetornado = buscarLivroNaListaPor(parteTituloDigitado);
	// mostrar o resultado da busca na página HTML
	mostrarMensagemResultadoBusca(livroRetornado);
	// apagar o valor do campo HTML input de busca de título
	apagarCampoHTMLBuscaTítulo();
}

function buscarLivroNaListaPor(uma_parte_do_titulo) {
	// retornar o objeto livro encontrado ou undefined

	let livroRetorno = undefined;

	livroRetorno = listaLivros.find((cadaLivro) =>
		cadaLivro.titulo.toLowerCase().includes(uma_parte_do_titulo) // true ou false  
	);

	return livroRetorno;
}

function mostrarMensagemResultadoBusca(livro) {
	if (livro) {
		mensagemBusca.innerHTML = `<strong>Livro encontrado:</strong><br>\
            Livro ID: ${livro.id}<br>\
            Título: ${livro.titulo}<br>\
            Ano de Publicação: ${livro.ano}`;
	} else {
		mensagemBusca.textContent = `Nenhum livro encontrado.`;
	}
}

function apagarCampoHTMLBuscaTítulo() {
	// resetar elemento HTML input de busca de título
	inputBuscarTitulo.value = "";
}
