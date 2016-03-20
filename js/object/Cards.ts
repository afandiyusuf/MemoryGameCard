class Card
{
  public id:number;
  private baseImageUrl:string = "asset/card/";
  public backImageUrl:string = "";
  public frontUrl:string;
  private backImage:createjs.Bitmap;
  private frontImage:createjs.Bitmap;
  private container:createjs.MovieClip;
  private thisStage:createjs.Stage;
  private InitScaleX:number = .5;

  public Card = function()
  {

  }

  public init(stage:createjs.Stage,container:createjs.MovieClip,i:number,j:number,margin:number):void
  {
    this.thisStage = stage;
    this.container = container;
    this.id = i+j;
    this.frontUrl = this.baseImageUrl+this.id+".png";

    this.backImage = new createjs.Bitmap(this.backImageUrl);
    this.frontImage = new createjs.Bitmap(this.frontUrl);

    console.log(i+j);
    this.container.addChild(this.backImage);
    this.container.addChild(this.frontImage);
    this.backImage.image.onload = ():void =>this.updateStage(this.backImage);
    this.container.id = this.id;
    this.container.scaleX = this.InitScaleX;
    this.container.scaleY = this.InitScaleX;
    this.container.x = i*((140 * this.backImage.scaleX)+margin) + 140/2;
    this.container.y = j*((190 * this.backImage.scaleY)+margin) + 190/2;
    this.container.addEventListener("click",this.cardClick);

  }

  private updateStage(target:createjs.Bitmap):void
  {
    this.thisStage.update();
    target.regX = target.image.width/2;
    target.regY = target.image.height/2;
    this.thisStage.update();
  }

  private cardClick(e:MouseEvent):void
  {
    var b:createjs.MovieClip = e.currentTarget as createjs.MovieClip;
    console.log(b.id);
    console.log("hello guys");
    Card.swapToFace(b);
  }
  public static swapToFace(target:createjs.DisplayObject):void
  {
      //scaleTO0
      createjs.Tween.get(target).to({scaleX:0},100).call(completeTween,[target]);

      function completeTween(target:createjs.Bitmap)
      {

        //this.target.scaleX = 0;
        createjs.Tween.get(target).to({scaleX:0.5},100);
      }

    //  createjs.Tween.get(target).wait(100).to({scaleX:0.5},100);

  }
}
