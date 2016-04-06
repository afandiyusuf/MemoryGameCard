class GameTimer
{

  public currentTimer:number;
  public totalTimer:number;
  public stage:createjs.Stage;
  public gameContainer:createjs.Stage;
  public timerImage:createjs.Bitmap;
  public timerContainerImage:createjs.Bitmap;
  public imageUrl:string = "../asset/final/Time.png";
  public containerUrl:string = "../asset/final/Time Container.png";
  private initScale:number = 2;
  private timerWidth:number = 824;
  private timerHeight:number;
  private timerContainerClip:createjs.MovieClip;
  private mainGame:MainGame;
  public GameTimer = function()
  {

  }

  public init(mainGame:MainGame):void
  {
    this.mainGame = mainGame;
    this.timerContainerClip = new createjs.MovieClip();


    this.stage = mainGame.stage;
    this.gameContainer = mainGame.stage;
    //add timer containerUrl
    this.timerContainerImage = new createjs.Bitmap(PreloadGame.queue.getResult("time-container"));
    this.initScale = MainGame.GameWidth/2/this.timerContainerImage.image.width;
    this.timerContainerImage.scaleX = this.initScale;
    this.timerContainerImage.scaleY = this.timerContainerImage.scaleX;
    this.timerContainerImage.x = MainGame.GameWidth/2 - (this.timerContainerImage.image.width * this.timerContainerImage.scaleX * 0.5);
    this.timerContainerImage.y = MainGame.GameHeight / 10;
    //add Timer
    this.timerImage = new createjs.Bitmap(PreloadGame.queue.getResult("time"));

    this.timerImage.scaleX = this.timerContainerImage.scaleX;
    this.timerImage.scaleY = this.timerContainerImage.scaleX;
    this.timerImage.x = this.timerContainerImage.x + (this.timerContainerImage.image.width * this.timerContainerImage.scaleX /8);
    this.timerImage.y = this.timerContainerImage.y + (this.timerContainerImage.image.height/2 * this.timerContainerImage.scaleY) - (this.timerImage.image.height*this.timerImage.scaleY*0.4) ;
    this.timerContainerClip.addChild(this.timerContainerImage);
    this.timerContainerClip.addChild(this.timerImage);
    this.gameContainer.addChild(this.timerContainerClip);

  }

  public update(scaleFactor:number):void
  {
    if(this.timerImage == null || this.timerImage == undefined)
      return;

      this.timerImage.scaleX = scaleFactor*this.initScale;

  }

  public Destroy():void
  {
    this.timerContainerClip.removeChild(this.timerContainerImage);
    this.timerContainerClip.removeChild(this.timerImage);
    this.gameContainer.removeChild(this.timerContainerClip);
  }

}
