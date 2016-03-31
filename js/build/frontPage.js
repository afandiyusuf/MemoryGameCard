$(function(){
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
