$(function()
{

var nomServicios = [
              {
                servicio  :   "Trae Noticias", 
                urlServicio : "/TraeNoticias", 
                metodo    :   "POST",
              }
              ];

var consumeServicios = function(tipo, val)
{
        $("#infoActualidad").html('<div id="Loading"><img src="img/cargando.gif"/></dvi>');
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
          imprimeNoticias(data);
        break;       

     } 
});

};
consumeServicios(1, { categoria : {categoria: "577fb7f566699202643587eb"}});

var  imprimeNoticias = function(data){
    var html = '';
    
    for(noticia in data.info){

      html += '<div class="card"><div class="card-block"><h3 class="card-title">'+data.info[noticia].titulo+'</h3></div>'+
              '<div class="card-block"><p class="card-text">'+data.info[noticia].informacion+'</p></div></div>';
               
      };

      $("#infoActualidad").html(html);
        
        
  };

});