/// <reference path="../tsD/createjs.d.ts" />
/// <reference path="../tsD/createjs.d.ts" />

class MainGame
{
	public static thisLevel:number = 0;
	public static ArrTimer:Array<number> = new Array(10,30,5);

	public static firstId:number = 0;
	public static secondId:number = 0;
	public static firstCard:Card;
	public static secondCard:Card;
	public static GameWidth:number;
	public static GameHeight:number;

	public static longIdle:number = 1;
	public static totalCard:number = 0;
	public static sessionTimer:number = 0;
	public static longSession:number = 60;
	public static scaleFactor:number;
	public static globalScale:number =.5;

	public idleCard:number = 0;
	public longIdleCard:number = 3;
	public static deltaTime:number = 0;

	public timers:number = 0;
	public LongGameTimer:number;
	public GameTimer:GameTimer;
	public arrCard:Array<Card> = new Array();
	private card1:createjs.Bitmap;
	private card2:createjs.Bitmap;
	private preload:Object;
	private backUrl:string = "../asset/Card/Back.png";
	public static width:number = 4;
	public static height:number = 4;
	private margin:number = 5;
	public  allContainer:createjs.MovieClip;
	private id:number = 0;
	public stage:createjs.Stage = new createjs.Stage("game");;
	public static STAGE:createjs.Stage;
	public static gameOverScreen:GameOverScreen;
	public mainScreen:MainMenu;
	public static globMain:MainGame;

	public isPause:boolean = false;

	public init()
	{

		this.mainScreen = new MainMenu(this);
		this.mainScreen.callMainMenu(this.stage);
		createjs.Ticker.addEventListener("tick", ()=>this.handleTick(this));

		createjs.Ticker.framerate = 60;
	}

	public StartPlayGame():void
	{
		MainGame.thisLevel++;
		this.timers = 0;
		this.idleCard = 0;
		MainGame.firstId = 0;
		MainGame.secondId = 0;
		this.id = 0;
		this.arrCard = new Array();
		this.LongGameTimer = MainGame.ArrTimer[MainGame.thisLevel-1];
		createjs.Ticker.addEventListener("tick",this.deltaTimeCatcher);
		this.allContainer = new createjs.MovieClip();
		this.stage.addChild(this.allContainer);
		this.generateCard();
	}
	private handleTick(master:MainGame)
	{
		if(master.isPause)
			return;

		master.stage.update();
		master.timers += MainGame.deltaTime/1000;
		master.idleCard += MainGame.deltaTime/1000;

		if(master.idleCard > master.longIdleCard)
		{
			if(MainGame.firstId != 0){
				MainGame.firstCard.swapToFace(MainGame.firstCard);
				MainGame.firstId = 0;
			}
			if(MainGame.secondId != 0){
				MainGame.secondCard.swapToFace(MainGame.secondCard);
				MainGame.secondId = 0;
			}
			master.idleCard = 0;
		}
		console.log(master.timers);
		if(master.timers >master.LongGameTimer)
		{
			master.DestroyThis();
			master.StartPlayGame();
		}
	}

	public pauseGame()
	{

	}

	private deltaTimeCatcher(e)
	{
		MainGame.deltaTime = e.delta;
	}
	public WIN_GAME()
	{
		this.DestroyThis();
	}

	public LOSE_GAME()
	{

	}
	private DestroyThis()
	{
		this.stage.removeChild(this.allContainer);
		createjs.Ticker.removeEventListener("tick", ()=>this.handleTick(this));
		createjs.Ticker.removeEventListener("tick",this.deltaTimeCatcher);
		this.DestroyAllCard();
	}

	public DestroyAllCard()
	{
		for(var i=0;i<this.arrCard.length;i++)
		{
			this.arrCard[0].Destroy();
		}
		this.stage.removeChild(this.allContainer);
	}

	private generateCard()
	{

		for(var i=0;i<MainGame.width;i++)
		{
			for(var j=0;j<MainGame.height;j++)
			{
				this.id++;
				MainGame.totalCard++;
				var c:Card = new Card(this);
				c.init(this.stage,this.allContainer,i,j,this.margin,this.id);
				this.arrCard.push(c);
			}
		}


		this.stage.update();
		this.allContainer.x = MainGame.GameWidth/2 - MainGame.GameWidth/5;
		this.allContainer.y = 10;
		this.arrCard = this.shuffleArray(this.arrCard);
		this.reArrangeAll();


	}

	private reArrangeAll()
	{
		var index:number = 0;
		for(var i=0;i<MainGame.width;i++)
		{
			for(var j=0;j<MainGame.height;j++){
				this.arrCard[index].reposition(i,j);
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
