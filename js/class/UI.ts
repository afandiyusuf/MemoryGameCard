class UI
{

  public mainImage:createjs.Bitmap;
  public logoImage:createjs.Bitmap;
  public logo2Image:createjs.Bitmap;
  public pausePanel:createjs.Bitmap;
  private pauseImage:createjs.Bitmap;
  private continueImage:createjs.Bitmap;
  private homeImage:createjs.Bitmap;
  private mainlagi2:createjs.Bitmap;
  private fb_button:createjs.Bitmap;
  private lanjut:createjs.Bitmap;

  private failedPanel:createjs.Bitmap;
  private winPanel:createjs.Bitmap;

  private whiteBorder:createjs.Bitmap;

  public mainButton:createjs.MovieClip;
  public pauseButton:createjs.MovieClip;
  public continueButton:createjs.MovieClip;
  public homeButton:createjs.MovieClip;

  private stage:createjs.Stage;
  private logoUrl:string;
  private mainGame:MainGame;
  private lvlImage:createjs.Bitmap;


  constructor(mainGame:MainGame)
  {
    this.mainGame = mainGame;
  }
  public changeBodyBG(string2)
  {
    console.log("change bg"+string2);
    $(document.body).css("background-image","url('"+string2+"')");
  }
  public callWinALL()
  {
    this.whiteBorder = new createjs.Bitmap(PreloadGame.queue.getResult("white-border"));
    this.whiteBorder.scaleX = MainGame.GameWidth/this.whiteBorder.image.width;
    this.whiteBorder.scaleY = this.whiteBorder.scaleX;

    this.mainGame.stage.addChild(this.whiteBorder);

    this.winPanel = new createjs.Bitmap(PreloadGame.queue.getResult("win-lvl"));
    this.winPanel.scaleY = (MainGame.GameHeight - MainGame.GameHeight/4)/this.winPanel.image.height;
    this.winPanel.scaleX = this.winPanel.scaleY;

    var widthPanel:number = this.winPanel.image.width * this.winPanel.scaleX;
    var heightPanel:number = this.winPanel.image.height * this.winPanel.scaleY;

    this.winPanel.x = (MainGame.GameWidth - widthPanel)/2;
    this.winPanel.y = (MainGame.GameHeight - heightPanel)/2;

    this.mainGame.stage.addChild(this.winPanel);

    this.lanjut = new createjs.Bitmap(PreloadGame.queue.getResult("lanjut"));
    this.lanjut.scaleX = this.winPanel.scaleX*1.5;
    this.lanjut.scaleY = this.winPanel.scaleX*1.5;

    var heightContinue:number = this.lanjut.image.height*this.lanjut.scaleY;

    this.lanjut.x = this.winPanel.x + widthPanel/2 - (this.lanjut.image.width * this.lanjut.scaleX*0.5);
    this.lanjut.y = this.winPanel.y + heightPanel - heightContinue - heightPanel/10;
    this.mainGame.stage.addChild(this.lanjut);

    this.lanjut.addEventListener("click",()=>this.gotoLeaderboard());
    this.mainGame.stage.update();

  }
  public callLvlImage(lvl:number)
  {
    this.lvlImage = new createjs.Bitmap(PreloadGame.queue.getResult("lvl"+lvl));
    this.lvlImage.scaleX = 0.7;
    this.lvlImage.scaleY = 0.7;
    this.lvlImage.y = MainGame.GameHeight - (this.lvlImage.image.height *this.lvlImage.scaleX) - MainGame.GameHeight/10;
    this.lvlImage.x = MainGame.GameWidth - (this.lvlImage.image.width * this.lvlImage.scaleX) - MainGame.GameWidth/10;
    this.mainGame.stage.addChild(this.lvlImage);
  }
  public destroyLvlImage()
  {
      this.mainGame.stage.removeChild(this.lvlImage);
  }
  public gotoLeaderboard()
  {

    $.ajax({
      type: "POST",
      url: $("#base_api_url").html()+"/game/postTotalScore",
      data: {
        access_token:$("#access_token").html(),
        game_token: MainGame.gt,
        score: this.mainGame.totalScore
      },
      success: function(data){
        if(data.status_code == 200)
        {
      //console.log(data);
          window.location.href = "http://www.siboskecil.com";
        }else{
          window.location.href = MainGame.LogOutUrl;
        }

      },
      error : function(data){
        console.log("error");
      },
      dataType: "JSON"
    });

  }
  public DestroyWinAll()
  {
    this.lanjut.removeEventListener("click",()=>this.gotoLeaderboard());
    this.mainGame.stage.removeChild(this.whiteBorder);
    this.mainGame.stage.removeChild(this.winPanel);
    this.mainGame.stage.removeChild(this.lanjut);

    this.mainGame.stage.update();
  }
  public callWinScreen()
  {
    this.whiteBorder = new createjs.Bitmap(PreloadGame.queue.getResult("white-border"));
    this.whiteBorder.scaleX = MainGame.GameWidth/this.whiteBorder.image.width;
    this.whiteBorder.scaleY = this.whiteBorder.scaleX;

    this.mainGame.stage.addChild(this.whiteBorder);

    this.winPanel = new createjs.Bitmap(PreloadGame.queue.getResult("win-lvl"));
    this.winPanel.scaleY = (MainGame.GameHeight - MainGame.GameHeight/4)/this.winPanel.image.height;
    this.winPanel.scaleX = this.winPanel.scaleY;

    var widthPanel:number = this.winPanel.image.width * this.winPanel.scaleX;
    var heightPanel:number = this.winPanel.image.height * this.winPanel.scaleY;

    this.winPanel.x = (MainGame.GameWidth - widthPanel)/2;
    this.winPanel.y = (MainGame.GameHeight - heightPanel)/2;

    this.mainGame.stage.addChild(this.winPanel);

    // this.lanjut = new createjs.Bitmap(PreloadGame.queue.getResult("lanjut"));
    // this.lanjut.scaleX = this.winPanel.scaleX*1.5;
    // this.lanjut.scaleY = this.winPanel.scaleX*1.5;
    //
    // var heightContinue:number = this.lanjut.image.height*this.lanjut.scaleY;
    //
    // this.lanjut.x = this.winPanel.x + widthPanel/2 - (this.lanjut.image.width * this.lanjut.scaleX*0.5) - this.lanjut.image.width * this.lanjut.scaleX * 0.5;
    // this.lanjut.y = this.winPanel.y + heightPanel - heightContinue - heightPanel/20;
    // this.mainGame.stage.addChild(this.lanjut);
    //
    //
    // this.fb_button = new createjs.Bitmap(PreloadGame.queue.getResult("fb-share"));
    // this.fb_button.scaleX = this.winPanel.scaleX*1.5;
    // this.fb_button.scaleY = this.winPanel.scaleX*1.5;
    //
    // var heightContinue:number = this.fb_button.image.height*this.fb_button.scaleY;
    //
    // this.fb_button.x =  this.lanjut.x + (this.lanjut.scaleX * this.lanjut.image.width) +20;
    // this.fb_button.y = this.lanjut.y;
    // this.fb_button.addEventListener("click",()=>this.ShareFB())
    // this.mainGame.stage.addChild(this.fb_button);
    //
    // this.lanjut.addEventListener("click",()=>this.LanjutGame());
    this.mainGame.stage.update();

    createjs.Tween.get(null)
        .wait(3000)
        .to(null)
        .call(()=>this.LanjutGame());
  }
  private ShareFB()
  {
    FB.ui(
      {
        method: 'share',
        href: 'http://www.siboskecil.com',
      },
      // callback
      function(response) {
        if (response && !response.error_message) {
        } else {
        }
      }
    );
  }
  private DestroyWinScreen()
  {
    // this.lanjut.removeEventListener("click",()=>this.GotoMainMenu());
    // this.fb_button.removeEventListener("click",()=>this.ShareFB())
    // this.mainGame.stage.removeChild(this.fb_button);
    // this.mainGame.stage.removeChild(this.lanjut);
    this.mainGame.stage.removeChild(this.whiteBorder);
    this.mainGame.stage.removeChild(this.winPanel);

    this.mainGame.stage.update();
  }

  public LanjutGame()
  {
    this.DestroyWinScreen();
    this.mainGame.NextGame();
  }

  public callMainMenu(stage:createjs.Stage):void
  {

    this.stage = stage;
    this.mainImage = new createjs.Bitmap(PreloadGame.queue.getResult("main-button"));
    this.mainButton = new createjs.MovieClip();
    this.mainButton.addChild(this.mainImage);
    this.mainButton.scaleX = MainGame.GameWidth/6/this.mainImage.image.width;
    this.mainButton.scaleY = this.mainButton.scaleX;
    this.stage.addChild(this.mainButton);

    //create logo
    this.logoImage = new createjs.Bitmap(PreloadGame.queue.getResult("corner-logo"));
    this.logoImage.scaleX = MainGame.GameWidth/10/this.logoImage.image.width;
    this.logoImage.scaleY = this.logoImage.scaleX;

    this.stage.addChild(this.logoImage);
    this.logoImage.regY = -this.logoImage.image.height*0.5;
    this.logo2Image = new createjs.Bitmap(PreloadGame.queue.getResult("title-image"));
    this.logo2Image.scaleY = (MainGame.GameHeight-(MainGame.GameHeight/12))/this.logo2Image.image.width;
    this.logo2Image.scaleX =this.logo2Image.scaleY;

    this.stage.addChild(this.logo2Image);

    this.logoImage.x = MainGame.GameWidth/20;
    this.logoImage.y = MainGame.GameHeight/10;
    this.logo2Image.x = this.logoImage.x+(this.logoImage.image.width*this.logoImage.scaleX)+20;
    this.logo2Image.y = MainGame.GameHeight/2 - (this.logo2Image.image.height/2 * this.logo2Image.scaleY);
    var widthlogo2:number = this.logo2Image.image.width * this.logo2Image.scaleX;

    this.mainButton.x = this.logo2Image.x + widthlogo2 + (MainGame.GameWidth - (widthlogo2+this.logo2Image.x))/2 - (this.mainImage.image.width * this.mainButton.scaleX*0.5);
    this.mainButton.y = (this.logo2Image.image.height*this.logo2Image.scaleY)/2+this.logo2Image.y;
    console.log((this.logo2Image.image.height*this.logo2Image.scaleY)/2+this.logo2Image.y);
    //craeteListener
    this.mainButton.addEventListener("click",()=>this.startGame());
  }


  public CallGameUi()
  {
    this.callLvlImage(MainGame.thisLevel+1);
    this.pauseImage = new createjs.Bitmap(PreloadGame.queue.getResult("pause"));
    this.pauseImage.scaleX = MainGame.GameWidth/25/this.pauseImage.image.width;
    this.pauseImage.scaleY = this.pauseImage.scaleX;
    this.pauseImage.x = MainGame.GameWidth - (this.pauseImage.image.width * this.pauseImage.scaleX) - (MainGame.GameWidth/25);
    this.pauseImage.y = MainGame.GameHeight/10;
    this.pauseButton = new createjs.MovieClip();
    this.pauseButton.addChild(this.pauseImage);
    this.mainGame.stage.addChild(this.pauseButton);
    this.pauseButton.addEventListener("click",()=>this.pauseGame());
  }

  public DestroyGameUI()
  {
    this.pauseButton.removeChild(this.pauseImage);
    this.mainGame.stage.removeChild(this.pauseButton);
    this.pauseButton.removeEventListener("click",()=>this.pauseGame());
    this.destroyLvlImage();
    this.mainGame.stage.update();
  }

  public pauseGame()
  {
    this.DestroyGameUI();
    this.mainGame.handlePause();
    this.CallPauseScreen();
    this.mainGame.stage.update();
  }

  public CallFailedScreen()
  {
    this.whiteBorder = new createjs.Bitmap(PreloadGame.queue.getResult("white-border"));
    this.whiteBorder.scaleX = MainGame.GameWidth/this.whiteBorder.image.width;
    this.whiteBorder.scaleY = this.whiteBorder.scaleX;
    this.whiteBorder.addEventListener("click",()=>this.GotoMainMenu());

    this.mainGame.stage.addChild(this.whiteBorder);

    this.failedPanel = new createjs.Bitmap(PreloadGame.queue.getResult("failed-panel"));
    this.failedPanel.scaleY = (MainGame.GameHeight - MainGame.GameHeight/4)/this.failedPanel.image.height;
    this.failedPanel.scaleX = this.failedPanel.scaleY;
    this.failedPanel.addEventListener("click",()=>this.GotoMainMenu());

    var widthPanel:number = this.failedPanel.image.width * this.failedPanel.scaleX;
    var heightPanel:number = this.failedPanel.image.height * this.failedPanel.scaleY;

    this.failedPanel.x = (MainGame.GameWidth - widthPanel)/2;
    this.failedPanel.y = (MainGame.GameHeight - heightPanel)/2;

    this.mainGame.stage.addChild(this.failedPanel);

    // this.mainlagi2 = new createjs.Bitmap(PreloadGame.queue.getResult("main-lagi2"));
    // this.mainlagi2.scaleX = this.failedPanel.scaleX;
    // this.mainlagi2.scaleY = this.mainlagi2.scaleX;
    //
    // var heightContinue:number = this.mainlagi2.image.height*this.mainlagi2.scaleY;
    //
    // this.mainlagi2.x = this.failedPanel.x + widthPanel/2 - (this.mainlagi2.image.width * this.mainlagi2.scaleX*0.5);
    // this.mainlagi2.y = this.failedPanel.y + heightPanel - heightContinue - heightPanel/10;
    // this.mainGame.stage.addChild(this.mainlagi2);
    //
    // this.mainlagi2.addEventListener("click",()=>this.GotoMainMenu());
     this.mainGame.stage.update();
     createjs.Tween.get(null)
         .wait(3000)
         .to(null)
         .call(()=>this.GotoMainMenu());
  }

  private DestroyFailScreen()
  {
    // this.mainGame.stage.removeChild(this.mainlagi2);
    this.mainGame.stage.removeChild(this.failedPanel);
    this.mainGame.stage.removeChild(this.whiteBorder);
    this.failedPanel.removeEventListener("click",()=>this.GotoMainMenu());
    this.whiteBorder.removeEventListener("click",()=>this.GotoMainMenu());
  }

  public GotoMainMenu()
  {
this.mainGame.gameTimer.Destroy();
    this.DestroyFailScreen();
    this.mainGame.stage.update();
    this.mainGame.GotoMainMenu();

  }

  public CallPauseScreen()
  {
    this.whiteBorder = new createjs.Bitmap(PreloadGame.queue.getResult("white-border"));
    this.whiteBorder.scaleX = MainGame.GameWidth/this.whiteBorder.image.width;
    this.whiteBorder.scaleY = this.whiteBorder.scaleX;
    this.mainGame.stage.addChild(this.whiteBorder);

    this.pausePanel = new createjs.Bitmap(PreloadGame.queue.getResult("pause-panel"));
    this.pausePanel.scaleY = (MainGame.GameHeight - MainGame.GameHeight/4)/this.pausePanel.image.height/2;
    this.pausePanel.scaleX = this.pausePanel.scaleY;

    var widthPanel:number = this.pausePanel.image.width * this.pausePanel.scaleX;
    var heightPanel:number = this.pausePanel.image.height * this.pausePanel.scaleY;


    this.pausePanel.x = (MainGame.GameWidth - widthPanel)/2;
    this.pausePanel.y = (MainGame.GameHeight - heightPanel)/2;

    this.mainGame.stage.addChild(this.pausePanel);

    this.continueImage = new createjs.Bitmap(PreloadGame.queue.getResult("continue"));
    this.continueImage.scaleX = this.pausePanel.scaleX;
    this.continueImage.scaleY = this.continueImage.scaleX;

    var heightContinue:number = this.continueImage.image.height*this.continueImage.scaleY;


    this.continueImage.x = this.pausePanel.x + widthPanel/10;
    this.continueImage.y = this.pausePanel.y + heightPanel - heightContinue - heightPanel/10;
    this.mainGame.stage.addChild(this.continueImage);

    this.homeImage = new createjs.Bitmap(PreloadGame.queue.getResult("home"));
    this.homeImage.scaleX = this.continueImage.scaleX;
    this.homeImage.scaleY = this.homeImage.scaleX;

    var heightHome:number = this.homeImage.image.height * this.homeImage.scaleY;
    var widthHome:number = this.homeImage.image.width * this.homeImage.scaleX;
    this.homeImage.y = this.pausePanel.y + heightPanel - heightHome - heightPanel/10;
    this.homeImage.x = widthPanel + this.pausePanel.x - widthHome - widthPanel/10;
    this.mainGame.stage.addChild(this.homeImage);

    this.continueImage.addEventListener("click",()=>this.clickContinue());
    this.homeImage.addEventListener("click",()=>this.clickHome());
  }

  public clickContinue()
  {
    this.DestroyPauseScreen();
    this.mainGame.handleResume();
    this.CallGameUi();
  }

  public clickHome()
  {
    window.location.href = MainGame.LogOutUrl;
  }

  public startGame()
  {
    this.DestroyMainMenu();
    this.mainGame.StartPlayGame();
  }

  public DestroyMainMenu():void
  {
    this.mainButton.removeEventListener("click",()=>this.startGame());
    this.mainButton.removeChild(this.mainImage);
    this.stage.removeChild(this.mainButton);
    this.stage.removeChild(this.logo2Image);
  }

  public DestroyPauseScreen():void
  {
    this.continueImage.removeEventListener("click",()=>this.clickContinue());
    this.homeImage.removeEventListener("click",()=>this.clickHome());
    this.mainGame.stage.removeChild(this.homeImage);
    this.mainGame.stage.removeChild(this.pausePanel);
    this.mainGame.stage.removeChild(this.whiteBorder);
    this.mainGame.stage.removeChild(this.continueImage);
  }
}
