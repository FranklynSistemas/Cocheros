 $(document).ready(function () {


    var user = localStorage.getItem("firstname");
    if(user==null){
      window.location.href = "/logeo";
    }

 function editor(){
      $('#info').htmlarea(); 
      $('#muestraInfo').htmlarea();

  };editor();


var divMuestraUsuarios = $("#MuestraUsuarios"),
    divCreaUsuarios = $("#crearUsuarios"),
    divMuestraNoticias = $("#MuestraTablaNoticias"),
    divCrearNoticias =  $("#crearNoticias"),
    divInformacion = $("#Informacion");

      divMuestraUsuarios.fadeOut(0);
      divCreaUsuarios.fadeOut(0);
      divMuestraNoticias.fadeOut(0);
      divCrearNoticias.fadeOut(0);

var verUsers = $("#btn_MostrarUsers"),
    crearUsers = $("#btn_CrearUsers"),
    verNoticias = $("#btn_MostrarNoticias"),
    crearNoticias = $("#btn_CrearNoticias");

var arrayCategorias = [];

  $("#btn_MostrarUsers").click(function(){
      QuitarClassActive();
      verUsers.addClass("active");
      divMuestraUsuarios.fadeIn(600);
      divInformacion.fadeOut(100);
      divCreaUsuarios.fadeOut(100);
      divMuestraNoticias.fadeOut(100);
      divCrearNoticias.fadeOut(100);
       
  });

  $("#btn_CrearUsers").click(function(){
      QuitarClassActive();
      crearUsers.addClass("active");
      divCreaUsuarios.fadeIn(600);
      divMuestraUsuarios.fadeOut(100);
      divInformacion.fadeOut(100);
      divMuestraNoticias.fadeOut(100);
      divCrearNoticias.fadeOut(100);
  });
  $("#btn_MostrarNoticias").click(function(){
      QuitarClassActive();
      verNoticias.addClass("active");
      divMuestraNoticias.fadeIn(600);
      divCreaUsuarios.fadeOut(100);
      divMuestraUsuarios.fadeOut(100);
      divInformacion.fadeOut(100);
      divCrearNoticias.fadeOut(100);  
  });
  $("#btn_CrearNoticias").click(function(){
      QuitarClassActive();
      crearNoticias.addClass("active");
      divCrearNoticias.fadeIn(600);
      divCreaUsuarios.fadeOut(100);
      divMuestraUsuarios.fadeOut(100);
      divInformacion.fadeOut(100);
      divMuestraNoticias.fadeOut(100); 
  });


  QuitarClassActive = function(){
    verUsers.removeClass("active");
    crearUsers.removeClass("active");
    verNoticias.removeClass("active");
    crearNoticias.removeClass("active");
  };

var nomServicios = [
              {
                servicio  :   "Trae Categorias", 
                urlServicio : "/TraeCategorias", 
                metodo    :   "GET",
                id : 0
              },
              {
                servicio  :   "Trae Noticias", 
                urlServicio : "/TraeNoticias", 
                metodo    :   "POST",
                id : 1
              },
              {
                servicio  :   "Trae Noticia", 
                urlServicio : "/TraeNoticia", 
                metodo    :   "POST",
                id : 2
              },
              {
                servicio  :   "Crear Noticia", 
                urlServicio : "/creaNoticia", 
                metodo    :   "POST",
                id : 3
              },
              {
                servicio  :   "Editar Noticia", 
                urlServicio : "/editaNoticia", 
                metodo    :   "POST",
                id : 4
              },
              {
                servicio  :   "Elimina Noticia", 
                urlServicio : "/eliminaNoticia", 
                metodo    :   "POST",
                id : 5
              },
              {
                servicio  :   "Trae Usuarios", 
                urlServicio : "/TraeUserAdmins", 
                metodo    :   "GET",
                id : 6
              },
              {
                servicio  :   "Trae Usuario", 
                urlServicio : "/TraeUserAdmin", 
                metodo    :   "POST",
                id : 7
              },
              {
                servicio  :   "Crear Usuario", 
                urlServicio : "/creaUserAdmin", 
                metodo    :   "POST",
                id : 8
              },
              {
                servicio  :   "Editar Usuario", 
                urlServicio : "/editaUserAdmin", 
                metodo    :   "POST",
                id : 9
              },
              {
                servicio  :   "Eliminar Usuario", 
                urlServicio : "/eliminaUserAdmin", 
                metodo    :   "POST",
                id : 10
              }
              ];


var elementosUsuarios = ["Nombres", "Apellidos","Usuario","pass"],
    elementosNoticias = ["titulo", "info","listcategorias"];

var consumeServicios = function(tipo, val)
{
        var servicio = {
            url   : nomServicios[tipo].urlServicio, 
            metodo  : nomServicios[tipo].metodo, 
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
        case 0:
          dibujaCategorias(data);
        break;
        case 1:
          dibujaNoticias(data);
        break;
        case 2:
          dibujaNoticia(data);
        break;
        case 3:
          resultCreaNoticias(data);
        break;
        case 4:
          resultEditaNoticia(data);
        break;
        case 5:
          resultEliminaNoticia(data);
        break;
        case 6:
          dibujaUsuarios(data);
        break;
        case 7:
          dibujaUsuario(data);
        break;
         case 8:
          resultCreaUsuario(data);
        break;
         case 9:
          resultEditaUsuario(data);
        break;
         case 10:
          resultEliminaUsuario(data);
        break;
     } 
});
}; consumeServicios(0,"");
  
  $("#btn_MostrarUsers").click(function(){
       consumeServicios(6,"");
  });

  $("#btn_MostrarNoticias").click(function(){
      consumeServicios(1,{});
  });
  

