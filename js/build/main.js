var MainGame = (function () {
    function MainGame() {
        this.arrCard = new Array();
        this.backUrl = "asset/card/cardBack_blue2.png";
        this.width = 5;
        this.height = 4;
        this.margin = 5;
        this.stage = new createjs.Stage("demoCanvas");
        this.updateStage = function () {
            console.log("stage updated");
            this.stage.update();
        };
    }
    MainGame.prototype.init = function () {
        this.generateCard();
    };
    MainGame.prototype.generateCard = function () {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var c = new Card();
                c.backImage = this.backUrl;
                c.init(this.stage, i, j, this.margin);
            }
        }
    };
    return MainGame;
}());
var Card = (function () {
    function Card() {
        this.backImage = "";
        this.Card = function () {
        };
    }
    Card.prototype.init = function (stage, i, j, margin) {
        var _this = this;
        this.stage = stage;
        var bmp = new createjs.Bitmap(this.backImage);
        this.id = i + j;
        console.log(i + j);
        this.stage.addChild(bmp);
        bmp.image.onload = function () { return _this.updateStage(); };
        bmp.image.id = "" + this.id;
        bmp.scaleX = 0.5;
        bmp.scaleY = 0.5;
        bmp.x = i * ((140 * bmp.scaleX) + margin);
        bmp.addEventListener("click", this.cardClick);
        bmp.y = j * ((190 * bmp.scaleY) + margin);
    };
    Card.prototype.updateStage = function () {
        this.stage.update();
    };
    Card.prototype.cardClick = function (e) {
        var b = e.currentTarget;
        console.log(b.image.id);
        console.log("hello guys");
    };
    return Card;
}());
function init() {
    var main = new MainGame();
    main.init();
}
//# sourceMappingURL=main.js.map