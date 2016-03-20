function init()
{
	var canvas:any = document.getElementById("game");
	canvas.width = document.body.clientWidth; //document.width is obsolete
  canvas.height = document.body.clientHeight;
	var mainGame = new MainGame();
	MainGame.GameWidth = canvas.width;
	MainGame.GameHeight = canvas.height;
	mainGame.init();


}
