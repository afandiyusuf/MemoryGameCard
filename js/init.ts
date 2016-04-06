function init()
{
	window.scrollTo(0, 1);

	var canvas:any = document.getElementById("game");

		if(document.body.clientWidth > 800)
		{
			if(document.body.clientHeight < 450)
			{
				canvas.height = document.body.clientHeight;
				canvas.width = canvas.height/9*16;
			}else{

				if(document.body.clientHeight < document.body.clientWidth/16*9)
				{
					canvas.height = document.body.clientHeight - (document.body.clientHeight / 15);
					canvas.width = canvas.height/9*16;


				}else{
					canvas.width = document.body.clientWidth - (document.body.clientWidth / 15);
					canvas.height = canvas.width/16*9;
				}

			}
		}else{
			canvas.width = document.body.offsetWidth;
			canvas.height = canvas.width/16*9;
		}

		var mainGame = new MainGame();
		MainGame.GameWidth = canvas.width;
		MainGame.GameHeight = canvas.height;

		var preload = new PreloadGame();
		preload.mainGame = mainGame;
		preload.init();



	function handleFileLoad(event:any):void{

	}
	function handleComplete(event:any)
	{

	}


}
