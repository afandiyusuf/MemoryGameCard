class GameTimer
{

  public currentTimer:number;
  public totalTimer:number;
  public stage:createjs.Stage;
  public gameContainer:createjs.MovieClip;
  public timerImage:createjs.Bitmap;
  public timerContainerImage:createjs.Bitmap;
  public imageUrl:string = "asset/final/Time.png";
  public containerUrl:string = "asset/final/Time Container.png";
  private initScale:number = 2;

  public GameTimer = function()
  {

  }

  public init(stage:createjs.Stage,gameContainer:createjs.MovieClip):void
  {
    this.initScale = 0.5;
    this.stage = stage;
    this.gameContainer = gameContainer;
    //add timer containerUrl
    this.timerContainerImage = new createjs.Bitmap(this.containerUrl);
    this.gameContainer.addChild(this.timerContainerImage);
    this.timerContainerImage.scaleX = 0.5;
    this.timerContainerImage.scaleY = 0.5;
    this.timerContainerImage.x = 40;

    //add Timer
    this.timerImage = new createjs.Bitmap(this.imageUrl);
    this.gameContainer.addChild(this.timerImage);
    this.timerImage.scaleX = 0.5;
    this.timerImage.scaleY = 0.5;
    this.timerImage.x = 93;
    this.timerImage.y = 5;


  }

  public update(scaleFactor:number):void
  {
      this.timerImage.scaleX = scaleFactor*this.initScale;
  }

}
