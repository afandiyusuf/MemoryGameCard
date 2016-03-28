function init()
{

	var queue = new createjs.LoadQueue(true);
	queue.on("fileload", handleFileLoad, this);
	queue.on("complete", handleComplete, this);
	queue.loadFile({id:"card1", src:"../asset/final/1.png"});
	queue.loadFile({id:"card2", src:"../asset/final/2.png"});
	queue.loadFile({id:"card3", src:"../asset/final/3.png"});
	queue.loadFile({id:"card4", src:"../asset/final/4.png"});
	queue.loadFile({id:"card5", src:"../asset/final/5.png"});
	queue.loadFile({id:"card6", src:"../asset/final/6.png"});
	queue.loadFile({id:"card7", src:"../asset/final/7.png"});
	queue.loadFile({id:"card8", src:"../asset/final/8.png"});
	queue.loadFile({id:"card_back", src:"../asset/final/bcak.png"});
	queue.loadFile({id:"bg", src:"../asset/final/BG.jpg"});
	queue.loadFile({id:"border", src:"../asset/final/border.png"});
	queue.loadFile({id:"keluar-button", src:"../asset/final/keluar.png"});
	queue.loadFile({id:"main-lagi-button", src:"../asset/final/MAIN LAGI.png"});

	queue.load();

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
		mainGame.init();

	}else{
		window.alert("please refresh and use landscape mode");
	}


	function handleFileLoad(event:any):void{

	}
	function handleComplete(event:any)
	{

	}


}
