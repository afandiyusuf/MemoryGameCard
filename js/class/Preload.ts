class PreloadGame
{
  public static queue;

  public mainGame:MainGame;

  public init():void
  {
    var queue = new createjs.LoadQueue(true);
  	queue.on("fileload", this.handleFileLoad, this);
  	queue.on("complete", ()=>this.handleComplete(null,this.mainGame), this);
    queue.on('progress',     this.onProgress);
  	queue.loadFile({id:"card1", src:"../asset/final/1.png"});
  	queue.loadFile({id:"card2", src:"../asset/final/2.png"});
  	queue.loadFile({id:"card3", src:"../asset/final/3.png"});
  	queue.loadFile({id:"card4", src:"../asset/final/4.png"});
  	queue.loadFile({id:"card5", src:"../asset/final/5.png"});
  	queue.loadFile({id:"card6", src:"../asset/final/6.png"});
  	queue.loadFile({id:"card7", src:"../asset/final/7.png"});
  	queue.loadFile({id:"card8", src:"../asset/final/8.png"});
  	queue.loadFile({id:"card_back", src:"../asset/final/bcak.png"});
  	queue.loadFile({id:"bg", src:"../asset/final/BG.jpg"});
  	queue.loadFile({id:"border", src:"../asset/final/Border.png"});
  	queue.loadFile({id:"keluar-button", src:"../asset/final/keluar.png"});
    queue.loadFile({id:"bg2",src:"../asset/match boss/BG 2.png"});
  	queue.loadFile({id:"main-lagi-button", src:"../asset/final/MAIN LAGI.PNG"});
    queue.loadFile({id:"main-button", src:"../asset/final/MAIN.png"});
    queue.loadFile({id:"corner-logo", src:"../asset/final/Tao Kae Noi.png"});
    queue.loadFile({id:"title-image", src:"../asset/final/Title.png"});
    queue.loadFile({id:"white-border",src:"../asset/final/Border 10px10.png"});
    queue.loadFile({id:"bg3",src:"../asset/match boss/BG 3.png"});
    queue.loadFile({id:"pause",src:"../asset/match boss/Pause Button.png"});
    queue.loadFile({id:"pause-panel",src:"../asset/match boss/Pause.png"});
    queue.loadFile({id:"continue",src:"../asset/match boss/Continue.png"});
    queue.loadFile({id:"home",src:"../asset/match boss/Home.png"});
    queue.loadFile({id:"failed-panel",src:"../asset/match boss/Failed.png"});
    queue.loadFile({id:"main-lagi2",src:"../asset/match boss/Main Lagi 2.png"});
    queue.loadFile({id:"win-lvl",src:"../asset/match boss/Succed.png"});
    queue.loadFile({id:"time",src:"../asset/final/Time.png"});
    queue.loadFile({id:"time-container",src:"../asset/final/Time Container.png"});
    queue.loadFile({id:"bg1",src:"../asset/match boss/BG 1.png"});


  	queue.load();

    PreloadGame.queue = queue;

  }

  public handleFileLoad(event:any){

  }
  public handleComplete(event:any,maingame:MainGame){
    maingame.init();
  }
  public  onProgress(event) {

    var progress = Math.round(event.loaded * 100);

    var $state       = $('#state'),
    $progress    = $('#progress'),
    $progressbar = $('#progressbar .bar');

    $progress.text(progress + '%');
    $progressbar.css("display","none");
    if(progress == 100)
    {
      $progress.css("display","none");
      $progressbar.css("display","none");
    }

  }

}
