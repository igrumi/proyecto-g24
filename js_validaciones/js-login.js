document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
});

function validarFormulario(evento) {
    evento.preventDefault();
    var usuario = document.getElementById('user').value;
    if(usuario.length == 0) {
    alert('El nombre de usuario no puede quedar vacío');
    return;
    }
    var clave = document.getElementById('pass').value;
    if (clave.length < 6) {
    alert('La clave no es válida');
    return;
    }
    this.submit();
}