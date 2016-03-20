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
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.stage);
        this.generateCard();
    };
    MainGame.prototype.generateCard = function () {
        this.allContainer = new createjs.MovieClip();
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var c = new Card();
                c.backImage = this.backUrl;
                c.init(this.stage, this.allContainer, i, j, this.margin);
            }
        }
        this.stage.addChild(this.allContainer);
        this.stage.update();
    };
    return MainGame;
}());
var Card = (function () {
    function Card() {
        this.backImage = "";
        this.InitScaleX = .5;
        this.Card = function () {
        };
    }
    Card.prototype.init = function (stage, container, i, j, margin) {
        var _this = this;
        this.thisStage = stage;
        this.container = container;
        var bmp = new createjs.Bitmap(this.backImage);
        this.id = i + j;
        console.log(i + j);
        this.container.addChild(bmp);
        bmp.image.onload = function () { return _this.updateStage(bmp); };
        bmp.image.id = "" + this.id;
        bmp.scaleX = this.InitScaleX;
        bmp.scaleY = this.InitScaleX;
        bmp.x = i * ((140 * bmp.scaleX) + margin) + 140 / 2;
        bmp.y = j * ((190 * bmp.scaleY) + margin) + 190 / 2;
        bmp.addEventListener("click", this.cardClick);
    };
    Card.prototype.updateStage = function (target) {
        this.thisStage.update();
        target.regX = target.image.width / 2;
        target.regY = target.image.height / 2;
        this.thisStage.update();
    };
    Card.prototype.cardClick = function (e) {
        var b = e.currentTarget;
        console.log(b.image.id);
        console.log("hello guys");
        Card.swapToFace(b);
    };
    Card.swapToFace = function (target) {
        createjs.Tween.get(target).to({ scaleX: 0 }, 100).call(completeTween, [target]);
        function completeTween(target) {
            createjs.Tween.get(target).to({ scaleX: 0.5 }, 100);
        }
    };
    return Card;
}());
function init() {
    var main = new MainGame();
    main.init();
}
//# sourceMappingURL=main.js.map