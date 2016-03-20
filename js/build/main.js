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
                c.backImageUrl = this.backUrl;
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
        this.baseImageUrl = "asset/card/";
        this.backImageUrl = "";
        this.face = 0;
        this.InitScaleX = .5;
        this.Card = function () {
        };
    }
    Card.prototype.init = function (stage, container, i, j, margin) {
        var _this = this;
        this.cardContainer = new createjs.MovieClip();
        this.thisStage = stage;
        this.container = container;
        this.id = i + j + 1;
        this.frontUrl = this.baseImageUrl + "cardClubs" + this.id + ".png";
        this.backImage = new createjs.Bitmap(this.backImageUrl);
        this.frontImage = new createjs.Bitmap(this.frontUrl);
        this.backImage.image.onload = function () { return _this.updateStage(_this.backImage); };
        this.frontImage.image.onload = function () { return _this.updateStage(_this.frontImage); };
        console.log(i + j);
        this.cardContainer.id = this.id;
        this.cardContainer.scaleX = this.InitScaleX;
        this.cardContainer.scaleY = this.InitScaleX;
        this.cardContainer.x = i * ((140 * this.cardContainer.scaleX) + margin) + 140 / 2;
        this.cardContainer.y = j * ((190 * this.cardContainer.scaleY) + margin) + 190 / 2;
        this.cardContainer.addEventListener("click", function () { return _this.cardClick(_this.cardContainer, _this); });
        this.cardContainer.addChild(this.frontImage);
        this.cardContainer.addChild(this.backImage);
        this.container.addChild(this.cardContainer);
    };
    Card.prototype.updateStage = function (target) {
        this.thisStage.update();
        target.regX = target.image.width / 2;
        target.regY = target.image.height / 2;
        this.thisStage.update();
    };
    Card.prototype.cardClick = function (e, masterCard) {
        if (e === void 0) { e = null; }
        if (masterCard === void 0) { masterCard = null; }
        var b = e;
        console.log(masterCard);
        console.log("hello guys");
        masterCard.swapToFace(masterCard);
    };
    Card.prototype.swapToFace = function (target) {
        console.log(target.cardContainer);
        createjs.Tween.get(target.cardContainer).to({ scaleX: 0 }, 100).call(completeTween, [target], this);
        function completeTween(target) {
            if (target.face == 0) {
                target.face = 1;
                target.backImage.visible = false;
                target.frontImage.visible = true;
            }
            else {
                target.face = 0;
                target.frontImage.visible = false;
                target.backImage.visible = true;
            }
            createjs.Tween.get(target.cardContainer).to({ scaleX: 0.5 }, 100);
        }
    };
    return Card;
}());
function init() {
    var main = new MainGame();
    main.init();
}
//# sourceMappingURL=main.js.map