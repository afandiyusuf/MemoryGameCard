var MainGame = (function () {
    function MainGame() {
        this.backUrl = "asset/Card/Back.png";
        this.margin = 5;
        this.id = 0;
        this.stage = new createjs.Stage("game");
    }
    ;
    MainGame.prototype.init = function () {
        var _this = this;
        MainGame.globMain = this;
        MainGame.gameOverScreen = new GameOverScreen();
        MainGame.mainScreen = new MainMenu();
        console.log("hello");
        MainGame.STAGE = this.stage;
        MainGame.mainScreen.callMainMenu(this.stage);
        MainGame.mainScreen.mainButton.addEventListener("click", function () { return _this.initGame(_this); });
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.stage);
        createjs.Ticker.addEventListener("tick", this.updateLayout);
    };
    MainGame.prototype.cleanGame = function () {
        this.stage.removeChild(MainGame.allContainer);
        MainGame.gameTimers.Destroy();
    };
    MainGame.prototype.updateLayout = function () {
        MainGame.mainScreen.update();
    };
    MainGame.prototype.initGame = function (main) {
        MainGame.gameTimers = new GameTimer();
        MainGame.allContainer = new createjs.MovieClip();
        MainGame.arrCard = new Array();
        MainGame.totalCard = 0;
        MainGame.globMain.id = 0;
        MainGame.timers = 0;
        MainGame.sessionTimer = 0;
        createjs.Ticker.addEventListener("tick", main.handleUpdate);
        MainGame.gameTimers.init(main.stage, MainGame.allContainer);
        main.generateCard();
        MainGame.mainScreen.destroyThis();
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
        MainGame.allContainer.y = 10;
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
    MainGame.longSession = 60;
    MainGame.globalScale = .5;
    MainGame.arrCard = new Array();
    MainGame.width = 4;
    MainGame.height = 4;
    return MainGame;
}());
var GameOverScreen = (function () {
    function GameOverScreen() {
        this.bgUrl = "asset/Card/Back.png";
        this.GameOverScreen = function () {
        };
    }
    GameOverScreen.prototype.ShowGameOver = function (container) {
        var _this = this;
        this.container = container;
        this.BgGameOver = new createjs.Bitmap(this.bgUrl);
        this.BgGameOver.scaleX = 0.6;
        this.BgGameOver.scaleY = this.BgGameOver.scaleX;
        this.BgGameOver.x = -10;
        container.addChild(this.BgGameOver);
        this.RestartButton = new createjs.Bitmap("asset/final/MAIN LAGI.PNG");
        this.RestartButton.scaleX = 0.6;
        this.RestartButton.scaleY = 0.6;
        this.RestartButton.addEventListener("click", function () { return _this.RestartGame(_this); });
        this.QuitButton = new createjs.Bitmap("asset/final/keluar.png");
        this.QuitButton.scaleX = 0.6;
        this.QuitButton.scaleY = 0.6;
        this.QuitButton.y = 200;
        this.QuitButton.x = 150;
        this.QuitButton.addEventListener("click", function () { return _this.QuitGame(_this); });
        container.addChild(this.QuitButton);
    };
    GameOverScreen.prototype.RestartGame = function (gs) {
        window.location.reload();
    };
    GameOverScreen.prototype.QuitGame = function (gs) {
        window.location.reload();
    };
    GameOverScreen.prototype.DestroyThis = function (gs) {
        gs.container.removeAllEventListeners("click");
        gs.container.removeChild(this.BgGameOver);
        gs.container.removeChild(this.RestartButton);
        gs.container.removeChild(this.QuitButton);
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
        this.mainImage = new createjs.Bitmap("../asset/final/MAIN.png");
        this.mainButton = new createjs.MovieClip();
        this.mainButton.addChild(this.mainImage);
        this.mainButton.scaleX = 0.75;
        this.mainButton.scaleY = 0.75;
        this.stage.addChild(this.mainButton);
        this.logoImage = new createjs.Bitmap("../asset/final/Tao Kae Noi.png");
        this.logoImage.scaleX = MainGame.globalScale;
        this.logoImage.scaleY = MainGame.globalScale;
        this.stage.addChild(this.logoImage);
        this.logo2Image = new createjs.Bitmap("../asset/final/Title.png");
        this.logo2Image.scaleX = MainGame.globalScale;
        this.logo2Image.scaleY = MainGame.globalScale;
        this.stage.addChild(this.logo2Image);
    };
    MainMenu.prototype.update = function () {
        this.logoImage.x = MainGame.GameWidth / 20;
        this.logoImage.y = MainGame.GameHeight / 20;
        this.logo2Image.x = this.logoImage.x + (this.logoImage.image.width * this.logoImage.scaleX) + 20;
        this.logo2Image.y = MainGame.GameHeight / 5;
        this.mainButton.x = this.logo2Image.x + (this.logo2Image.image.width * this.logo2Image.scaleX) + 40;
        this.mainButton.y = (this.logo2Image.image.height * this.logo2Image.scaleY) / 2 + this.logo2Image.y;
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
        this.timerWidth = 824;
        this.GameTimer = function () {
        };
    }
    GameTimer.prototype.init = function (stage, gameContainer) {
        this.timerContainerClip = new createjs.MovieClip();
        this.initScale = ((MainGame.GameHeight / 6 * 4) + (10 * 4)) / 828;
        this.stage = stage;
        this.gameContainer = gameContainer;
        this.timerContainerImage = new createjs.Bitmap(this.containerUrl);
        this.timerContainerImage.scaleX = this.initScale;
        this.timerContainerImage.scaleY = this.initScale;
        this.timerContainerImage.x = 40;
        this.timerImage = new createjs.Bitmap(this.imageUrl);
        this.timerImage.scaleX = this.initScale;
        this.timerImage.scaleY = this.timerImage.scaleX;
        this.timerImage.x = 80;
        this.timerImage.y = 5;
        this.timerContainerClip.addChild(this.timerContainerImage);
        this.timerContainerClip.addChild(this.timerImage);
        this.gameContainer.addChild(this.timerContainerClip);
        this.timerContainerClip.x = 0;
        this.timerContainerClip.y = 20;
    };
    GameTimer.prototype.update = function (scaleFactor) {
        this.timerImage.scaleX = scaleFactor * this.initScale;
    };
    GameTimer.prototype.Destroy = function () {
        this.timerContainerClip.removeChild(this.timerContainerImage);
        this.timerContainerClip.removeChild(this.timerImage);
        this.gameContainer.removeChild(this.timerContainerClip);
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
        this.InitScaleX = MainGame.GameHeight / 6 / this.width;
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
    if (document.body.clientWidth > document.body.clientHeight) {
        if (document.body.clientWidth > 950) {
            canvas.width = 950;
            canvas.height = 450;
        }
        else {
            canvas.width = document.body.clientWidth;
            canvas.height = canvas.width / 19 * 9;
        }
        var mainGame = new MainGame();
        MainGame.GameWidth = canvas.width;
        MainGame.GameHeight = canvas.height;
        mainGame.init();
    }
    else {
        window.alert("please refresh and use landscape mode");
    }
}
//# sourceMappingURL=main.js.map