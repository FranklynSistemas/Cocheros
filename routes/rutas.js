var express = require('express');
var router = express.Router();

//var Usuarios = require('../schemas/usuarios');
var Contactos = require('../schemas/contactos');

//Autenticacion
var auth = require('./auth');  
var middleware = require('./middleware');

//Envio de Correos
var sendgrid = require('sendgrid')('');

//Consultas
var consultas = require('./Utilidades/consultas');

//Pagos
//var pagos = require('./Utilidades/pagos');

//Noticias
//var publica = require('./Utilidades/publica');
router.get('/', function (req, res) {
    res.render('landing');
});

router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nSitemap:http://inprix.co/sitemap.xml");
});
/*
router.get('/google6c73bb35cee5c37d.html', function (req, res) {
   res.render('google6c73bb35cee5c37d');   
});
*/
router.get('/sitemap.xml', function (req, res) {
    var sitemap = generate_xml_sitemap();
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);
});

//Guarda un contacto en la BD
router.post("/CrearContacto", function(req, res){
   	var datos = req.body;
	Contactos.count(function(err, cont){
	      		var datosAux = datos;
	      		datosAux.id = cont++;
	      		contacto =  new Contactos(datosAux);
	      		contacto.save(function (err, obj) {
	               if (!err){
	               	res.json({status: true});
	               }else{
	               	res.json({status: true});
	               } 	                  
	            });
	   });  
});  

// Rutas de autenticación y login
router.post('/auth/signup', auth.emailSignup);  
router.post('/auth/login', auth.emailLogin);
router.post('/auth/limpiaSesion', auth.limpiaSesion);


//Perfil
router.post('/TraePerfil', consultas.TraePefil); 
router.post('/ActualizaPerfil', consultas.ActualizaPefil); 
router.post('/CreaComentario', consultas.CreaComentario); 


//Cocheros
router.get('/TraeCocheros',consultas.TraeCocheros);
router.post('/AgregarFavoritos',consultas.AgregarFavoritos);
router.post('/TraerFavoritos',consultas.TraerFavoritos);

//Recuperar pass
router.post('/RecuperarPass',consultas.RecuperarPass);

// Ruta solo accesible si estás autenticado
router.get('/private',middleware.ensureAuthenticated, function(req, res) {

});

//Rutas de consulta
/*
router.get('/ultimosregistros',consultas.ultimosDatos);
router.post('/datosConsulta',consultas.DatosSegunConsulta);
router.post('/actualizaDatos',consultas.ActualizaDatos);
router.post('/preferencias',consultas.TraePreferencias);
router.post('/guardarFavoritos',consultas.GuardaFavoritos);
router.post('/TraeFavoritos',consultas.TraeFavoritos);
router.post('/RecuperarPass',consultas.RecuperarPass);
router.post('/TraeHistorial',consultas.TraeHistorial);
router.post('/EliminarHistorial',consultas.EliminarHistorial);

//Ruta pagos
router.get('/TraePlanes',pagos.TraePlanes);
router.post('/Subscribir',pagos.Subscribir);
router.post('/TraeInfoSuscripcion',pagos.TraeInfoSuscripcion);
router.post('/CancelarSuscripcion',pagos.CancelarSuscripcion);
router.post('/ModificarPlan',pagos.ModificarPlan);
router.post('/RenovarPlan',pagos.RenovarPlan);

//Noticias
router.get('/TraeCategorias',publica.TraeCategorias);
router.post('/TraeNoticias',publica.TraeNoticias);
router.post('/TraeNoticia',publica.TraeNoticia);
router.post('/creaNoticia',publica.creaNoticia);
router.post('/editaNoticia',publica.editaNoticia);
router.post('/eliminaNoticia',publica.eliminaNoticia);

//Usuarios Admin
router.get('/TraeUserAdmins',publica.TraeUserAdmins);
router.post('/TraeUserAdmin',publica.TraeUserAdmin);
router.post('/creaUserAdmin',publica.creaUserAdmin);
router.post('/editaUserAdmin',publica.editaUserAdmin);
router.post('/eliminaUserAdmin',publica.eliminaUserAdmin);

//Login Admin
router.get('/logeo',publica.logeo);
router.post('/logear',publica.logear);
router.get('/panel',publica.panel);
router.post('/session',publica.session);

*/

router.get("*", function(req, res){
	
	res.status(404).send("Página no encontrada :( en el momento");

});


function envioCorreos(correos,datos,type){
	sendgrid.send({
	  to:        correos,
	  from:     type === 1 ? 'info@galavi.co':'informacion@inprix.co',
	  subject:  type === 1 ? 'Galavi' : 'Inprix',
	  html:      datos
	}, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});
}



function generate_xml_sitemap() {
    // this is the source of the URLs on your site, in this case we use a simple array, actually it could come from the database
    var urls = ['contact', 'index', 'procesos', 'quees','quienessomos','actualidad','normatividad','asocpublic'];
    // the root of your website - the protocol and the domain name with a trailing slash
    var root_path = 'http://www.inprix.co/';
    // XML sitemap generation starts here
    var priority = 0.5;
    var freq = 'daily';
    var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for (var i in urls) {
        xml += '<url>';
        xml += '<loc>'+ root_path + urls[i] + '</loc>';
        xml += '<changefreq>'+ freq +'</changefreq>';
        xml += '<priority>'+ priority +'</priority>';
        xml += '</url>';
        i++;
    }
    xml += '</urlset>';
    return xml;
}


module.exports = router;
