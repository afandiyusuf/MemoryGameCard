

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
	public static longSession:number = 20;
	public static scaleFactor:number;

	public static gameTimers:GameTimer;
	public static arrCard:Array<Card> = new Array();
	private card1:createjs.Bitmap;
	private card2:createjs.Bitmap;
	private preload:Object;
	private backUrl:string = "asset/card/cardBack_blue2.png";
	public static width:number = 5;
	public static height:number = 4;
	private margin:number = 5;
	private allContainer:createjs.MovieClip;
	private id:number = 0;
	public stage:createjs.Stage;
	public static STAGE = new createjs.Stage("demoCanvas");

	private mainScreen:MainMenu = new MainMenu();

	public init()
	{
		this.stage = MainGame.STAGE;
		this.mainScreen.callMainMenu(this.stage);
		this.mainScreen.mainButton.addEventListener("click",()=>this.initGame(this));

		createjs.Ticker.setFPS(60);

		createjs.Ticker.addEventListener("tick",this.stage);
	}
	public initGame(main:MainGame)
	{
		MainGame.gameTimers = new GameTimer();
		main.allContainer = new createjs.MovieClip();

		createjs.Ticker.addEventListener("tick", this.handleUpdate);
		MainGame.gameTimers.init(this.stage,this.allContainer);
		main.generateCard();
	}

	public static GameOver():void
	{
		for(var i=0;i<MainGame.arrCard.length;i++)
		{
			MainGame.arrCard[i].Destroy();
		}
			createjs.Ticker.removeAllEventListeners("tick");
			createjs.Ticker.addEventListener("tick",MainGame.STAGE);
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
				c.backImageUrl = this.backUrl;
        c.init(this.stage,this.allContainer,i,j,this.margin,this.id);
				MainGame.arrCard.push(c);
			}
		}

		this.stage.addChild(this.allContainer);
		this.stage.update();
		this.allContainer.x = MainGame.GameWidth/2 - 200;
		this.allContainer.y = MainGame.GameHeight/2 - 200;
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
