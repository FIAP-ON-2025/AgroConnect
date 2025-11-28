const cadastroForm = document.getElementById("form-contato"); 

let usuariosCadastrados =[];

function validarEmail(email){
    return email.includes("@") && email.includes(".");
}

function validarNome(nome) {
    const partesNome = nome.trim().split(/\s+/);
    
    if (partesNome.length < 2) {
        return { valido: false, mensagem: "Digite nome e sobrenome" };
    }
    
    for (let parte of partesNome) {
        if (parte.length < 2) {
            return { valido: false, mensagem: "Nome e sobrenome devem ter ao menos 2 letras cada" };
        }
    }
    
    return { valido: true };
}

function validarMensagem(mensagem) {
    if (mensagem.length > 500) {
        return { valido: false, mensagem: `Mensagem muito longa (${mensagem.length}/500 caracteres)` };
    }
    return { valido: true };
}

document.getElementById('assunto').addEventListener('change', function() {
    const outrosAssunto = document.getElementById('outrosAssunto');
    const outrosAssuntoLabel = document.getElementById('outrosAssuntoLabel');
 
    if (this.value === 'outros') {
        outrosAssunto.style.display = 'block';
        outrosAssuntoLabel.style.display = 'block';
    } else {
        outrosAssunto.style.display = 'none';
        outrosAssuntoLabel.style.display = 'none';
    }
});


const exibirError =(inputElement,mensagem)=>{
    inputElement.classList.add("error");
    let erroMensagem =inputElement.nextElementSibling;
    if(!erroMensagem  || !erroMensagem.classList.contains("error-message")){
        erroMensagem = document.createElement("small");
        erroMensagem.classList.add("error-message")
        inputElement.parentNode.insertBefore(erroMensagem, inputElement.nextElementSibling);
    }
    erroMensagem.textContent= mensagem;
    erroMensagem.style.color="red";
 
}

const removeErro=(inputElement)=>{
    inputElement.classList.remove("error");
    let erroMensagem =inputElement.nextElementSibling;
    if(erroMensagem && erroMensagem.classList.contains("error-message")){
        erroMensagem.remove();
    }
}
 
cadastroForm.addEventListener("submit", function(e){
    e.preventDefault();
 
    const nomeInput =document.getElementById("nome");
    const emailInput =document.getElementById("email");
    const mensagemInput =document.getElementById("mensagem");
    const assuntoInput = document.getElementById('assunto').value;
    const outrosAssuntoInput = document.getElementById('outrosAssunto').value;
    const telefoneInput =document.getElementById("telefone");
 
    const nome =nomeInput.value.trim();
    const email =emailInput.value.trim();
    const mensagem =mensagemInput.value.trim();
    const telefone =telefoneInput.value.trim();
    
    let isValid = true;
 
    removeErro(nomeInput);
    removeErro(emailInput);
    removeErro(mensagemInput);
    removeErro(telefoneInput);
 
    if(nome ===""){
        exibirError(nomeInput,"Nome obrigatório");
        isValid=false;
    } else {
        const resultadoValidacao = validarNome(nome);
        if (!resultadoValidacao.valido) {
            exibirError(nomeInput, resultadoValidacao.mensagem);
            isValid=false;
        }
    }

    if(email ===""){
        exibirError(emailInput, "Email obrigatório");
        isValid=false;
    } else if(!validarEmail(email)){
        exibirError(emailInput,"Por favor, insira um email válido");
        isValid=false;
    }

    if(mensagem ===""){
        exibirError(mensagemInput, "Mensagem obrigatória");
        isValid=false;
    } else {
        const resultadoValidacaoMensagem = validarMensagem(mensagem);
        if (!resultadoValidacaoMensagem.valido) {
            exibirError(mensagemInput, resultadoValidacaoMensagem.mensagem);
            isValid=false;
        }
    }
    
    if(telefone ===""){
        exibirError(telefoneInput, "Telefone obrigatório");
        isValid=false;
    }
    
    if(!isValid){
        return;
    }
    
    const mensagemEnviada = document.getElementById('mensagemEnviada');
    mensagemEnviada.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso e será respondida em breve.`;

    cadastroForm.reset();
})