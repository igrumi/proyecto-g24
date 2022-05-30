$('#registro').validate({ 
    "rules": {
        
        "user": {
            required: true,
        },
        "pass": {
            required: true,
        }
    },
    messages: {
        "user": {
            required: 'Debe ingresar sus nombres',
        },
        "pass": {
            required: 'Debe ingresar una password',
            minlength: 'La mínima cantidad de caracteres de la contraseña es 10',
        }
    }
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Valida el rut con su cadena completa "XXXXXXXX-X"
function validateRut(rutCompleto) {
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto))
        return false;
    var tmp = rutCompleto.split('-');
    var rut = tmp[0];
    var digv = tmp[1]; 
    if (digv == 'k') digv = 'K' ;
    return (dv(rut) == digv );
}

function dv(T) {
    var M=0,S=1;
    for(; T; T = Math.floor(T/10))
        S=(S + T % 10 * (9 - M++ %6))%11;
    return S?S-1:'k';
}

// Uso de la función validateRut
// alert( Fn.validateRut('16560241-2') ? 'válido' : 'inválido');

$.validator.addMethod(
    "validateemail",
    function(value, element, validate) {
        debugger
        if (validate) {
            return validateEmail(value);
        }
    },
    "Formato de correo incorrecto"
);

$.validator.addMethod(
    "onenumber",
    function(value, element, validate) {
        if (validate) {
            var re = new RegExp('.*[0-9].*');
            resp = re.test(value);
            return resp;
        }
    },
    "La contraseña debe contener al menos un número"
);

$.validator.addMethod(
    "onemayus",
    function(value, element, validate) {
        if (validate) {
            var re = new RegExp('.*[A-Z].*');
            resp = re.test(value);
            return resp;
        }
    },
    "La contraseña debe contener al menos una mayúscula"
);

$.validator.addMethod(
    "rut",
    function(value, element, validate) {
        if (validate) {
            return validateRut(value);
        }
    },
    "El formato del rut no es válido"
);

$("#rut").rules("add", { rut: true });
$("#correo").rules("add", { validateemail: true });
$("#password").rules("add", { onenumber: true });
$("#password").rules("add", { onemayus: true });

$('#buscarfoto').on('change', function(e) {
    let file = '../images/' + e.target.files[0].name;
    $('#fotoperfil').attr('src', file);
});

$('#mostrar-bordes').on('click', function(e) {
    let borde = $('.borde-bootstrap-row').css('border');
    if (borde.includes('1px')) {
        $('.borde-bootstrap-row').css({'border': '0px solid blue'});
    }
    else {
        $('.borde-bootstrap-row').css({'border': '1px solid blue'});
    }
});