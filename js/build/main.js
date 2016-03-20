var MainGame = (function () {
    function MainGame() {
        this.backUrl = "asset/card/cardBack_blue2.png";
        this.margin = 5;
        this.id = 0;
        this.stage = new createjs.Stage("game");
        this.mainScreen = new MainMenu();
    }
    ;
    MainGame.prototype.init = function () {
        var _this = this;
        MainGame.gameOverScreen = new GameOverScreen();
        console.log("hello");
        MainGame.STAGE = this.stage;
        this.mainScreen.callMainMenu(this.stage);
        this.mainScreen.mainButton.addEventListener("click", function () { return _this.initGame(_this); });
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.stage);
    };
    MainGame.prototype.initGame = function (main) {
        MainGame.gameTimers = new GameTimer();
        MainGame.allContainer = new createjs.MovieClip();
        createjs.Ticker.addEventListener("tick", main.handleUpdate);
        MainGame.gameTimers.init(main.stage, MainGame.allContainer);
        main.generateCard();
        main.mainScreen.destroyThis();
    };
    MainGame.GameOver = function () {
        for (var i = 0; i < MainGame.arrCard.length; i++) {
            MainGame.arrCard[i].Destroy();
        }
        createjs.Ticker.removeAllEventListeners("tick");
        createjs.Ticker.addEventListener("tick", MainGame.STAGE);
        MainGame.gameOverScreen.ShowGameOver(MainGame.allContainer);
    };
    MainGame.prototype.handleUpdate = function (event) {
        MainGame.timers += event.delta / 1000;
        MainGame.sessionTimer += event.delta / 1000;
        MainGame.scaleFactor = MainGame.sessionTimer / MainGame.longSession;
        MainGame.gameTimers.update(MainGame.scaleFactor);
        if (MainGame.scaleFactor > 1) {
            MainGame.GameOver();
        }
        if (MainGame.timers > MainGame.longIdle) {
            if (MainGame.firstId != 0) {
                MainGame.firstCard.swapToFace(MainGame.firstCard);
                MainGame.firstId = 0;
            }
            if (MainGame.secondId != 0) {
                MainGame.secondCard.swapToFace(MainGame.secondCard);
                MainGame.secondId = 0;
            }
            MainGame.timers = 0;
        }
    };
    MainGame.prototype.generateCard = function () {
        for (var i = 0; i < MainGame.width; i++) {
            for (var j = 0; j < MainGame.height; j++) {
                this.id++;
                MainGame.totalCard++;
                console.log(this.id);
                var c = new Card();
                c.init(this.stage, MainGame.allContainer, i, j, this.margin, this.id);
                MainGame.arrCard.push(c);
            }
        }
        this.stage.addChild(MainGame.allContainer);
        this.stage.update();
        MainGame.allContainer.x = MainGame.GameWidth / 2 - MainGame.GameWidth / 5;
        MainGame.allContainer.y = MainGame.GameHeight / 8;
        MainGame.arrCard = this.shuffleArray(MainGame.arrCard);
        this.reArrangeAll();
    };
    MainGame.prototype.reArrangeAll = function () {
        var index = 0;
        for (var i = 0; i < MainGame.width; i++) {
            for (var j = 0; j < MainGame.height; j++) {
                MainGame.arrCard[index].reposition(i, j);
                index++;
            }
        }
    };
    MainGame.prototype.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
    MainGame.firstId = 0;
    MainGame.secondId = 0;
    MainGame.GameWidth = 800;
    MainGame.GameHeight = 600;
    MainGame.timers = 0;
    MainGame.longIdle = 1;
    MainGame.totalCard = 0;
    MainGame.sessionTimer = 0;
    MainGame.longSession = 20;
    MainGame.globalScale = .75;
    MainGame.arrCard = new Array();
    MainGame.width = 4;
    MainGame.height = 4;
    return MainGame;
}());
var GameOverScreen = (function () {
    function GameOverScreen() {
        this.bgUrl = "asset/final/Border.png";
        this.GameOverScreen = function () {
        };
    }
    GameOverScreen.prototype.ShowGameOver = function (container) {
        this.BgGameOver = new createjs.Bitmap(this.bgUrl);
        this.BgGameOver.scaleX = 0.75;
        this.BgGameOver.scaleY = 0.75;
        this.BgGameOver.x = -10;
        container.addChild(this.BgGameOver);
    };
    return GameOverScreen;
}());
var MainMenu = (function () {
    function MainMenu() {
        this.MainMenu = function () {
        };
    }
    MainMenu.prototype.callMainMenu = function (stage) {
        this.stage = stage;
        this.mainImage = new createjs.Bitmap("asset/final/MAIN.png");
        this.mainButton = new createjs.MovieClip();
        this.mainButton.addChild(this.mainImage);
        this.mainButton.scaleX = 0.75;
        this.mainButton.scaleY = 0.75;
        this.stage.addChild(this.mainButton);
        this.mainButton.x = MainGame.GameWidth - MainGame.GameWidth / 4;
        this.mainButton.y = MainGame.GameHeight / 2;
        this.logoImage = new createjs.Bitmap("asset/final/Tao Kae Noi.png");
        this.logoImage.scaleX = MainGame.globalScale;
        this.logoImage.scaleY = MainGame.globalScale;
        this.logoImage.x = MainGame.GameWidth / 20;
        this.logoImage.y = MainGame.GameHeight / 20;
        this.stage.addChild(this.logoImage);
        this.logo2Image = new createjs.Bitmap("asset/final/Title.png");
        this.logo2Image.scaleX = MainGame.globalScale;
        this.logo2Image.scaleY = MainGame.globalScale;
        this.logo2Image.x = MainGame.GameWidth / 5;
        this.logo2Image.y = MainGame.GameHeight / 5;
        this.stage.addChild(this.logo2Image);
    };
    MainMenu.prototype.destroyThis = function () {
        this.mainButton.removeAllEventListeners("click");
        this.mainButton.removeChild(this.mainImage);
        this.stage.removeChild(this.mainButton);
        this.stage.removeChild(this.logo2Image);
    };
    return MainMenu;
}());
var GameTimer = (function () {
    function GameTimer() {
        this.imageUrl = "asset/final/Time.png";
        this.containerUrl = "asset/final/Time Container.png";
        this.initScale = 2;
        this.GameTimer = function () {
        };
    }
    GameTimer.prototype.init = function (stage, gameContainer) {
        this.initScale = 0.5;
        this.stage = stage;
        this.gameContainer = gameContainer;
        this.timerContainerImage = new createjs.Bitmap(this.containerUrl);
        this.gameContainer.addChild(this.timerContainerImage);
        this.timerContainerImage.scaleX = 0.5;
        this.timerContainerImage.scaleY = 0.5;
        this.timerContainerImage.x = 40;
        this.timerImage = new createjs.Bitmap(this.imageUrl);
        this.gameContainer.addChild(this.timerImage);
        this.timerImage.scaleX = 0.5;
        this.timerImage.scaleY = 0.5;
        this.timerImage.x = 93;
        this.timerImage.y = 5;
    };
    GameTimer.prototype.update = function (scaleFactor) {
        this.timerImage.scaleX = scaleFactor * this.initScale;
    };
    return GameTimer;
}());
var Card = (function () {
    function Card() {
        this.baseImageUrl = "asset/final/";
        this.backImageUrl = "";
        this.face = 0;
        this.InitScaleX = 0.6;
        this.width = 175;
        this.height = 175;
        this.Card = function () {
        };
    }
    Card.prototype.init = function (stage, container, i, j, margin, id) {
        var _this = this;
        this.cardContainer = new createjs.MovieClip();
        this.thisStage = stage;
        this.container = container;
        this.id = ((id) % (MainGame.width * MainGame.height / 2) + 1);
        this.frontUrl = this.baseImageUrl + this.id + ".png";
        this.backImageUrl = this.baseImageUrl + "bcak.png";
        this.backImage = new createjs.Bitmap(this.backImageUrl);
        this.frontImage = new createjs.Bitmap(this.frontUrl);
        this.backImage.image.onload = function () { return _this.updateStage(_this.backImage); };
        this.frontImage.image.onload = function () { return _this.updateStage(_this.frontImage); };
        this.margin = margin;
        this.cardContainer.id = this.id;
        this.cardContainer.scaleX = this.InitScaleX;
        this.cardContainer.scaleY = this.InitScaleX;
        this.cardContainer.addEventListener("click", function () { return _this.cardClick(_this.cardContainer, _this); });
        this.cardContainer.addChild(this.frontImage);
        this.cardContainer.addChild(this.backImage);
        this.container.addChild(this.cardContainer);
    };
    Card.prototype.reposition = function (i, j) {
        this.cardContainer.x = i * ((this.width * this.cardContainer.scaleX) + this.margin) + this.width / 2;
        this.cardContainer.y = j * ((this.height * this.cardContainer.scaleY) + this.margin) + this.height / 2;
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
        MainGame.timers = 0;
        if (MainGame.firstId == 0) {
            MainGame.firstId = masterCard.id;
            MainGame.firstCard = masterCard;
            masterCard.swapToFace(masterCard);
        }
        else if (MainGame.secondId == 0) {
            if (MainGame.firstCard == masterCard) {
                masterCard.swapToFace(masterCard);
                MainGame.firstId = 0;
                MainGame.secondId = 0;
                return;
            }
            MainGame.secondId = masterCard.id;
            MainGame.secondCard = masterCard;
            masterCard.swapToFace(masterCard);
            if (MainGame.firstId == MainGame.secondId) {
                MainGame.firstCard.cardContainer.removeAllEventListeners("click");
                MainGame.secondCard.cardContainer.removeAllEventListeners("click");
                MainGame.firstCard.cardContainer.visible = false;
                MainGame.secondCard.cardContainer.visible = false;
                MainGame.firstId = 0;
                MainGame.secondId = 0;
                MainGame.totalCard--;
                MainGame.totalCard--;
                if (MainGame.totalCard == 0) {
                    MainGame.GameOver();
                }
            }
        }
        else if (MainGame.secondId != 0) {
            MainGame.firstCard.swapToFace(MainGame.firstCard);
            MainGame.secondCard.swapToFace(MainGame.secondCard);
            MainGame.firstId = 0;
            MainGame.secondId = 0;
            this.cardClick(null, masterCard);
        }
    };
    Card.prototype.swapToFace = function (target) {
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
            createjs.Tween.get(target.cardContainer).to({ scaleX: target.InitScaleX }, 100);
        }
    };
    Card.prototype.Destroy = function () {
        this.cardContainer.removeAllEventListeners("click");
        this.cardContainer.removeChild(this.frontImage);
        this.cardContainer.removeChild(this.backImage);
        this.container.removeChild(this.cardContainer);
    };
    return Card;
}());
function init() {
    var canvas = document.getElementById("game");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    var mainGame = new MainGame();
    MainGame.GameWidth = canvas.width;
    MainGame.GameHeight = canvas.height;
    mainGame.init();
}
//# sourceMappingURL=main.js.map