document.addEventListener('DOMContentLoaded', function() {
    const perfilRadios = document.querySelectorAll('input[name="perfil"]');
    const labelDocumento = document.getElementById('labelDocumento');
    const campoIdSocial = document.getElementById('campoIdSocial');
    const inputIdSocial = document.getElementById('idSocial');
    const formRegistro = document.getElementById('form-registro');
    const senha = document.getElementById('senha');
    const confirmaSenha = document.getElementById('confirmaSenha');

    const togglePasswordElements = document.querySelectorAll('.toggle-password');

    togglePasswordElements.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const targetInput = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                targetInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    function updateFormByProfile() {
        const perfilSelecionado = document.querySelector('input[name="perfil"]:checked').value;
        
        if (perfilSelecionado === 'familia') {
            labelDocumento.textContent = 'CPF';
            campoIdSocial.style.display = 'block';
            inputIdSocial.setAttribute('required', 'required'); 
        } else {
            labelDocumento.textContent = 'CPF ou CNPJ';
            campoIdSocial.style.display = 'none';
            inputIdSocial.removeAttribute('required');
            inputIdSocial.value = '';
        }
    }

    perfilRadios.forEach(radio => {
        radio.addEventListener('change', updateFormByProfile);
    });

    updateFormByProfile();

    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (senha.value !== confirmaSenha.value) {
            alert('Erro: As senhas não coincidem. Por favor, verifique.');
            return;
        }

        const perfil = document.querySelector('input[name="perfil"]:checked').value;

        alert(`Registro de ${perfil.toUpperCase()} efetuado com sucesso! Redirecionando para as Funcionalidades.`);
       
        window.location.href = '../Features/index.html'; 
        
    });
});