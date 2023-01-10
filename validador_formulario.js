/**
 * Campos
 * nome, sobrenome, cpf, senha e repetir senha
 * 
 * - nenhum campo pode ser vazio
 * - usuario só pode ter letras ou numeros
 * - usuario devera ter entre 3 e 12 caracteres
 * - senha precisa ter 6 e 12 caracteres
 * - campos senhas precisa validar senhas iguais
 */

class Usuario {
    constructor(nome, sobrenome, usuario, cpf, senha, repetirSenha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.usuario = usuario;
        this.cpf = cpf;
        this.senha = senha;
        this.repetirSenha = repetirSenha
    }

    validarSenha() {
        // console.log(this.senha, "senha")
        let retorno = this.verificarSenhas();
        return retorno;
    }

    verificarSenhas() {
        if (this.senha === this.repetirSenha) {
            if (this.senha.length < 6 || this.senha.length > 12) {
                return false
            }
            return true
        } else {
            return false
        }
    }

    validarUsuario(campo) {
        // usuario devera ter entre 3 e 12 caracteres
        let usuario = campo.value
        let valid = true;
        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuario deve estar entre 3 e 12 caracteres');
            valid = false;
        }
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Usuario pode conter apenas letras e/ou numeros')
            valid = false;
        }

        return valid;
    }

    isValid() {
        let campos = form.querySelectorAll("input");
        let valid = true;

        for (let errorText of form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of campos) {
            let label = campo.previousElementSibling.innerText;
            if (!campo.value) {
                this.criaErro(campo, `Campo "${label}" não pode estar em branco`)
                valid = false;
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCpf(campo)) {
                    valid = false;
                }
            }

            if (campo.classList.contains('usuario')) {
                if (!this.validarUsuario(campo)) {
                    valid = false;
                }
            }
        }
        return valid;
    }

    passwordValid() {
        let valid = true;

        const senha = form.querySelector('.senha');
        const repetirSenha = form.querySelector('.repetir_senha');
        if (senha.value.length < 6 || senha.value.length > 12) {
            this.criaErro(senha, "Senha precisa ter entre 6 e 12 caracteres!")
            valid = false;
        }

        if (senha.value !== repetirSenha.value) {
            this.criaErro(senha, "Campos senha e repetir senha precisam ser iguais.")
            this.criaErro(repetirSenha, "Campos senha e repetir senha precisam ser iguais.")
            valid = false;
        }
        return valid;
    }
    validaCpf(campo) {
        const cpf = new ValidaCpf(campo.value);

        if (!cpf.validar()) {
            this.criaErro(campo, `CPF inválido!`)
            return false;
        }
        return true;
    }
    criaErro(campo, message) {

        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

}


const form = document.querySelector('.form');

form.addEventListener('submit', function (evento) {
    evento.preventDefault();


    const newUsuario = new Usuario();
    const isValid = newUsuario.isValid();
    const passwordValid = newUsuario.passwordValid();

    console.log(isValid, passwordValid);
    if(isValid && passwordValid){
        alert("formulado enviado")
        form.submit();
    }

})
