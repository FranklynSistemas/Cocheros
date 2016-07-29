
var working = false;
$('.login').on('submit', function(e) {
  e.preventDefault();
  if (working) return;
  working = true;
  var $this = $(this),
    $state = $this.find('button > .state');
  $this.addClass('loading');
  $state.html('Autenticando...');
  setTimeout(function(){
    logeo();
  },2000);
  
});

function logeo(){
$state = $('.login').find('button > .state');
$.ajax(
    {
      url     : "/logear",
      type    : "POST", 
      data    : JSON.stringify({Usuario: $("#user").val(),Pass:  $("#pass").val()}), 
      dataType  : "json",
      contentType: "application/json; charset=utf-8"
    }).done(function(data)
    { 
    console.log(data);
    if(data.status){
      $('.login').addClass('ok');
      $state.html('Bienvenid@');
      setTimeout(function() {
        $state.html('Log in');
        $('.login').removeClass('ok loading');
        creaSession(data.info);
        working = false;
      }, 2000);
    }else{
      $('.login').addClass('err');
      $state.html(data.info);
      setTimeout(function() {
        $state.html('Log in');
        $('.login').removeClass('err loading');
        working = false;
      }, 2000);
    }
    });

};

function creaSession(user){
if (typeof(Storage) !== "undefined") {
    localStorage.setItem("firstname", user);
    window.location.href = "/panel";
} else {
    // Sorry! No Web Storage support..
}
}

