function init()
{
	var canvas:any = document.getElementById("game");

	if (canvas.requestFullscreen) {
	  canvas.requestFullscreen();
	} else if (canvas.msRequestFullscreen) {
	  canvas.msRequestFullscreen();
	} else if (canvas.mozRequestFullScreen) {
	  canvas.mozRequestFullScreen();
	} else if (canvas.webkitRequestFullscreen) {
	  canvas.webkitRequestFullscreen();
	}

	if(document.body.clientWidth > 950)
	{
			canvas.width = 950;
			canvas.height = 450;
	}else{
		canvas.width = document.body.clientWidth;
		canvas.height = canvas.width/19*9;
	}




	var mainGame = new MainGame();
	MainGame.GameWidth = canvas.width;
	MainGame.GameHeight = canvas.height;

	mainGame.init();




}
