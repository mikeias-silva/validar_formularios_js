/**
 * validar cpf
 * verificar se é sequencia
 * verificar se é digito
 */
class ValidaCpf {

    constructor(cpfEnviado) {
        this.cpfLimpo = cpfEnviado.replace(/\D+/g, '');
    }

    validarSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) == this.cpfLimpo
    }

    validarDigito() {
        let cpfSemDigito = this.cpfLimpo.slice(0, -2);
        let primeiroDigito = ValidaCpf.gerarDigito(cpfSemDigito);
        let segundoDigito = ValidaCpf.gerarDigito(primeiroDigito);
        let cpfComDigito = segundoDigito;
        return cpfComDigito;
    }

    static gerarDigito(cpfSemDigito) {
        let total = 0;
        let reverso = cpfSemDigito.length + 1;
        for (let stringNumerica of cpfSemDigito) {
            total += reverso * Number(stringNumerica)
            reverso--;
        }

        return cpfSemDigito + String((11 - (total % 11)) > 9 ? 0 : 11 - (total % 11));
    }

    validar() {
        if (this.validarSequencia()) {
            return false;
        }
        if (this.validarDigito() === this.cpfLimpo) {
            return true
        } else {
            return false
        }
    }
}


// const cpfValido = new validaCpf('092.007.619-09');
// const cpfValido = new validaCpf('111.111.111-11');
// console.log(cpfValido.validar() === true ? "CPF válido" : "CPF Inválido");
