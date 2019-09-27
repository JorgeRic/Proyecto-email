// variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');


// event Listener

eventListeners();

function eventListeners() {
     document.addEventListener('DOMContentLoaded', inicioApp);
     email.addEventListener('blur', validarCampo);
     asunto.addEventListener('blur', validarCampo);
     mensaje.addEventListener('blur', validarCampo);
     formularioEnviar.addEventListener('submit', enviarEmail);
     resetBtn.addEventListener('click', resetFormulario);
}

// funciones
function inicioApp() {
     btnEnviar.disabled = true;
}

function validarCampo() {
     validarLongitud(this);
     if(this.type === 'email') {
          validarEmail(this);
     }

     let errores = document.querySelectorAll('.error');

     if(email.value !== '' && asunto.value !== '' && mensaje.value !== '' ) {
          if(errores.length === 0) {
               btnEnviar.disabled = false;
          }
     }
}

function resetFormulario(e) {
     formularioEnviar.reset();
     e.preventDefault();
     
}

function enviarEmail(event) {
     event.preventDefault();
     const spinnerGif = document.querySelector('#spinner');
     spinnerGif.style.display = 'block';
     const enviado = document.createElement('img');
     enviado.src = 'img/mail.gif';
     enviado.style.display = 'block';

     setTimeout(function() {
          spinnerGif.style.display = 'none';

          document.querySelector('#loaders').appendChild( enviado );

          setTimeout(function() {
               enviado.remove();
               formularioEnviar.reset();
          }, 5000);
     }, 3000);
}

function validarLongitud(campo) {

     if(campo.value.length > 0 ) {
          campo.style.borderBottomColor = 'green';
          campo.classList.remove('error');
     } else {
          campo.style.borderBottomColor = 'red';
          campo.classList.add('error');
     }
}

function validarEmail(campo) {
     const  regExp = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
     const mensaje = campo.value;
     let mailError = document.createElement('div');
     if(regExp.test(mensaje) === true) {
          campo.style.borderBottomColor = 'green';
          campo.classList.remove('error');
          if(mailError){
          quitarComentario()
          }
     }
     else {
          campo.style.borderBottomColor = 'red';
          campo.classList.add('error');
          mailError.innerHTML = `<h4 class='mail-erroneo'>Mail erroneo</h4>`;
          setTimeout(()=>{
               quitarComentario()
          }, 3000)
          document.querySelector('#loaders').appendChild( mailError );
     }
     function quitarComentario(){
     const quitarAviso = document.querySelector('.mail-erroneo')
     quitarAviso.remove()
}
}