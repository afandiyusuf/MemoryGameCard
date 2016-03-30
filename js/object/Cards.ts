class Card
{
  public id:number;
  private baseImageUrl:string = "../asset/final/";
  public backImageUrl:string = "";
  private face:number = 0;

  public frontUrl:string;
  private backImage:createjs.Bitmap;
  private frontImage:createjs.Bitmap;
  private container:createjs.MovieClip;
  public cardContainer:createjs.MovieClip;
  private thisStage:createjs.Stage;
  private InitScaleX:number = 0.6;
  public margin:number;

  private mainGame:MainGame;
  private waitTime:number = 1000;
  public trueWidth:number;
  public picked:boolean;
  public Card = function()
  {

  }

  constructor(mainGame:MainGame)
  {
    this.mainGame = mainGame;
  }

  public init(stage:createjs.Stage,container:createjs.MovieClip,i:number,j:number,margin:number,id:number):void
  {

    this.cardContainer = new createjs.MovieClip();
    this.thisStage = stage;
    this.container = container;
    this.id = ((id)%(MainGame.width*MainGame.height/2)+1);
    this.frontUrl = this.baseImageUrl+this.id+".png";
    this.backImageUrl = this.baseImageUrl+"bcak.png";
    this.picked = false;
    this.backImage = new createjs.Bitmap(PreloadGame.queue.getResult("card_back"));
    this.frontImage = new createjs.Bitmap(PreloadGame.queue.getResult("card"+this.id));

    this.updateStage(this.backImage);
    this.updateStage(this.frontImage);

    this.backImage.image.onload = ():void =>this.updateStage(this.backImage);
    this.frontImage.image.onload = ():void => this.updateStage(this.frontImage);



    this.cardContainer.id = this.id;
    this.InitScaleX = MainGame.GameHeight/5.5/this.frontImage.image.height;
    this.cardContainer.scaleY = this.InitScaleX;
    this.cardContainer.scaleX = this.cardContainer.scaleY;

    this.trueWidth = this.backImage.image.width * this.InitScaleX;
    this.margin = this.trueWidth/25;

     this.cardContainer.addEventListener("click",():void=>this.cardClick(this.cardContainer,this));

    this.cardContainer.addChild(this.frontImage);
    this.cardContainer.addChild(this.backImage);
    this.container.addChild(this.cardContainer);
  }

  public reposition(i:number,j:number):void
  {
    this.cardContainer.x = i*((this.backImage.image.width * this.cardContainer.scaleX)+this.margin) + this.backImage.image.width/2 * this.InitScaleX;
    this.cardContainer.y = j*((this.backImage.image.height * this.cardContainer.scaleY)+this.margin) + this.backImage.image.height /2 * this.InitScaleX;
  }

  private updateStage(target:createjs.Bitmap):void
  {
    this.thisStage.update();
    target.regX = target.image.width/2;
    target.regY = target.image.height/2;
    this.thisStage.update();
  }

  private cardClick(e:any=null,masterCard:Card=null):void
  {
    if(masterCard.picked)
      return;

    this.mainGame.idleCard = 0;
    //swap first card
    if(MainGame.firstId == 0){
        MainGame.firstId = masterCard.id;
        MainGame.firstCard = masterCard;
        masterCard.swapToFace(masterCard);
    }
    //swap first swap secondCard
    else if(MainGame.secondId == 0){

        //user click same card as firstcard
        if(MainGame.firstCard == masterCard)
        {
          masterCard.swapToFace(masterCard);
          MainGame.firstId = 0;
          MainGame.secondId = 0;
          return;
        }


        MainGame.secondId = masterCard.id;
        MainGame.secondCard = masterCard
        masterCard.swapToFace(masterCard);

        //CardMatch!!
        if(MainGame.firstId == MainGame.secondId)
        {

          MainGame.firstCard.picked = true;
          MainGame.secondCard.picked = true;
          MainGame.firstId = 0;
          MainGame.secondId = 0;

          createjs.Tween.get(MainGame.firstCard.cardContainer).wait(masterCard.waitTime).to({visible:false},0).call(completeTween,[masterCard],this);
          createjs.Tween.get(MainGame.secondCard.cardContainer).wait(masterCard.waitTime).to({visible:false},0).call(completeTween,[masterCard],this);

          function completeTween(target:Card)
          {
            MainGame.totalCard--;
            if(MainGame.totalCard == 0)
              target.mainGame.handleWin();
          }

        }
    }
    else
    {
      //backCard;
      MainGame.firstCard.swapToFace(MainGame.firstCard);
      MainGame.secondCard.swapToFace(MainGame.secondCard);
      MainGame.firstId = 0;
      MainGame.secondId = 0;
      this.cardClick(null,masterCard);
    }
  }

  public swapToFace(target:Card):void
  {
      createjs.Tween.get(target.cardContainer).to({scaleX:0},100).call(completeTween,[target],this);

      function completeTween(target:Card)
      {

        if(target.face == 0)
        {
          target.face = 1;
          target.backImage.visible = false;
          target.frontImage.visible = true;
        }else{
          target.face = 0;
          target.frontImage.visible = false;
          target.backImage.visible = true;
        }
        createjs.Tween.get(target.cardContainer).to({scaleX:target.InitScaleX},100);
      }
  }

  public Destroy()
  {
    this.cardContainer.removeEventListener("click",():void=>this.cardClick(this.cardContainer,this));
    this.cardContainer.removeChild(this.frontImage);
    this.cardContainer.removeChild(this.backImage);
    this.container.removeChild(this.cardContainer);
  }
}
