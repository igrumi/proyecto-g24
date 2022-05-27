$('#registro').validate({ 
    "rules": {
        "ID": {
            required: true,
        },

        "descripcion": {
            required: true,

        },

        "precio": {
            required: true,

        },

        "precio_sus": {
            required: true,

        },

    },
    messages: {
        "ID": {
            required: 'Debe ingresar un ID válido',
        },

        "descripcion": {
            required: 'Debe ingresar una descripción',
        },

        "precio": {
            required: 'Debe ingresar un precio para el producto',
        },

        "precio_sus": {
            required: 'Debe ingresar un descuento para usuarios sustritos ',
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