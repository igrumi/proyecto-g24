var nombre = document.getElementById("nombre");
var apellido = document.getElementById("app");
var email = document.getElementById("email");
var password = document.getElementById("password");
var com = document.getElementById("com")
var mensaje1 = document.getElementById("mensaje1");
const formulario = document.getElementById("request");



formulario.addEventListener("submit", e =>{
    e.preventDefault();
    let mensajesMostrar = "";
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    mensaje1.innerHTML = "";
  
    if(nombre.value=="" && (nombre.value.length < 4 || nombre.value.length > 16)){
      mensajesMostrar += 'El nombre no puede estar vacío. <br>';
      entrar= true;
  
    }
    if(app.value==""){
      mensajesMostrar += 'El apellido no puede estar vacío. <br>';
      entrar= true;
  
    }

    if(email.value==""){
      mensajesMostrar += 'El email no puede estar vacío. <br>';
      entrar= true;
    }

    if (password.value.length < 4 || password.value.length > 16) {
      mensajesMostrar += 'La contraseña no tiene el largo necesario. <br>';
      entrar = true;
    }
    if (password.value != password2.value) {
      mensajesMostrar += 'Las contraseña no coinciden <br>';
      entrar = true;
      
    } 

    if (com.value === "Seleccione una comuna"){
      mensajesMostrar += 'Seleccione una comuna. <br>'
      entrar = true
    }
    
      if (entrar){
        mensaje1.innerHTML = mensajesMostrar;
      } 
      else {
          mensaje1.innerHTML = "Enviado";
      }

    })

    var url = "https://apis.digital.gob.cl/dpa/regiones/13/comunas";
    fetch(url).then(function(result){
    if(result.ok){
    return result.json();
    }

  }).then(function(data){
    data.forEach(function(element){
    let comunas = document.getElementById("com");
    let opt = document.createElement("option");
    opt.appendChild(document.createTextNode(element.nombre));
    opt.value=element.codigo;
    comunas.appendChild(opt);
    })
  })
    

