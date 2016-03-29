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
  private margin:number;
  private width:number = 175;
  private height:number = 175;

  public Card = function()
  {

  }

  public init(stage:createjs.Stage,container:createjs.MovieClip,i:number,j:number,margin:number,id:number):void
  {
    this.InitScaleX = MainGame.GameHeight/6/this.width;
    this.cardContainer = new createjs.MovieClip();
    this.thisStage = stage;
    this.container = container;
    this.id = ((id)%(MainGame.width*MainGame.height/2)+1);
    this.frontUrl = this.baseImageUrl+this.id+".png";
    this.backImageUrl = this.baseImageUrl+"bcak.png";

    this.backImage = new createjs.Bitmap(PreloadGame.queue.getResult("card_back"));
    this.frontImage = new createjs.Bitmap(PreloadGame.queue.getResult("card"+this.id));

    this.updateStage(this.backImage);
    this.updateStage(this.frontImage);

    this.backImage.image.onload = ():void =>this.updateStage(this.backImage);
    this.frontImage.image.onload = ():void => this.updateStage(this.frontImage);
    this.margin = margin;

    this.cardContainer.id = this.id;

    this.cardContainer.scaleY = MainGame.GameHeight/5/this.frontImage.image.height;
    this.cardContainer.scaleX = this.cardContainer.scaleY;

     this.cardContainer.addEventListener("click",():void=>this.cardClick(this.cardContainer,this));

    this.cardContainer.addChild(this.frontImage);
    this.cardContainer.addChild(this.backImage);
    this.container.addChild(this.cardContainer);
  }

  public reposition(i:number,j:number):void
  {
    this.cardContainer.x = i*((this.width * this.cardContainer.scaleX)+this.margin) + this.width/2;
    this.cardContainer.y = j*((this.height * this.cardContainer.scaleY)+this.margin) + this.height/2;
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
    MainGame.timers = 0;

    if(MainGame.firstId == 0){
        MainGame.firstId = masterCard.id;
        MainGame.firstCard = masterCard;
        masterCard.swapToFace(masterCard);
    }

    else if(MainGame.secondId == 0){
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

        if(MainGame.firstId == MainGame.secondId)
        {
          MainGame.firstCard.cardContainer.visible = false;
          MainGame.secondCard.cardContainer.visible = false;
          MainGame.firstId = 0;
          MainGame.secondId = 0;
          MainGame.totalCard--;
          MainGame.totalCard--;
          this.Destroy();

          if(MainGame.totalCard == 0)
          {

          }
        }
    }
    else if(MainGame.secondId != 0)
    {
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
