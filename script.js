// Array com participantes disponíveis
let participantes = [
    {
        name: 'NatBiscoito',
        email: 'natsukigu729@gmail.com',
        dataInscricao: new Date(2024, 1, 3), // Data de inscrição do participante (ano, mês, dia)
        dataCheckIn: new Date(2024, 1, 3)    // Data de check-in do participante (ano, mês, dia)
    },
    {
        name: 'Haru',
        email: 'haruzinho@gmail.com',
        dataInscricao: new Date(2024, 3, 2), // Data de inscrição do participante (ano, mês, dia)
        dataCheckIn: new Date(2024, 2, 3)    // Data de check-in do participante (ano, mês, dia)
    },
    {
        name: 'Miguel',
        email: 'miguelito@gmail.com',
        dataInscricao: new Date(2024, 3, 3), // Data de inscrição do participante (ano, mês, dia)
        dataCheckIn: new Date(2024, 2, 3)    // Data de check-in do participante (ano, mês, dia)
    },
]

// Função para criar a representação de um participante na tela
const criarParticipante = (participante) => {
    // Utiliza a biblioteca dayjs para calcular a diferença entre a data atual e a data de inscrição/check-in
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

    //Condição para criar um botão de Check In todas as vezes
    if(participante.dataCheckIn == null) {
        dataCheckIn = `
        <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
         Confirmar Check-in
        </button>
        `
    }

    // Retorna uma string HTML representando os dados do participante em uma linha de tabela
    return `        
    <tr>
        <td><strong>${participante.name}</strong>
        <br>${participante.email}</td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
        <button class="apagar" onclick="removerParticipante('${participante.name}')">Remover</button>
    </tr>`;
}

// Função para remover participante
const removerParticipante = (name) => {
    const msgConfirm = 'Deseja confirmar?'

     if(confirm(msgConfirm) == false) {
        return
     }

    for (let i = 0; i < participantes.length; i++) {
        if (participantes[i].name === name) {
            participantes.splice(i,1);
            break;
        }
    }
    atualizarLista(participantes)
}

// Função para atualizar a lista de participantes na tela
const atualizarLista = (participantes) => {
    let output = "";
    // Analisa cada participante e cria a representação HTML para cada um
    for(let participante of participantes){
        output = output + criarParticipante(participante);
    }

    // Atualiza o conteúdo da tabela no documento HTML com a lista de participantes gerada
    document.querySelector('tbody').innerHTML = output;
}

//Função p/adicionar um novo participante apartir do formulario
const adicionarParticipante = (event) => {

    event.preventDefault()

    const dadosForm = new FormData(event.target)
    
    const participante = {
        name: dadosForm.get('nome'),
        email: dadosForm.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

        // Verificar se o Participante ja existe
        const participanteExist = participantes.find((p) => p.email == participante.email
    )

    if(participanteExist) {
        alert('Email ja cadastrado!')
        return
    }

    participantes = [participante, ...participantes]

atualizarLista(participantes)

 //Limpar o Formulario quando der OutPut
 //Selecionar evento do input de nome e email e deixar vazio
 event.target.querySelector('[name="nome"]').value = ""
 event.target.querySelector('[name="email"]').value = ""
}

//Função p/adicionar check-in assim que apertar o button
const fazerCheckIn = (event) => {
    // Confirmar Check-In
    const msgConfirm = 'Deseja confirmar o Check-In?'

    //Condição de cancelar ação
     if(confirm(msgConfirm) == false) {
        return
     }

    //Encontrar o Participante dentro da Lista 
    const participante = participantes.find((p) => 
     p.email == event.target.dataset.email
    )
    // Atualizar o Check-in do Participante
    participante.dataCheckIn = new Date()
    // Atualizar a lista de Participantes
    atualizarLista(participantes)
}

//Função p/executar a atualização de lista
atualizarLista(participantes);


// Codigozinho de Dark/Light mode
function toggleMode() {

    const html = document.documentElement
  
    html.classList.toggle("light");
  
    //Mudar icones no light mode
  
    const img1 = document.querySelector();
    const img2 = document.querySelector();
  
    if (html.classList.contains("light")) {
      img1.setAttribute('src', './assets/name-icon-light.svg');
      img2.setAttribute('src', './assets/email-icon-light.svg');
    } else {
      img1.setAttribute('src', './assets/name-icon.svg');
      img2.setAttribute('src', './assets/email-icon.svg');
    }
  }