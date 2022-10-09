function validarCNPJ(cnpj) {

    // cnpj electra = 03.997.131/0001-83

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') {
        avisocnpj('erro')
        return false;
    }

    if (cnpj.length != 14) {
        avisocnpj('erro')
        return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999") {
        avisocnpj('erro')
        return false;
    }

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
        avisocnpj('erro')
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
        avisocnpj('erro')
        return false;
    }
    avisocnpj('ok')
    return true;
}

function avisocnpj(status) {
    let campo_cnpj = document.getElementById('cnpj')

    let alerta = document.getElementById('cnpj_invalido')

    if (status == 'erro') {
        alerta.style.display = ''
        campo_cnpj.style.borderColor = 'red'
        campo_cnpj.style.borderWidth = '1px';
    } else if (status == 'ok') {
        alerta.style.display = 'none'
        campo_cnpj.style.borderColor = 'green'
        campo_cnpj.style.borderWidth = '1px';
    }
}