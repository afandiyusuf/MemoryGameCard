class GameOverScreen
{
  public BgGameOver:createjs.Bitmap;
  private bgUrl:string = "../asset/Card/Back.png";
  public RestartButton:createjs.Bitmap;
  public QuitButton:createjs.Bitmap;
  public MainMenuButton:createjs.Bitmap;
  public container:createjs.MovieClip;

  public GameOverScreen = function()
  {

  }

  public ShowGameOver(container:createjs.MovieClip):void
  {
    this.container = container;
    this.BgGameOver = new createjs.Bitmap(this.bgUrl);
    this.BgGameOver.scaleX =0.6;
    this.BgGameOver.scaleY = this.BgGameOver.scaleX;
    this.BgGameOver.x = -10;
    container.addChild(this.BgGameOver);

    this.RestartButton = new createjs.Bitmap("asset/final/MAIN LAGI.PNG");
    this.RestartButton.scaleX = 0.6;
    this.RestartButton.scaleY = 0.6;
    this.RestartButton.addEventListener("click",()=>this.RestartGame(this));

    this.QuitButton = new createjs.Bitmap("asset/final/keluar.png");
    this.QuitButton.scaleX = 0.6;
    this.QuitButton.scaleY = 0.6;
    this.QuitButton.y = 200;
    this.QuitButton.x = 150;
    this.QuitButton.addEventListener("click",()=>this.QuitGame(this))
    //container.addChild(this.RestartButton);
    container.addChild(this.QuitButton);
  }
  public RestartGame(gs:GameOverScreen):void
  {
      window.location.reload();
      //MainGame.globMain.cleanGame();
      //MainGame.globMain.initGame(MainGame.globMain);

      //gs.DestroyThis(gs);
  }
  public QuitGame(gs:GameOverScreen):void
  {
    window.location.reload();
    //MainGame.globMain.cleanGame();
    //MainGame.globMain.init();
    //gs.DestroyThis(gs);
  }
  public DestroyThis(gs:GameOverScreen):void{
    gs.container.removeAllEventListeners("click");
    gs.container.removeChild(this.BgGameOver);
    gs.container.removeChild(this.RestartButton);
    gs.container.removeChild(this.QuitButton);

  }
}
