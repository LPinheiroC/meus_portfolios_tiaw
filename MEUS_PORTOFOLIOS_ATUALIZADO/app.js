// declara um conjunto inicial de contatos
var db_contatos_inicial = {
    "data": [
        {
            "id": 1,
            "nome": "Empresa pequena",
            "data": "05/05/2022",
            "tamanho": "4MB",
            "Visualizar": "/assets/exemplo.pdf"
        },
        {
            "id": 2,
            "nome": "empresa média",
            "data": "05/05/2022",
            "tamanho": "4MB",
            "Visualizar": "/assets/exemplo.pdf"
        },
        {
            "id": 3,
            "nome": "FOTOS CASAMENTO",
            "data": "05/05/2022",
            "tamanho": "4MB",
            "Visualizar": "/assets/exemplo.pdf"
        },
        {
            "id": 4,
            "nome": "Fotos cardapio",
            "data": "05/05/2022",
            "tamanho": "4MB",
            "Visualizar": "/assets/exemplo.pdf"
        }
    ]
}

$("#filtro_cidade").keyup(() => ListaContatos())

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_contato'));
if (!db) {
    db = db_contatos_inicial
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function insertContato(contato) {
    // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
    let novoId = 1;
    if (db.data.length != 0) 
      novoId = db.data[db.data.length - 1].id + 1;
    let novoContato = {
        "id": novoId,
        "nome": contato.nome,
        "data" : contato.data,
        "tamanho": contato.tamanho,
        "Visualizar": contato.Visualizar,
    };

    // Insere o novo objeto no array
    db.data.push(novoContato);
    displayMessage("Contato inserido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}

function updateContato(id, contato) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.data.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    db.data[index].nome = contato.nome,
    db.data[index].tamanho = contato.tamanho,
    db.data[index].data = contato.data,
    
    displayMessage("Contato alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}

function deleteContato(id) {    
    // Filtra o array removendo o elemento com o id passado
    db.data = db.data.filter(function (element) { return element.id != id });

    displayMessage("Contato removido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_contato', JSON.stringify(db));
}