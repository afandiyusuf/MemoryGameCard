class Card
{
  public id:number;
  private baseImageUrl:string = "asset/card/";
  public backImageUrl:string = "";
  private face:number = 0;

  public frontUrl:string;
  private backImage:createjs.Bitmap;
  private frontImage:createjs.Bitmap;
  private container:createjs.MovieClip;
  private cardContainer:createjs.MovieClip;
  private thisStage:createjs.Stage;
  private InitScaleX:number = .5;

  public Card = function()
  {

  }

  public init(stage:createjs.Stage,container:createjs.MovieClip,i:number,j:number,margin:number):void
  {
    this.cardContainer = new createjs.MovieClip();
    this.thisStage = stage;
    this.container = container;
    this.id = i+j+1;
    this.frontUrl = this.baseImageUrl+"cardClubs"+this.id+".png";

    this.backImage = new createjs.Bitmap(this.backImageUrl);
    this.frontImage = new createjs.Bitmap(this.frontUrl);

    this.backImage.image.onload = ():void =>this.updateStage(this.backImage);
    this.frontImage.image.onload = ():void => this.updateStage(this.frontImage);

    console.log(i+j);
    //this.container.addChild(this.backImage);


    this.cardContainer.id = this.id;
    this.cardContainer.scaleX = this.InitScaleX;
    this.cardContainer.scaleY = this.InitScaleX;
    this.cardContainer.x = i*((140 * this.cardContainer.scaleX)+margin) + 140/2;
    this.cardContainer.y = j*((190 * this.cardContainer.scaleY)+margin) + 190/2;

     this.cardContainer.addEventListener("click",():void=>this.cardClick(this.cardContainer,this));

    this.cardContainer.addChild(this.frontImage);
    this.cardContainer.addChild(this.backImage);
    this.container.addChild(this.cardContainer);
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
    var b:createjs.MovieClip = e;
    console.log(masterCard);
    console.log("hello guys");
    masterCard.swapToFace(masterCard);
  }
  public swapToFace(target:Card):void
  {
    console.log(target.cardContainer);
      //scaleTO0
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
        createjs.Tween.get(target.cardContainer).to({scaleX:0.5},100);
      }

    //  createjs.Tween.get(target).wait(100).to({scaleX:0.5},100);

  }
}
