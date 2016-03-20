///<reference path="../tsD/createjs.d.ts"/>

class MainGame
{
	public static firstId:number = 0;
	public static secondId:number = 0;
	private arrCard:Array<Object> = new Array();
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
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.stage);
		this.generateCard();
	}

	private generateCard()
	{
		this.allContainer = new createjs.MovieClip();
		for(var i=0;i<MainGame.width;i++)
		{
			for(var j=0;j<MainGame.height;j++)
			{
				this.id++;
				console.log(this.id);
        var c:Card = new Card();
				c.backImageUrl = this.backUrl;
        c.init(this.stage,this.allContainer,i,j,this.margin,this.id);
				
			}
		}

		this.stage.addChild(this.allContainer);
		this.stage.update();
	}


	private updateStage = function():void
	{
		console.log("stage updated");
		this.stage.update();
	}



}
