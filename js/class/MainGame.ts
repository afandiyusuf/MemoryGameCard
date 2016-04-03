/// <reference path="../tsD/createjs.d.ts" />
/// <reference path="../tsD/jquery.d.ts" />

class MainGame
{
	public static LogOutUrl = "http://www.siboskecil.com/php/logout.php";
	public static leaderboardUrl = "http://www.siboskecil.com/page/leaderboard.php";
	public static thisLevel:number = 0;
	public static ArrTimer:Array<number> = new Array(240,240,180,180,120);

	public static firstId:number = 0;
	public static secondId:number = 0;
	public static firstCard:Card;
	public static secondCard:Card;
	public static firstMatchCard:Card;
	public static secondMatchCard:Card;
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
	public urlBG:Array<string> = new Array("../asset/match boss/BG 1.png","../asset/match boss/BG 2.png","../asset/match boss/BG 3.png","../asset/match boss/BG 1.png","../asset/match boss/BG 2.png");
	public timers:number = 0;
	public LongGameTimer:number;
	public gameTimer:GameTimer;
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
	public ui:UI;
	public static globMain:MainGame;
	public containerWidth:number;
	private arrScore:Array<number> = new Array();
	public static gt:string;
	public totalScore:number = 0;

	public isPause:boolean = true;

	public init()
	{

		this.ui = new UI(this);
		this.GotoMainMenu();
		this.gameTimer = new GameTimer();
		createjs.Ticker.addEventListener("tick", ()=>this.handleTick(this));
		createjs.Ticker.addEventListener("tick",this.deltaTimeCatcher);
	}

	public GotoMainMenu()
	{
		this.arrScore = new Array();
		createjs.Ticker.framerate = 60;
		this.timers = 0;
		this.ui.callMainMenu(this.stage);

		this.stage.update();
		MainGame.thisLevel = 0;

		$.ajax({
			type: "POST",
			url: $("#base_api_url").html()+"/game/creatSession",
			data: {
				access_token : $("#access_token").html()
			},

			success: function(data){
				if(data.status_code == 200)
				{
					MainGame.gt = data.data.game_token;
					console.log(MainGame.gt);
				}else{
					window.location.href = MainGame.LogOutUrl;
				}

			},
			error : function(data){

			},
			dataType: "JSON"
		});
	}

	public StartPlayGame():void
	{
		this.gameTimer.init(this);
		this.timers = 0;
		this.idleCard = 0;
		MainGame.firstId = 0;
		MainGame.secondId = 0;
		this.id = 0;
		this.arrCard = new Array();
		this.LongGameTimer = MainGame.ArrTimer[MainGame.thisLevel];
		console.log(this.LongGameTimer);
		MainGame.totalCard = 0;
		this.allContainer = new createjs.MovieClip();
		this.stage.addChild(this.allContainer);
		this.generateCard();
		this.ui.CallGameUi();
		this.isPause = false;
	}
	public NextGame()
	{
		this.gameTimer.Destroy();

		this.DestroyAllCard();
		this.arrScore.push(Math.round(this.LongGameTimer - this.timers));
		var arrscore = this.arrScore;
		var level = MainGame.thisLevel;

		$.ajax({
			type: "POST",
			url: $("#base_api_url").html()+"/game/postScorePerLevel",
			data: {
				access_token:$("#access_token").html(),
				game_token: MainGame.gt,
				score: arrscore[level],
				level:'level'+(level+1)
			},
			success: function(data){
				if(data.status_code == 200)
				{

				}else{
					window.location.href = MainGame.LogOutUrl;
				}

			},
			error : function(data){

			},
			dataType: "JSON"
		});

		MainGame.thisLevel++;
		this.ui.changeBodyBG(this.urlBG[MainGame.thisLevel]);
		this.StartPlayGame();

	}
	public handlePause()
	{
		this.isPause = true;
	}
	public handleResume()
	{
		this.isPause = false;
	}

	public handleWin()
	{

		this.isPause = true;
		this.DestroyThis();


		if(MainGame.thisLevel == MainGame.ArrTimer.length-1)
		{
			console.log("FINISH");

			this.arrScore.push(Math.round(this.LongGameTimer - this.timers));
			var arrscore = this.arrScore;
			var level = MainGame.thisLevel;


			$.ajax({
				type: "POST",
				url: $("#base_api_url").html()+"/game/postScorePerLevel",
				data: {
					access_token:$("#access_token").html(),
					game_token: MainGame.gt,
					score: arrscore[level],
					level:'level'+(level+1)
				},
				success: function(data){
					if(data.status_code == 200)
					{
						console.log(data);
					}else{
						window.location.href = MainGame.LogOutUrl;
					}

				},
				error : function(data){
					console.log("error");
				},
				dataType: "JSON"
			});
			this.totalScore = 0;
			for(var i=0;i<this.arrScore.length;i++)
			{
				this.totalScore += this.arrScore[i];
			}
			this.ui.callWinALL();
		}else{
			this.ui.callWinScreen();
		}
	}
	private handleTick(master:MainGame)
	{
		if(master.isPause)
		return;

		master.stage.update();
		master.timers += MainGame.deltaTime/1000;
		master.idleCard += MainGame.deltaTime/1000;
		this.gameTimer.update((master.LongGameTimer - master.timers) / master.LongGameTimer);

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

		if(master.timers >master.LongGameTimer)
		{
			master.DestroyThis();
			master.ui.DestroyGameUI();
			master.ui.CallFailedScreen();
			master.isPause = true;
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

		this.arrCard = this.shuffleArray(this.arrCard);
		this.reArrangeAll();

		this.containerWidth = (this.arrCard[0].trueWidth+this.arrCard[0].margin) * MainGame.width;
		console.log(this.arrCard[0].trueWidth);
		console.log(this.containerWidth);
		this.allContainer.x = (MainGame.GameWidth - this.containerWidth)/2;
		this.allContainer.y = (MainGame.GameHeight - this.containerWidth)/2;
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
