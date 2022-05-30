$('#registro').validate({ 
    "rules": {
        "ID": {
            required: true,
        },

        "cantidad": {
            required: true,

        },

        "nombres": {
            required: true,
        },




    },
    messages: {
        "ID": {
            required: 'Debe ingresar un ID válido',
        },

        "cantidad": {
            required: 'Debe ingresar la Cantidad de productos que desea agregar',
        },

        "nombres": {
            required: 'Debe ingresar un nombre valido',
        },



    }
});

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