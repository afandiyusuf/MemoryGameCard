$(function(){
  if(document.body.clientWidth < document.body.clientHeight){
    $("#warning-parent").css("display","table");
  }
  $( window ).resize(function() {
    if(document.body.clientWidth < document.body.clientHeight){
      $("#warning-parent").css("display","table");
    }else{
        $("#warning-parent").css("display","none");
    }
  })
})
