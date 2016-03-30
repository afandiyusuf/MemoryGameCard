var MainGame = (function () {
    function MainGame() {
        this.idleCard = 0;
        this.longIdleCard = 3;
        this.timers = 0;
        this.arrCard = new Array();
        this.backUrl = "../asset/Card/Back.png";
        this.margin = 5;
        this.id = 0;
        this.stage = new createjs.Stage("game");
        this.isPause = false;
    }
    ;
    MainGame.prototype.init = function () {
        var _this = this;
        this.ui = new UI(this);
        this.GotoMainMenu();
        createjs.Ticker.addEventListener("tick", function () { return _this.handleTick(_this); });
        createjs.Ticker.addEventListener("tick", this.deltaTimeCatcher);
    };
    MainGame.prototype.GotoMainMenu = function () {
        createjs.Ticker.framerate = 60;
        this.timers = 0;
        this.ui.callMainMenu(this.stage);
        this.isPause = false;
        this.stage.update();
        MainGame.thisLevel = 0;
    };
    MainGame.prototype.StartPlayGame = function () {
        this.timers = 0;
        this.idleCard = 0;
        MainGame.firstId = 0;
        MainGame.secondId = 0;
        this.id = 0;
        this.arrCard = new Array();
        this.LongGameTimer = MainGame.ArrTimer[MainGame.thisLevel];
        MainGame.totalCard = 0;
        this.allContainer = new createjs.MovieClip();
        this.stage.addChild(this.allContainer);
        this.generateCard();
        this.ui.CallGameUi();
        this.isPause = false;
    };
    MainGame.prototype.NextGame = function () {
        MainGame.thisLevel++;
        this.StartPlayGame();
    };
    MainGame.prototype.handlePause = function () {
        this.isPause = true;
    };
    MainGame.prototype.handleResume = function () {
        this.isPause = false;
    };
    MainGame.prototype.handleWin = function () {
        this.isPause = true;
        this.DestroyThis();
        this.ui.callWinScreen();
    };
    MainGame.prototype.handleTick = function (master) {
        if (master.isPause)
            return;
        master.stage.update();
        master.timers += MainGame.deltaTime / 1000;
        master.idleCard += MainGame.deltaTime / 1000;
        console.log(master.LongGameTimer - master.timers);
        if (master.idleCard > master.longIdleCard) {
            if (MainGame.firstId != 0) {
                MainGame.firstCard.swapToFace(MainGame.firstCard);
                MainGame.firstId = 0;
            }
            if (MainGame.secondId != 0) {
                MainGame.secondCard.swapToFace(MainGame.secondCard);
                MainGame.secondId = 0;
            }
            master.idleCard = 0;
        }
        if (master.timers > master.LongGameTimer) {
            master.DestroyThis();
            master.ui.DestroyGameUI();
            master.ui.CallFailedScreen();
            master.isPause = true;
        }
    };
    MainGame.prototype.pauseGame = function () {
    };
    MainGame.prototype.deltaTimeCatcher = function (e) {
        MainGame.deltaTime = e.delta;
    };
    MainGame.prototype.WIN_GAME = function () {
        this.DestroyThis();
    };
    MainGame.prototype.LOSE_GAME = function () {
    };
    MainGame.prototype.DestroyThis = function () {
        this.stage.removeChild(this.allContainer);
        this.DestroyAllCard();
    };
    MainGame.prototype.DestroyAllCard = function () {
        for (var i = 0; i < this.arrCard.length; i++) {
            this.arrCard[0].Destroy();
        }
        this.stage.removeChild(this.allContainer);
    };
    MainGame.prototype.generateCard = function () {
        for (var i = 0; i < MainGame.width; i++) {
            for (var j = 0; j < MainGame.height; j++) {
                this.id++;
                MainGame.totalCard++;
                var c = new Card(this);
                c.init(this.stage, this.allContainer, i, j, this.margin, this.id);
                this.arrCard.push(c);
            }
        }
        this.stage.update();
        this.arrCard = this.shuffleArray(this.arrCard);
        this.reArrangeAll();
        this.containerWidth = (this.arrCard[0].trueWidth + this.arrCard[0].margin) * MainGame.width;
        console.log(this.arrCard[0].trueWidth);
        console.log(this.containerWidth);
        this.allContainer.x = (MainGame.GameWidth - this.containerWidth) / 2;
        this.allContainer.y = (MainGame.GameHeight - this.containerWidth) / 2 + MainGame.GameHeight / 10;
    };
    MainGame.prototype.reArrangeAll = function () {
        var index = 0;
        for (var i = 0; i < MainGame.width; i++) {
            for (var j = 0; j < MainGame.height; j++) {
                this.arrCard[index].reposition(i, j);
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
    MainGame.LogOutUrl = "http://localhost:90/MemoryGameCard/php/logout.php";
    MainGame.thisLevel = 1;
    MainGame.ArrTimer = new Array(5, 10, 15);
    MainGame.firstId = 0;
    MainGame.secondId = 0;
    MainGame.longIdle = 1;
    MainGame.totalCard = 0;
    MainGame.sessionTimer = 0;
    MainGame.longSession = 60;
    MainGame.globalScale = .5;
    MainGame.deltaTime = 0;
    MainGame.width = 2;
    MainGame.height = 2;
    return MainGame;
}());
var PreloadGame = (function () {
    function PreloadGame() {
    }
    PreloadGame.prototype.init = function () {
        var _this = this;
        var queue = new createjs.LoadQueue(true);
        queue.on("fileload", this.handleFileLoad, this);
        queue.on("complete", function () { return _this.handleComplete(null, _this.mainGame); }, this);
        queue.loadFile({ id: "card1", src: "../asset/final/1.png" });
        queue.loadFile({ id: "card2", src: "../asset/final/2.png" });
        queue.loadFile({ id: "card3", src: "../asset/final/3.png" });
        queue.loadFile({ id: "card4", src: "../asset/final/4.png" });
        queue.loadFile({ id: "card5", src: "../asset/final/5.png" });
        queue.loadFile({ id: "card6", src: "../asset/final/6.png" });
        queue.loadFile({ id: "card7", src: "../asset/final/7.png" });
        queue.loadFile({ id: "card8", src: "../asset/final/8.png" });
        queue.loadFile({ id: "card_back", src: "../asset/final/bcak.png" });
        queue.loadFile({ id: "bg", src: "../asset/final/BG.jpg" });
        queue.loadFile({ id: "border", src: "../asset/final/border.png" });
        queue.loadFile({ id: "keluar-button", src: "../asset/final/keluar.png" });
        queue.loadFile({ id: "main-lagi-button", src: "../asset/final/MAIN LAGI.png" });
        queue.loadFile({ id: "main-button", src: "../asset/final/MAIN.png" });
        queue.loadFile({ id: "corner-logo", src: "../asset/final/Tao Kae Noi.png" });
        queue.loadFile({ id: "title-image", src: "../asset/final/Title.png" });
        queue.loadFile({ id: "white-border", src: "../asset/final/Border 10px10.png" });
        queue.loadFile({ id: "pause", src: "../asset/match boss/Pause Button.png" });
        queue.loadFile({ id: "pause-panel", src: "../asset/match boss/Pause.png" });
        queue.loadFile({ id: "continue", src: "../asset/match boss/continue.png" });
        queue.loadFile({ id: "home", src: "../asset/match boss/Home.png" });
        queue.loadFile({ id: "failed-panel", src: "../asset/match boss/Failed.png" });
        queue.loadFile({ id: "main-lagi2", src: "../asset/match boss/Main Lagi 2.png" });
        queue.loadFile({ id: "win-lvl", src: "../asset/match boss/Succed.png" });
        queue.load();
        PreloadGame.queue = queue;
    };
    PreloadGame.prototype.handleFileLoad = function (event) {
    };
    PreloadGame.prototype.handleComplete = function (event, maingame) {
        maingame.init();
    };
    return PreloadGame;
}());
var GameOverScreen = (function () {
    function GameOverScreen() {
        this.bgUrl = "../asset/Card/Back.png";
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
var UI = (function () {
    function UI(mainGame) {
        this.mainGame = mainGame;
    }
    UI.prototype.callWinScreen = function () {
        var _this = this;
        this.whiteBorder = new createjs.Bitmap(PreloadGame.queue.getResult("white-border"));
        this.whiteBorder.scaleX = MainGame.GameWidth / this.whiteBorder.image.width;
        this.whiteBorder.scaleY = this.whiteBorder.scaleX;
        this.mainGame.stage.addChild(this.whiteBorder);
        this.winPanel = new createjs.Bitmap(PreloadGame.queue.getResult("win-lvl"));
        this.winPanel.scaleY = (MainGame.GameHeight - MainGame.GameHeight / 4) / this.winPanel.image.height;
        this.winPanel.scaleX = this.winPanel.scaleY;
        var widthPanel = this.winPanel.image.width * this.winPanel.scaleX;
        var heightPanel = this.winPanel.image.height * this.winPanel.scaleY;
        this.winPanel.x = (MainGame.GameWidth - widthPanel) / 2;
        this.winPanel.y = (MainGame.GameHeight - heightPanel) / 2;
        this.mainGame.stage.addChild(this.winPanel);
        this.lanjut = new createjs.Bitmap(PreloadGame.queue.getResult("main-lagi2"));
        this.lanjut.scaleX = this.winPanel.scaleX;
        this.lanjut.scaleY = this.lanjut.scaleX;
        var heightContinue = this.lanjut.image.height * this.lanjut.scaleY;
        this.lanjut.x = this.winPanel.x + widthPanel / 2 - (this.lanjut.image.width * this.lanjut.scaleX * 0.5);
        this.lanjut.y = this.winPanel.y + heightPanel - heightContinue - heightPanel / 10;
        this.mainGame.stage.addChild(this.lanjut);
        this.lanjut.addEventListener("click", function () { return _this.LanjutGame(); });
        this.mainGame.stage.update();
    };
    UI.prototype.DestroyWinScreen = function () {
        var _this = this;
        this.lanjut.removeEventListener("click", function () { return _this.GotoMainMenu(); });
        this.mainGame.stage.removeChild(this.whiteBorder);
        this.mainGame.stage.removeChild(this.winPanel);
        this.mainGame.stage.removeChild(this.lanjut);
        this.mainGame.stage.update();
    };
    UI.prototype.LanjutGame = function () {
        this.DestroyWinScreen();
        this.mainGame.NextGame();
    };
    UI.prototype.callMainMenu = function (stage) {
        var _this = this;
        this.stage = stage;
        this.mainImage = new createjs.Bitmap(PreloadGame.queue.getResult("main-button"));
        this.mainButton = new createjs.MovieClip();
        this.mainButton.addChild(this.mainImage);
        this.mainButton.scaleX = MainGame.GameWidth / 6 / this.mainImage.image.width;
        this.mainButton.scaleY = this.mainButton.scaleX;
        this.stage.addChild(this.mainButton);
        this.logoImage = new createjs.Bitmap(PreloadGame.queue.getResult("corner-logo"));
        this.logoImage.scaleX = MainGame.GameWidth / 10 / this.logoImage.image.width;
        this.logoImage.scaleY = this.logoImage.scaleX;
        this.stage.addChild(this.logoImage);
        this.logo2Image = new createjs.Bitmap(PreloadGame.queue.getResult("title-image"));
        this.logo2Image.scaleY = (MainGame.GameHeight - (MainGame.GameHeight / 12)) / this.logo2Image.image.width;
        this.logo2Image.scaleX = this.logo2Image.scaleY;
        this.stage.addChild(this.logo2Image);
        this.logoImage.x = MainGame.GameWidth / 20;
        this.logoImage.y = MainGame.GameHeight / 20;
        this.logo2Image.x = this.logoImage.x + (this.logoImage.image.width * this.logoImage.scaleX) + 20;
        this.logo2Image.y = MainGame.GameHeight / 2 - (this.logo2Image.image.height / 2 * this.logo2Image.scaleY);
        var widthlogo2 = this.logo2Image.image.width * this.logo2Image.scaleX;
        this.mainButton.x = this.logo2Image.x + widthlogo2 + (MainGame.GameWidth - (widthlogo2 + this.logo2Image.x)) / 2 - (this.mainImage.image.width * this.mainButton.scaleX * 0.5);
        this.mainButton.y = (this.logo2Image.image.height * this.logo2Image.scaleY) / 2 + this.logo2Image.y;
        this.mainButton.addEventListener("click", function () { return _this.startGame(); });
    };
    UI.prototype.CallGameUi = function () {
        var _this = this;
        this.pauseImage = new createjs.Bitmap(PreloadGame.queue.getResult("pause"));
        this.pauseImage.scaleX = MainGame.GameWidth / 25 / this.pauseImage.image.width;
        this.pauseImage.scaleY = this.pauseImage.scaleX;
        this.pauseImage.x = MainGame.GameWidth - (this.pauseImage.image.width * this.pauseImage.scaleX) - (MainGame.GameWidth / 25);
        this.pauseImage.y = MainGame.GameHeight / 25;
        this.pauseButton = new createjs.MovieClip();
        this.pauseButton.addChild(this.pauseImage);
        this.mainGame.stage.addChild(this.pauseButton);
        this.pauseButton.addEventListener("click", function () { return _this.pauseGame(); });
    };
    UI.prototype.DestroyGameUI = function () {
        var _this = this;
        this.pauseButton.removeChild(this.pauseImage);
        this.mainGame.stage.removeChild(this.pauseButton);
        this.pauseButton.removeEventListener("click", function () { return _this.pauseGame(); });
    };
    UI.prototype.pauseGame = function () {
        this.DestroyGameUI();
        this.mainGame.handlePause();
        this.CallPauseScreen();
        this.mainGame.stage.update();
    };
    UI.prototype.CallFailedScreen = function () {
        var _this = this;
        this.whiteBorder = new createjs.Bitmap(PreloadGame.queue.getResult("white-border"));
        this.whiteBorder.scaleX = MainGame.GameWidth / this.whiteBorder.image.width;
        this.whiteBorder.scaleY = this.whiteBorder.scaleX;
        this.mainGame.stage.addChild(this.whiteBorder);
        this.failedPanel = new createjs.Bitmap(PreloadGame.queue.getResult("failed-panel"));
        this.failedPanel.scaleY = (MainGame.GameHeight - MainGame.GameHeight / 4) / this.failedPanel.image.height;
        this.failedPanel.scaleX = this.failedPanel.scaleY;
        var widthPanel = this.failedPanel.image.width * this.failedPanel.scaleX;
        var heightPanel = this.failedPanel.image.height * this.failedPanel.scaleY;
        this.failedPanel.x = (MainGame.GameWidth - widthPanel) / 2;
        this.failedPanel.y = (MainGame.GameHeight - heightPanel) / 2;
        this.mainGame.stage.addChild(this.failedPanel);
        this.mainlagi2 = new createjs.Bitmap(PreloadGame.queue.getResult("main-lagi2"));
        this.mainlagi2.scaleX = this.failedPanel.scaleX;
        this.mainlagi2.scaleY = this.mainlagi2.scaleX;
        var heightContinue = this.mainlagi2.image.height * this.mainlagi2.scaleY;
        this.mainlagi2.x = this.failedPanel.x + widthPanel / 2 - (this.mainlagi2.image.width * this.mainlagi2.scaleX * 0.5);
        this.mainlagi2.y = this.failedPanel.y + heightPanel - heightContinue - heightPanel / 10;
        this.mainGame.stage.addChild(this.mainlagi2);
        this.mainlagi2.addEventListener("click", function () { return _this.GotoMainMenu(); });
        this.mainGame.stage.update();
    };
    UI.prototype.DestroyFailScreen = function () {
        var _this = this;
        this.mainGame.stage.removeChild(this.mainlagi2);
        this.mainGame.stage.removeChild(this.failedPanel);
        this.mainGame.stage.removeChild(this.whiteBorder);
        this.mainlagi2.removeEventListener("click", function () { return _this.GotoMainMenu(); });
    };
    UI.prototype.GotoMainMenu = function () {
        this.DestroyFailScreen();
        this.mainGame.stage.update();
        this.mainGame.GotoMainMenu();
    };
    UI.prototype.CallPauseScreen = function () {
        var _this = this;
        this.whiteBorder = new createjs.Bitmap(PreloadGame.queue.getResult("white-border"));
        this.whiteBorder.scaleX = MainGame.GameWidth / this.whiteBorder.image.width;
        this.whiteBorder.scaleY = this.whiteBorder.scaleX;
        this.mainGame.stage.addChild(this.whiteBorder);
        this.pausePanel = new createjs.Bitmap(PreloadGame.queue.getResult("pause-panel"));
        this.pausePanel.scaleY = (MainGame.GameHeight - MainGame.GameHeight / 4) / this.pausePanel.image.height;
        this.pausePanel.scaleX = this.pausePanel.scaleY;
        var widthPanel = this.pausePanel.image.width * this.pausePanel.scaleX;
        var heightPanel = this.pausePanel.image.height * this.pausePanel.scaleY;
        this.pausePanel.x = (MainGame.GameWidth - widthPanel) / 2;
        this.pausePanel.y = (MainGame.GameHeight - heightPanel) / 2;
        this.mainGame.stage.addChild(this.pausePanel);
        this.continueImage = new createjs.Bitmap(PreloadGame.queue.getResult("continue"));
        this.continueImage.scaleX = this.pausePanel.scaleX;
        this.continueImage.scaleY = this.continueImage.scaleX;
        var heightContinue = this.continueImage.image.height * this.continueImage.scaleY;
        this.continueImage.x = this.pausePanel.x + widthPanel / 10;
        this.continueImage.y = this.pausePanel.y + heightPanel - heightContinue - heightPanel / 10;
        this.mainGame.stage.addChild(this.continueImage);
        this.homeImage = new createjs.Bitmap(PreloadGame.queue.getResult("home"));
        this.homeImage.scaleX = this.continueImage.scaleX;
        this.homeImage.scaleY = this.homeImage.scaleX;
        var heightHome = this.homeImage.image.height * this.homeImage.scaleY;
        var widthHome = this.homeImage.image.width * this.homeImage.scaleX;
        this.homeImage.y = this.pausePanel.y + heightPanel - heightHome - heightPanel / 10;
        this.homeImage.x = widthPanel + this.pausePanel.x - widthHome - widthPanel / 10;
        this.mainGame.stage.addChild(this.homeImage);
        this.continueImage.addEventListener("click", function () { return _this.clickContinue(); });
        this.homeImage.addEventListener("click", function () { return _this.clickHome(); });
    };
    UI.prototype.clickContinue = function () {
        this.DestroyPauseScreen();
        this.mainGame.handleResume();
        this.CallGameUi();
    };
    UI.prototype.clickHome = function () {
        window.location.href = MainGame.LogOutUrl;
    };
    UI.prototype.startGame = function () {
        this.DestroyMainMenu();
        this.mainGame.StartPlayGame();
    };
    UI.prototype.DestroyMainMenu = function () {
        var _this = this;
        this.mainButton.removeEventListener("click", function () { return _this.startGame(); });
        this.mainButton.removeChild(this.mainImage);
        this.stage.removeChild(this.mainButton);
        this.stage.removeChild(this.logo2Image);
    };
    UI.prototype.DestroyPauseScreen = function () {
        var _this = this;
        this.continueImage.removeEventListener("click", function () { return _this.clickContinue(); });
        this.homeImage.removeEventListener("click", function () { return _this.clickHome(); });
        this.mainGame.stage.removeChild(this.homeImage);
        this.mainGame.stage.removeChild(this.pausePanel);
        this.mainGame.stage.removeChild(this.whiteBorder);
        this.mainGame.stage.removeChild(this.continueImage);
    };
    return UI;
}());
var GameTimer = (function () {
    function GameTimer() {
        this.imageUrl = "../asset/final/Time.png";
        this.containerUrl = "../asset/final/Time Container.png";
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
    function Card(mainGame) {
        this.baseImageUrl = "../asset/final/";
        this.backImageUrl = "";
        this.face = 0;
        this.InitScaleX = 0.6;
        this.Card = function () {
        };
        this.mainGame = mainGame;
    }
    Card.prototype.init = function (stage, container, i, j, margin, id) {
        var _this = this;
        this.cardContainer = new createjs.MovieClip();
        this.thisStage = stage;
        this.container = container;
        this.id = ((id) % (MainGame.width * MainGame.height / 2) + 1);
        this.frontUrl = this.baseImageUrl + this.id + ".png";
        this.backImageUrl = this.baseImageUrl + "bcak.png";
        this.backImage = new createjs.Bitmap(PreloadGame.queue.getResult("card_back"));
        this.frontImage = new createjs.Bitmap(PreloadGame.queue.getResult("card" + this.id));
        this.updateStage(this.backImage);
        this.updateStage(this.frontImage);
        this.backImage.image.onload = function () { return _this.updateStage(_this.backImage); };
        this.frontImage.image.onload = function () { return _this.updateStage(_this.frontImage); };
        this.cardContainer.id = this.id;
        this.InitScaleX = MainGame.GameHeight / 5.5 / this.frontImage.image.height;
        this.cardContainer.scaleY = this.InitScaleX;
        this.cardContainer.scaleX = this.cardContainer.scaleY;
        this.trueWidth = this.backImage.image.width * this.InitScaleX;
        this.margin = this.trueWidth / 25;
        this.cardContainer.addEventListener("click", function () { return _this.cardClick(_this.cardContainer, _this); });
        this.cardContainer.addChild(this.frontImage);
        this.cardContainer.addChild(this.backImage);
        this.container.addChild(this.cardContainer);
    };
    Card.prototype.reposition = function (i, j) {
        this.cardContainer.x = i * ((this.backImage.image.width * this.cardContainer.scaleX) + this.margin) + this.backImage.image.width / 2 * this.InitScaleX;
        this.cardContainer.y = j * ((this.backImage.image.height * this.cardContainer.scaleY) + this.margin) + this.backImage.image.height / 2 * this.InitScaleX;
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
        this.mainGame.idleCard = 0;
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
                MainGame.firstCard.cardContainer.visible = false;
                MainGame.secondCard.cardContainer.visible = false;
                MainGame.firstId = 0;
                MainGame.secondId = 0;
                MainGame.totalCard--;
                MainGame.totalCard--;
                this.Destroy();
                if (MainGame.totalCard == 0) {
                    this.mainGame.handleWin();
                }
            }
        }
        else {
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
        var _this = this;
        this.cardContainer.removeEventListener("click", function () { return _this.cardClick(_this.cardContainer, _this); });
        this.cardContainer.removeChild(this.frontImage);
        this.cardContainer.removeChild(this.backImage);
        this.container.removeChild(this.cardContainer);
    };
    return Card;
}());
function init() {
    window.scrollTo(0, 1);
    var canvas = document.getElementById("game");
    if (document.body.clientWidth > document.body.clientHeight) {
        if (document.body.clientWidth > 800) {
            if (document.body.clientHeight < 450) {
                canvas.height = document.body.clientHeight;
                canvas.width = canvas.height / 9 * 16;
            }
            else {
                if (document.body.clientHeight < document.body.clientWidth / 16 * 9) {
                    canvas.height = document.body.clientHeight - (document.body.clientHeight / 15);
                    canvas.width = canvas.height / 9 * 16;
                }
                else {
                    canvas.width = document.body.clientWidth - (document.body.clientWidth / 15);
                    canvas.height = canvas.width / 16 * 9;
                }
            }
        }
        else {
            canvas.width = document.body.offsetWidth;
            canvas.height = canvas.width / 16 * 9;
        }
        var mainGame = new MainGame();
        MainGame.GameWidth = canvas.width;
        MainGame.GameHeight = canvas.height;
        var preload = new PreloadGame();
        preload.mainGame = mainGame;
        preload.init();
    }
    else {
        window.alert("please refresh and use landscape mode");
    }
    function handleFileLoad(event) {
    }
    function handleComplete(event) {
    }
}
//# sourceMappingURL=main.js.map