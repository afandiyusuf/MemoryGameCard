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
    this.mainImage = new createjs.Bitmap("../asset/final/MAIN.png");
    this.mainButton = new createjs.MovieClip();
    this.mainButton.addChild(this.mainImage);
    this.mainButton.scaleX = 0.75;
    this.mainButton.scaleY = 0.75;
    this.stage.addChild(this.mainButton);

    //create logo
    this.logoImage = new createjs.Bitmap("../asset/final/Tao Kae Noi.png");
    this.logoImage.scaleX = MainGame.globalScale;
    this.logoImage.scaleY = MainGame.globalScale;

    this.stage.addChild(this.logoImage);

    //create big logo
    this.logo2Image = new createjs.Bitmap("../asset/final/Title.png");
    this.logo2Image.scaleX = MainGame.globalScale;
    this.logo2Image.scaleY = MainGame.globalScale;

    this.stage.addChild(this.logo2Image);


  }
  public update():void
  {
    this.logoImage.x = MainGame.GameWidth/20;
    this.logoImage.y = MainGame.GameHeight/20;
    this.logo2Image.x = this.logoImage.x+(this.logoImage.image.width*this.logoImage.scaleX)+20;
    this.logo2Image.y = MainGame.GameHeight/5;
    this.mainButton.x = this.logo2Image.x+(this.logo2Image.image.width*this.logo2Image.scaleX)+ 40;
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
