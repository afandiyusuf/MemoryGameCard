function init()
{



	var canvas:any = document.getElementById("game");
	if(document.body.clientWidth > document.body.clientHeight){
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

		var preload = new PreloadGame();
		preload.mainGame = mainGame;
		
		preload.init();

	}else{
		window.alert("please refresh and use landscape mode");
	}


	function handleFileLoad(event:any):void{

	}
	function handleComplete(event:any)
	{

	}


}
