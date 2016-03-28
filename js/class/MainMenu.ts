class MainMenu
{
  public mainImage:createjs.Bitmap;
  public logoImage:createjs.Bitmap;
  public logo2Image:createjs.Bitmap;
  public mainButton:createjs.MovieClip;
  private stage:createjs.Stage;
  private logoUrl:string;
  public MainMenu = function()
  {

  }
  public callMainMenu(stage:createjs.Stage):void
  {

    this.stage = stage;
    this.mainImage = new createjs.Bitmap(PreloadGame.queue.getResult("main-button"));
    this.mainButton = new createjs.MovieClip();
    this.mainButton.addChild(this.mainImage);
    this.mainButton.scaleX = 0.75;
    this.mainButton.scaleY = 0.75;
    this.stage.addChild(this.mainButton);

    //create logo
    this.logoImage = new createjs.Bitmap(PreloadGame.queue.getResult("corner-logo"));
    this.logoImage.scaleX = MainGame.GameWidth/10/this.logoImage.image.width;
    this.logoImage.scaleY = this.logoImage.scaleX;

    this.stage.addChild(this.logoImage);

    //create big logo
    this.logo2Image = new createjs.Bitmap(PreloadGame.queue.getResult("title-image"));
    this.logo2Image.scaleY = (MainGame.GameHeight-(MainGame.GameHeight/12))/this.logo2Image.image.width;
    this.logo2Image.scaleX =this.logo2Image.scaleY;

    this.stage.addChild(this.logo2Image);

    this.reposisi();

  }
  public reposisi():void
  {
    this.logoImage.x = MainGame.GameWidth/20;
    this.logoImage.y = MainGame.GameHeight/20;
    this.logo2Image.x = this.logoImage.x+(this.logoImage.image.width*this.logoImage.scaleX)+20;
    this.logo2Image.y = MainGame.GameHeight/2 - (this.logo2Image.image.height/2 * this.logo2Image.scaleY);
    this.mainButton.x = (this.logo2Image.x + (MainGame.GameWidth - this.logoImage.x))/2 + (this.mainImage.image.width * this.mainButton.scaleX);
    this.mainButton.y = (this.logo2Image.image.height*this.logo2Image.scaleY)/2+this.logo2Image.y;

  }
  public destroyThis():void
  {

    this.mainButton.removeAllEventListeners("click");
    this.mainButton.removeChild(this.mainImage);
    this.stage.removeChild(this.mainButton);
    //this.stage.removeChild(this.logoImage);
    this.stage.removeChild(this.logo2Image);
  }
}
