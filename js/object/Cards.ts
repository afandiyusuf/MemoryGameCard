class Card
{
  public id:number;
  public backImage:string = "";
  private container:createjs.MovieClip;
  private thisStage:createjs.Stage;
  public Card = function()
  {

  }

  public init(stage:createjs.Stage,container:createjs.MovieClip,i:number,j:number,margin:number):void
  {
    this.thisStage = stage;
    this.container = container;
    var bmp = new createjs.Bitmap(this.backImage);
    this.id = i+j;
    console.log(i+j);
    this.container.addChild(bmp);


    bmp.image.onload = ():void =>this.updateStage();
    bmp.image.id = ""+this.id;
    bmp.scaleX = 0.5;
    bmp.scaleY = 0.5;
    bmp.x = i*((140 * bmp.scaleX)+margin);
    bmp.addEventListener("click",this.cardClick);
    bmp.y = j*((190 * bmp.scaleY)+margin);

  }

  private updateStage():void
  {
    this.thisStage.update();
  }

  private cardClick(e:MouseEvent):void
  {
    var b:createjs.Bitmap = e.currentTarget as createjs.Bitmap;
    console.log(b.image.id);
    console.log("hello guys");

  }
}