function dibujaCategorias(datos){
  var options ="";

  for(i in datos.info){
    options += "<option value="+datos.info[i]._id+">"+datos.info[i].nombre+"</option>";
    arrayCategorias.push(datos.info[i].nombre);
  }

  $("#listcategorias").html(options);
  $("#newlistcategorias").html(options);
}

function dibujaNoticias(datos){
  var tds = '<tr>';
  if(!datos.status){
              var html = '<h1>Usuarios</h1>';
              html += '<h2>No se encontraron Datos</h2>';
              $("#MuestraNoticias").append(html);
           }else{

            for (num in datos.info){
                
                tds += '<td data-field="id">' + datos.info[num].id+ '</td>';
                tds += '<td data-field="titulo">' + datos.info[num].titulo + '</td>';
                tds += '<td data-field="info">' + datos.info[num].informacion + '</td>';
                tds += '<td data-field="categoria">' + datos.info[num].categoria.nombre + '</td>';
                tds += '<td data-field="fecha">' + datos.info[num].fecha+ '</td>';
                tds += '<td data-field="opciones"><button class="btn btn-warning editarNoticia" id='+datos.info[num]._id+' data-toggle="modal" data-target="#myModalNoticia">Editar</button><button class="btn btn-danger eliminarNoticia" id='+datos.info[num]._id+'>Eliminar</button></td>';
                tds += '</tr>';

            }
            $("#MuestraNoticias").html(tds);
            $(".editarNoticia").click(function(){
              var oID = $(this).attr("id");
              consumeServicios(2,{id:oID});
            });

            $(".eliminarNoticia").click(function(){
              var oID = $(this).attr("id");
              swal({   title: "Esta segur@?",   text: "De querer eliminar esa noticia!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Sí, Eliminar!",   cancelButtonText: "No, Cancelar!",   closeOnConfirm: false,   closeOnCancel: true }, function(isConfirm){   if (isConfirm) {     consumeServicios(5,{id:oID});  } else {} });
            });
          }
}

