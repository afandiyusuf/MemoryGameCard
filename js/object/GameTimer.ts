class GameTimer
{

  public currentTimer:number;
  public totalTimer:number;
  public stage:createjs.Stage;
  public gameContainer:createjs.MovieClip;
  public timerImage:createjs.Bitmap;
  public timerContainerImage:createjs.Bitmap;
  public imageUrl:string = "../asset/final/Time.png";
  public containerUrl:string = "../asset/final/Time Container.png";
  private initScale:number = 2;
  private timerWidth:number = 824;
  private timerHeight:number;
  private timerContainerClip:createjs.MovieClip;
  public GameTimer = function()
  {

  }

  public init(stage:createjs.Stage,gameContainer:createjs.MovieClip):void
  {
    this.timerContainerClip = new createjs.MovieClip();
    this.initScale = ((MainGame.GameHeight/6*4)+(10*4))/828;

    this.stage = stage;
    this.gameContainer = gameContainer;
    //add timer containerUrl
    this.timerContainerImage = new createjs.Bitmap(this.containerUrl);

    this.timerContainerImage.scaleX = this.initScale;
    this.timerContainerImage.scaleY = this.initScale;
    this.timerContainerImage.x = 40;

    //add Timer
    this.timerImage = new createjs.Bitmap(this.imageUrl);

    this.timerImage.scaleX = this.initScale;
    this.timerImage.scaleY = this.timerImage.scaleX;
    this.timerImage.x = 80;
    this.timerImage.y = 5;
    this.timerContainerClip.addChild(this.timerContainerImage);
    this.timerContainerClip.addChild(this.timerImage);
    this.gameContainer.addChild(this.timerContainerClip);
    this.timerContainerClip.x = 0;
    this.timerContainerClip.y = 20;

  }

  public update(scaleFactor:number):void
  {
      this.timerImage.scaleX = scaleFactor*this.initScale;

  }

  public Destroy():void
  {
    this.timerContainerClip.removeChild(this.timerContainerImage);
    this.timerContainerClip.removeChild(this.timerImage);
    this.gameContainer.removeChild(this.timerContainerClip);
  }

}
