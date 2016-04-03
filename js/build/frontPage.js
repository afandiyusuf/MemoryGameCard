
function fb_login(){
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

          registerWithFB();

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,email'
    });
}

function registerWithFB() {
  console.log("cek user login");
  FB.api('/me?fields=name,email', function(response) {
    console.log(response);
    $.ajax({
      type: "POST",
      url: $("#base-api-url").html()+"/user/loginFB",
      data: {
        nama_depan : response.name,
        email : response.email
      },
      success: function(data){
        console.log(data);
        if(data.status_code == 200)
        {
            window.location = $("#base-url").html()+"/page/game.php?access_token="+data.data.access_token;
        }else if(data.status_code == 404)
        {
            $("#form-login").css("display","table");
            $("#all-register-page").css("display","table");
            $("#email").val(response.email);
            $("#nama").val(response.name);
          var password = $("#password-register").val();
          var confirm_password = $("#confirm-passowrd").val();
          var nama = $("#nama").val();
          var alamat = $("#alamat").val();
          var email = $("#email").val();
          var no_hp = $("#no_hp").val();
          var username = $("#username-register").val();
        }
      },
      error : function(data){
        console.log(data);
        //displayRegisterForm("koneksi error");
      },
      dataType: "JSON"
    });

  });


}

//-----------------LOGIN-----------------//
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    registerWithFB();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log("not authorised");
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    console.log("Please login");
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
var checkLoginState = function() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1700571170226419',
    cookie     : true,  // enable cookies to allow the server to access
    // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5

  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.







$(function(){  //-------------------------END LOGIN -------------------//
  window.scrollTo(0, 1);
  AddListenerButton();
  function AddListenerButton()
  {
    $('#home-button').click(function(){
      window.location.href = "http://www.siboskecil.com/index.php";
    });
    $("#register-button").click(function(){
      displayRegisterForm(null);
    });

    $(".close-button").click(function(){
      hideRegisterForm();
    });

    $('#register-button-submit').click(function(){
      prosesRegister();
    });

    $('#button-login-submit').click(function(){
      prosesLogin();
    })
  }

  function prosesLogin()
  {
    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({
      type: "POST",
      url: $("#base-api-url").html()+"/user/login",
      data: {
        username : username,
        password : password
      },
      success: function(data){
        if(data.status_code == 200)
        {
          var baseUrl = $("#base-url").html();
          window.location = baseUrl+"/page/game.php?access_token="+data.data.access_token;
        }else{
          display_warning_login(data.status_message);
        }

      },
      error : function(data){
        displayRegisterForm("koneksi error");
      },
      dataType: "JSON"
    });

  }


  function prosesRegister()
  {
    var password = $("#password-register").val();
    var confirm_password = $("#confirm-passowrd").val();
    var nama = $("#nama").val();
    var alamat = $("#alamat").val();
    var email = $("#email").val();
    var no_hp = $("#no_hp").val();
    var username = $("#username-register").val();

    console.log("password is "+password);
    console.log("confirm password is "+confirm_password);
    if(password != confirm_password || password == "" || password == null)
    {
      $("#keterangan").html("password dan confirm password tidak sama");
      return;
    }

    $("#form-login").css("display","none");
    $("#please-wait-screen").css("display","table");

    $.ajax({
      type: "POST",
      url: $("#base-api-url").html()+"/user/register",
      data: {
        username : username,
        nama_depan : nama,
        nama_belakang : "_",
        email : email,
        alamat : alamat,
        no_hp : no_hp,
        password : password
      },
      success: function(data){
        if(data.status_code == 402)
        {
          displayRegisterForm("data yang anda masukkan tidak lengkap");
        }else if(data.status_code == 401)
        {
          displayRegisterForm("username sudah terpakai, pakai username yang lain");
        }else if(data.status_code == 200)
        {
          changeWarningText("register success , silahkan login dengan username dan passwor yang sudah dibuat <br/> <a href='' class='close-button'> close </a> ");
        }

      },
      error : function(data){
        displayRegisterForm("koneksi error");
      },
      dataType: "JSON"
    });
  }

  function changeWarningText(val)
  {
    if(val != null){
      $("#please-wait-screen").css("display","table");
      $("#please-wait-screen").html(val);
    }else{
      $("#please-wait-screen").css("display","none");
    }
  }
  function display_warning_login(val)
  {
    $("#warning-login").html(val);
  }
  function displayRegisterForm(keterangan)
  {
    if(keterangan != null)
    {
      $("#keterangan").css("display","table");
      $("#keterangan").html(keterangan);
    }else{
      $("#keterangan").css("display","none");
    }
    $("#form-login").css("display","table");
    $("#please-wait-screen").css("display","none");
    $("#all-register-page").css("display","table");
  }

  function hideRegisterForm(keterangan)
  {
    $("#form-login").css("display","none");
    $("#please-wait-screen").css("display","none");
    $("#all-register-page").css("display","none");
  }
});