function dibujaUsuarios(data){
  var tds = '<tr>';
   if(!data.status){
              var html = '<h1>Usuarios</h1>';
              html += '<h2>No se encontraron Datos</h2>';
              $("#Muestradatos").append(html);
           }else{

            for (num in data.info){
               
                tds += '<td data-field="id">' + data.info[num].id + '</td>';
                tds += '<td data-field="user">' + data.info[num].Usuario + '</td>';
                tds += '<td data-field="nombres">' + data.info[num].Nombres + '</td>';
                tds += '<td data-field="apellidos">' + data.info[num].Apellidos + '</td>';
                tds += '<td data-field="pass">' + data.info[num].Pass + '</td>';
                tds += '<td data-field="opciones"><button  class="editarUser btn btn-warning" id='+data.info[num]._id+' data-toggle="modal" data-target="#myModalUsuario">Editar</button><button class="btn btn-danger eliminarNoticia" id='+data.info[num]._id+'>Eliminar</button></td>';
                
                tds += '</tr>';

            }
          }
          $("#Muestradatos").html(tds);

          $(".editarUser").click(function(){
              var oID = $(this).attr("id");
              consumeServicios(7,{id:oID});
            });

            $(".eliminarNoticia").click(function(){
              var oID = $(this).attr("id");
              swal({   title: "Esta segur@?",   text: "De querer eliminar ese usuario!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Sí, Eliminar!",   cancelButtonText: "No, Cancelar!",   closeOnConfirm: false,   closeOnCancel: true }, function(isConfirm){   if (isConfirm) {     consumeServicios(10,{id:oID});  } else {} });
            });


};

$("#btn_GuardarUser").click(function(e){
  e.preventDefault();
  guardarDatos();
});

//Acciones sobre el botón guardar...
  $("#btn_Guardar").click(function(event)
  {
    guardarDatos();
  });

  var guardarDatos = function()
  {
    console.log("Entre");
    var valores = [];
    var correcto = true;
    for(var i = 0; i < elementosUsuarios.length; i++)
    {
      if($("#" + elementosUsuarios[i]).val() === "")
      {
        sweetAlert("Digite todos los campos");
        $("#" + elementosUsuarios[i]).focus();
        correcto = false;
        break;
      }
      else
      {
        valores[i] = $("#" + elementosUsuarios[i]).val();
      }
    }
    console.log(correcto);
     if(correcto)
    {
      var nuevoDato = {
                id : 0,
                Nombres : valores[0],
                Apellidos : valores[1],
                Usuario: valores[2],
                Pass : valores[3]
              };     
       correcto = false;         
      consumeServicios(8, nuevoDato);
    }
  }

  function resultCreaUsuario(datos){
    if(datos.status){
      swal("¡Bien!",datos.info,"success");
      limpiarCampos(elementosUsuarios);
    }else{
     swal("¡Error!",datos.info,"error");
    }
  }


$("#btn_GuardarNoticia").click(function(e){
  e.preventDefault();
  guardarNoticias();
});

  var guardarNoticias = function()
  {
    var valores = [];
    var correcto = true;
    for(var i = 0; i < elementosNoticias.length; i++)
    {
      if($("#" + elementosNoticias[i]).val() === "")
      {
        sweetAlert("Digite todos los campos");
        $("#" + elementosNoticias[i]).focus();
        correcto = false;
        break;
      }
      else
      {
        valores[i] = $("#" + elementosNoticias[i]).val();
      }
    }
    console.log(correcto);
     if(correcto)
    {
      var nuevoDato = {
                id : 0,
                titulo : valores[0],
                informacion : valores[1],
                categoria: valores[2],
                fecha : fecha()
              };     
       correcto = false;         
      consumeServicios(3, nuevoDato);
    }
  }

  function resultCreaNoticias(datos){
    if(datos.status){
      swal("¡Bien!",datos.info,"success");
      limpiarCampos(elementosNoticias);
    }else{
      swal("¡Error!",datos.info,"error");
    }
  }

  var limpiarCampos = function(array)
  {
    console.log("Limpia campos...");
    for(var i = 0; i < array.length; i++)
    {
      $("#" + array[i]).val("");
    }
    $('#info').htmlarea('html', '');
  }

  function dibujaNoticia(data){
    $("#newlistcategorias").fadeOut(0);
    $("#btn_GdNoticia").fadeOut(0);
    $("#muestraCategoria").fadeIn(0);
    $("#btn_EdNoticia").fadeIn(0);
    $("#muestraTitulo").val(data.info.titulo);
    $("#muestraCategoria").val(data.info.categoria.nombre);
    $("#muestraFecha").val(data.info.fecha);
    $('#muestraInfo').htmlarea('html', data.info.informacion);
    //$("#muestraInfo").val(data.info.informacion);
    $("#idNoticia").text(data.info._id);
    disabledNoticia(true);
  }
