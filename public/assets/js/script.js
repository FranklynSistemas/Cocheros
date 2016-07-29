$(function()
{

var ValidaNombres = $('.form-input-name-row');
var ValidaApellidos = $('.form-input-Apellidos-row');
var ValidaTelefono = $('.form-input-Telefono-row');
var ValidaEmail = $('.form-input-email-row');

var nomServicios = [
              {
                servicio  :   "Trae Departamentos", 
                urlServicio : "/Departamentos", 
                metodo    :   "GET"
              }, 
              {
                servicio  :   "Trae Actividades", 
                urlServicio : "/Actividades", 
                metodo    :   "GET"
              }, 
              {
                servicio  :   "Crear Usuario", 
                urlServicio : "/CrearUsuario",
                metodo    :   "POST"
              },
              {
                servicio  :   "Crear Contacto", 
                urlServicio :  "/CrearContacto",
                metodo    :   "POST"
              },
              {
                servicio  :   "Ultimos Procesos", 
                urlServicio : "/ultimosregistros",
                metodo    :   "GET"
              }
              ];



var elementos = ["Nombres", "Apellidos","Telefono","Correo","Departamento","Actividad"];
var elementosContac  = ["NombresContac","TelefonoContac","CorreoContac","MensajeContac"];
var clasesContac = ["form-input-nameContac-row","form-input-TelefonoContac-row","form-input-emailContac-row","form-input-MensajeContac-row"];
var clases = [ValidaNombres,ValidaApellidos,ValidaTelefono,ValidaEmail];

var consumeServicios = function(tipo, val)
{
        $("#Muestradatos").html('<div id="Cargando"><img src="images/cargando.gif"/></dvi>');
        var servicio = {
            url   : nomServicios[tipo - 1].urlServicio, 
            metodo  : nomServicios[tipo - 1].metodo, 
            datos   : ""
          };
    
    servicio.datos = val !== "" ? JSON.stringify(val) : "";
    
    $.ajax(
    {
      url     : servicio.url,
      type    : servicio.metodo, 
      data    : servicio.datos, 
      dataType  : "json",
      contentType: "application/json; charset=utf-8"
    }).done(function(data)
    {          
     switch(tipo)
     {
        case 1:
          imprimeDepartamentos(data);
          consumeServicios(2,"");
        break;
        case 2:
          imprimeActividades(data);
          //imprimeProcesos(data);
        break;
        case 3:
          console.log(data.status);
          if(data.status){
            alertify.alert("<b>Usuario guardado correctamente, Por favor revisé su correo</b>", function () {
              limpiarCampos();
            });
            console.log("Guardado Correctamente");
          }else{
            alertify.alert("<b>El Correo ya existe en nuestro sistema</b>");
            clases[3].addClass('form-invalid-data');
            console.log("Error");
          }
        break;
        case 4:
          console.log(data.status);
          if(data.status){
            alertify.alert("<b>Formulario enviado, Su mensaje sera contestado al correo "+data.Correo+"</b>", function () {
              limpiarCamposContact();
            });
            console.log("Guardado Correctamente");
          }else{
            alertify.alert("<b>El Correo ya existe en nuestro sistema</b>");
            $("."+clasesContac[2]).addClass('form-invalid-data');
            console.log("Error");
          }
        break;
        case 5:
            $("#Muestradatos").fadeIn();
            imprimeProcesos(data);
                 
          break;

     } 
});

};
consumeServicios(1, "");

  var  imprimeProcesos = function(data){
    var htmlTabla = '';
    
    for(registros in data.results){
       htmlTabla += '<tr>';
            htmlTabla += '<td>'+registros+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].numProceso+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].tipoProceso+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Estado+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Entidad+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Objeto+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].DepMun+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Cuantia+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Fecha+'</td>';
            htmlTabla += '<td><a target="_blank"  href="'+data.results[registros].URL+'">Ver Más</a></td>';
       htmlTabla += '</tr>';

       
      }

       $("#Muestradatos").html(htmlTabla);
        //$("#Muestradatos").html(htmlTabla);
        $("#MyTable").DataTable();
        $("#MyTable").footable();
        //setTimeout(function(){$("#MyTable").DataTable()},1000);
        

  };
  consumeServicios(5, "");


  var imprimeDepartamentos = function (data)
  {
    var htmlOptions = '';
    for(i in data){
      htmlOptions += '<option value="'+data[i].id+'">'+data[i].Departamento+'</option>';
    }

    $("#Departamento").html(htmlOptions);
    
  }

  var imprimeActividades = function (data)
  {
    var htmlOptions = '';
    for(i in data){
       htmlOptions += '<option value="'+data[i].id+'">'+data[i].Actividad+'</option>';
    }
    $("#Actividad").html(htmlOptions);
  }  


  var limpiarCampos = function()
  {
    console.log("Limpia campos...");
    for(var i = 0; i < elementos.length; i++)
    {
      $("#" + elementos[i]).val("");

      if(i<4){
        clases[i].removeClass('form-valid-data');
      }
    }
  }

  var limpiarCamposContact = function()
  {
    console.log("Limpia campos...");
    for(var i = 0; i < elementosContac.length; i++)
    {
      $("#" + elementosContac[i]).val("");

        $("."+clasesContac[i]).removeClass('form-valid-data');
    }
  }

