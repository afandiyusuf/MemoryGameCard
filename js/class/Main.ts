///<reference path="../tsD/createjs.d.ts"/>

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
	private arrCard:Array<Card> = new Array();
	private card1:createjs.Bitmap;
	private card2:createjs.Bitmap;
	private preload:Object;
	private backUrl:string = "asset/card/cardBack_blue2.png";
	public static width:number = 5;
	public static height:number = 4;
	private margin:number = 5;
	private allContainer:createjs.MovieClip;
	private id:number = 0;
	private stage = new createjs.Stage("demoCanvas");


	public init()
	{
		MainGame.gameTimers = new GameTimer();
		this.allContainer = new createjs.MovieClip();
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.handleUpdate);
		createjs.Ticker.addEventListener("tick",this.stage);

		MainGame.gameTimers.init(this.stage,this.allContainer);
		this.generateCard();
	}

	public static GameOver():void
	{
		console.log("GAME OVER");
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
				this.arrCard.push(c);
			}
		}

		this.stage.addChild(this.allContainer);
		this.stage.update();
		this.allContainer.x = MainGame.GameWidth/2 - 200;
		this.allContainer.y = MainGame.GameHeight/2 - 200;
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
