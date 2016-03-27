/// <reference path="../tsD/createjs.d.ts" />

class MainGame
{
	public static firstId:number = 0;
	public static secondId:number = 0;
	public static firstCard:Card;
	public static secondCard:Card;
	public static GameWidth:number = 800;
	public static GameHeight:number = 600;
	public static timers:number = 0;
	public static longIdle:number = 1;
	public static totalCard:number = 0;
	public static sessionTimer:number = 0;
	public static longSession:number = 60;
	public static scaleFactor:number;
	public static globalScale:number =.5;

	public static gameTimers:GameTimer;
	public static arrCard:Array<Card> = new Array();
	private card1:createjs.Bitmap;
	private card2:createjs.Bitmap;
	private preload:Object;
	private backUrl:string = "../asset/Card/Back.png";
	public static width:number = 4;
	public static height:number = 4;
	private margin:number = 5;
	public static allContainer:createjs.MovieClip;
	private id:number = 0;
	public stage:createjs.Stage = new createjs.Stage("game");;
	public static STAGE:createjs.Stage;
	public static gameOverScreen:GameOverScreen;
	public static mainScreen:MainMenu;
	public static globMain:MainGame;
	public init()
	{
		MainGame.globMain = this;
		MainGame.gameOverScreen = new GameOverScreen();
		MainGame.mainScreen = new MainMenu();
		console.log("hello");
		MainGame.STAGE = this.stage;

		MainGame.mainScreen.callMainMenu(this.stage);
		MainGame.mainScreen.mainButton.addEventListener("click",()=>this.initGame(this));

		createjs.Ticker.setFPS(60);

		createjs.Ticker.addEventListener("tick",this.stage);
		createjs.Ticker.addEventListener("tick",this.updateLayout);
	}
	public cleanGame():void
	{

		this.stage.removeChild(MainGame.allContainer);
		MainGame.gameTimers.Destroy();
	}
	public updateLayout():void
	{
		MainGame.mainScreen.update();

	}

	public initGame(main:MainGame)//main:MainGame)
	{
		MainGame.gameTimers = new GameTimer();
		MainGame.allContainer = new createjs.MovieClip();
		MainGame.arrCard = new Array();
		MainGame.totalCard = 0;
		MainGame.globMain.id = 0;
		MainGame.timers = 0;
		MainGame.sessionTimer = 0;
		createjs.Ticker.addEventListener("tick", main.handleUpdate);
		MainGame.gameTimers.init(main.stage,MainGame.allContainer);
		main.generateCard();
		MainGame.mainScreen.destroyThis();
	}

	public static GameOver():void
	{
		for(var i=0;i<MainGame.arrCard.length;i++)
		{
			MainGame.arrCard[i].Destroy();
		}
			createjs.Ticker.removeAllEventListeners("tick");
			createjs.Ticker.addEventListener("tick",MainGame.STAGE);
			MainGame.gameOverScreen.ShowGameOver(MainGame.allContainer);
	}

	private handleUpdate(event:any):void
	{
			MainGame.timers += event.delta/1000;
			MainGame.sessionTimer += event.delta/1000;
			MainGame.scaleFactor = MainGame.sessionTimer/MainGame.longSession;
			MainGame.gameTimers.update(MainGame.scaleFactor);

			if(MainGame.scaleFactor > 1)
			{
				MainGame.GameOver();

			}
			if(MainGame.timers > MainGame.longIdle)
			{
				if(MainGame.firstId != 0)
				{
					MainGame.firstCard.swapToFace(MainGame.firstCard);
					MainGame.firstId = 0;
				}

				if(MainGame.secondId != 0)
				{
					MainGame.secondCard.swapToFace(MainGame.secondCard);
					MainGame.secondId = 0;
				}
				MainGame.timers = 0;
			}

	}

	private generateCard()
	{

		for(var i=0;i<MainGame.width;i++)
		{
			for(var j=0;j<MainGame.height;j++)
			{
				this.id++;
				MainGame.totalCard++;
				console.log(this.id);
        var c:Card = new Card();
				//c.backImageUrl = this.backUrl;
        c.init(this.stage,MainGame.allContainer,i,j,this.margin,this.id);
				MainGame.arrCard.push(c);
			}
		}

		this.stage.addChild(MainGame.allContainer);
		this.stage.update();
		MainGame.allContainer.x = MainGame.GameWidth/2 - MainGame.GameWidth/5;
		MainGame.allContainer.y = 10;
		MainGame.arrCard = this.shuffleArray(MainGame.arrCard);
		this.reArrangeAll();


	}

	private reArrangeAll()
	{
		var index:number = 0;
		for(var i=0;i<MainGame.width;i++)
		{
			for(var j=0;j<MainGame.height;j++){
				MainGame.arrCard[index].reposition(i,j);
				index++;
			}
		}
	}

	private shuffleArray(array:Array<Card>):Array<Card>
	{
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


}