//Botones enviar 
  $("#Enviar").click(function(event)
  {
    event.preventDefault();
    guardarDatos();
  });

$("#EnviarContac").click(function(event)
  {
    event.preventDefault();
    guardarContacto();
  });


  var guardarDatos = function()
  {
    console.log("Entre");
    var valores = [];
    var correcto = true;
    for(var i = 0; i < elementos.length; i++)
    {
      if($("#" + elementos[i]).val() === "" )
      {
        alertify.alert("<b>Digité todos los campos</b>",function(){
          $("#" + elementos[i]).focus();
          clases[i].addClass('form-invalid-data');
        });
        correcto = false;
        break;
      }else if(!isValidEmail($("#"+elementos[3]).val())){
         correcto = false;
         alertify.alert("<b>El correo no es válido</b>");
         break;
      }else{
        if(i < 4){
        clases[i].addClass('form-valid-data');
        }
        valores[i] = $("#" + elementos[i]).val();
        correcto = true;
        
      }
      
    }
    console.log(correcto);
    if(correcto)
    {
      var Fecha = new Date();
      var FechaOrdenada = Fecha.getDate()+"/"+(Fecha.getMonth()+1)+"/"+Fecha.getFullYear()+" "+Fecha.getHours()+":"+Fecha.getMinutes();
      var nuevoDato = {
                Nombres  :  valores[0], 
                Apellidos : valores[1], 
                Telefono  : valores[2],
                Correo  :  valores[3],
                Departamento : valores[4],
                Actividad :  valores[5],
                Fecha  :   FechaOrdenada
              };     
      console.log(nuevoDato);           
      consumeServicios(3, nuevoDato);
      
    }


  }

  var guardarContacto = function()
  {
    console.log("Entre");
    var valores = [];
    var correcto = true;
    for(var i = 0; i < elementosContac.length; i++)
    {
      if($("#" + elementosContac[i]).val() === "" )
      {
        alertify.alert("<b>Digité todos los campos</b>",function(){
          $("#" + elementosContac[i]).focus();
          $("."+clasesContac[i]).addClass('form-invalid-data');
        });
        correcto = false;
        break;
      }else if(!isValidEmail($("#"+elementosContac[2]).val())){
         correcto = false;
         alertify.alert("<b>El correo no es válido</b>");
         break;
      }else{
        $("."+clasesContac[i]).addClass('form-valid-data');
        valores[i] = $("#" + elementosContac[i]).val();
        correcto = true;
        
      }
      
    }
    console.log(correcto);
    if(correcto)
    {
      var Fecha = new Date();
      var FechaOrdenada = Fecha.getDate()+"/"+(Fecha.getMonth()+1)+"/"+Fecha.getFullYear()+" "+Fecha.getHours()+":"+Fecha.getMinutes();
      var nuevoDato = {
                Nombres  :  valores[0], 
                Telefono  : valores[1],
                Correo  :  valores[2],
                Mensaje : valores[3],
                Fecha  :   FechaOrdenada
              };     
      console.log(nuevoDato);           
      consumeServicios(4, nuevoDato);
      
    }


  }

/*Captura el Enter*/
 /*
  window.onkeydown = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(code == 13){
			guardarDatos();
		}

	}
*/
function isValidEmail(mail)
{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
}

});
