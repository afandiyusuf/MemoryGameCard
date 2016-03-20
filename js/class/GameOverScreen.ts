class GameOverScreen
{
  public BgGameOver:createjs.Bitmap;
  private bgUrl:string = "asset/final/Border.png"

  public GameOverScreen = function()
  {

  }

  public ShowGameOver(container:createjs.MovieClip):void
  {
    this.BgGameOver = new createjs.Bitmap(this.bgUrl);
    this.BgGameOver.scaleX = 0.75;
    this.BgGameOver.scaleY = 0.75;
    this.BgGameOver.x = -10;
    container.addChild(this.BgGameOver);
  }
}
