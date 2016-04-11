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
  	queue.loadFile({id:"card1", src:"../asset/Card/Card 1.png"});
  	queue.loadFile({id:"card2", src:"../asset/Card/Card 2.png"});
  	queue.loadFile({id:"card3", src:"../asset/Card/Card 3.png"});
  	queue.loadFile({id:"card4", src:"../asset/Card/Card 4.png"});
  	queue.loadFile({id:"card5", src:"../asset/Card/Card 5.png"});
  	queue.loadFile({id:"card6", src:"../asset/Card/Card 6.png"});
  	queue.loadFile({id:"card7", src:"../asset/Card/Card 7.png"});
  	queue.loadFile({id:"card8", src:"../asset/Card/Card 8.png"});
    queue.loadFile({id:"card9", src:"../asset/Card/Card 9.png"});
    queue.loadFile({id:"card10", src:"../asset/Card/Card 10.png"});
    queue.loadFile({id:"card11", src:"../asset/Card/Card 11.png"});
    queue.loadFile({id:"card12", src:"../asset/Card/Card 12.png"});
    queue.loadFile({id:"card13", src:"../asset/Card/Card 13.png"});
    queue.loadFile({id:"card14", src:"../asset/Card/Card 14.png"});
    queue.loadFile({id:"card15", src:"../asset/Card/Card 15.png"});
    queue.loadFile({id:"card16", src:"../asset/Card/Card 16.png"});
    queue.loadFile({id:"lvl1", src:"../asset/1.png"});
    queue.loadFile({id:"lvl2", src:"../asset/2.png"});
    queue.loadFile({id:"lvl3", src:"../asset/3.png"});
    queue.loadFile({id:"lvl4", src:"../asset/4.png"});
    queue.loadFile({id:"lvl5", src:"../asset/5.png"});
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
    queue.loadFile({id:"failed-panel",src:"../asset/Card/Failed.png"});
    queue.loadFile({id:"main-lagi2",src:"../asset/match boss/Main Lagi 2.png"});
    queue.loadFile({id:"lanjut",src:"../asset/match boss/Lanjut.png"});
    queue.loadFile({id:"win-lvl",src:"../asset/Card/Succed.png"});
    queue.loadFile({id:"time",src:"../asset/final/Time.png"});
    queue.loadFile({id:"time-container",src:"../asset/final/Time Container.png"});
    queue.loadFile({id:"bg1",src:"../asset/match boss/BG 1.png"});
    queue.loadFile({id:"fb-share",src:"../asset/match boss/FB Share.png"});
    queue.loadFile({id:"konfirmasi-panel",src:"../asset/Card/Quit.png"});
    queue.loadFile({id:"check-leaderboard-button",src:"../asset/Card/Button Check Leaderboard.png"});
    queue.loadFile({id:"check-score-button",src:"../asset/Card/Button Check skor.png"});
    queue.loadFile({id:"victory-all",src:"../asset/Card/Victory end.png"});
    queue.loadFile({id:"sinar",src:"../asset/Card/sinar.png"});
    queue.loadFile({id:"score-panel",src:"../asset/Card/Wadah Score.png"});
    queue.loadFile({id:"nyawa-habis-panel",src:"../asset/Card/Out of Heart.png"});
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