function dibujaUsuario(data){
  console.log(data.info);
    $("#btn_GdUser").fadeOut(0);
    $("#btn_EdUser").fadeIn(0);
    $("#newNombres").val(data.info.Nombres);
    $("#newApellidos").val(data.info.Apellidos);
    $("#newUsuario").val(data.info.Usuario);
    $("#newPass").val(data.info.Pass);
    $("#idUser").text(data.info._id);
    disabledUsuario(true);
}

  $("#btn_EdUser").click(function(){
    $("#btn_EdUser").fadeOut(0);
    $("#btn_GdUser").fadeIn(0);
    disabledUsuario(false);
  });

  $("#btn_GdUser").click(function(){ 
    var newInfo = {datos:{
                            Nombres : $("#newNombres").val(),
                            Apellidos : $("#newApellidos").val(),
                            Usuario: $("#newUsuario").val(),
                            Pass :  $("#newPass").val()
                          },
                    id:   $("#idUser").text()
                  };
    consumeServicios(9,newInfo);
    
  });

  function resultEditaUsuario(result){
    if(result.status){
      swal("¡Bien!",result.info,"success");
      consumeServicios(7,{id:result.id});
      consumeServicios(6,{});
    }else{
      swal("¡Error!",result.info,"error");
    }
  }

  function resultEliminaUsuario(data){
  if(data.status){
     swal("¡Bien!",data.info,"success");
    consumeServicios(6,{});
  }else{
    swal("¡Error!",data.info,"error");
  }
}

  $("#btn_EdNoticia").click(function(){
    $("#btn_EdNoticia").fadeOut(0);
    $("#muestraCategoria").fadeOut(0);
    $("#newlistcategorias").fadeIn(0);
    $("#btn_GdNoticia").fadeIn(0);
    disabledNoticia(false);
  });

  $("#btn_GdNoticia").click(function(){ 
    var newInfo = {datos:{
                            titulo : $("#muestraTitulo").val(),
                            informacion : $("#muestraInfo").val(),
                            categoria: $("#newlistcategorias").val(),
                            fecha : fecha()
                          },
                    id:   $("#idNoticia").text()
                  };
    consumeServicios(4,newInfo);
    
  });

  function resultEditaNoticia(data){
    if(data.status){
      swal("¡Bien!",data.info,"success");
      consumeServicios(2,{id:data.id});
      consumeServicios(1,{});
    }else{
      swal("¡Error!",data.info,"error");
    }
  }


function resultEliminaNoticia(data){
  if(data.status){
    swal("¡Bien!",data.info,"success");
    consumeServicios(1,{});
  }else{
    swal("¡Error!",data.info,"error");
  }
}

function disabledNoticia(disabled){
    $("#muestraTitulo").attr("disabled",disabled);
    $("#muestraFecha").attr("disabled",disabled);
    $("#muestraInfo").attr("disabled",disabled);
}

function disabledUsuario(disabled){
    $("#newNombres").attr("disabled",disabled);
    $("#newApellidos").attr("disabled",disabled);
    $("#newUsuario").attr("disabled",disabled);
    $("#newPass").attr("disabled",disabled);
  }

function  fecha(){
  var Fecha = new Date();
  return Fecha.getDate()+"/"+(Fecha.getMonth()+1)+"/"+Fecha.getFullYear()+" "+Fecha.getHours()+":"+Fecha.getMinutes();   
}
$(".Salir").click(function(e){
  e.preventDefault();
  localStorage.removeItem("firstname");
  window.location.href = "/logeo";
});

});