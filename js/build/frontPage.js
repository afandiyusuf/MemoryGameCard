$(function(){
  $("#register-button").click(function(){
    $("#all-login-page").css("display","table");
  });

  $("#close-button").click(function(){
    $("#all-login-page").css("display","none");
  });

  $('#register-button-submit').click(function(){

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
      url: "http://localhost:90/Base-Backend-Game-API/index.php/user/register",
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
          console.log("data tidak lengkap");
        }else if(data.status_code == 200)
        {
          console.log("success");
        }

      },
      error : function(data){
        console.log("error");
        console.log(data);
      },
      dataType: "JSON"
    });

  });
});
