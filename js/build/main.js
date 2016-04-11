var MainGame = (function () {
    function MainGame() {
        this.idleCard = 0;
        this.longIdleCard = 3;
        this.urlBG = new Array("../asset/match boss/BG 1.png", "../asset/match boss/BG 2.png", "../asset/match boss/BG 3.png", "../asset/match boss/BG 1.png", "../asset/match boss/BG 2.png");
        this.timers = 0;
        this.arrCard = new Array();
        this.dummyCard = new Array();
        this.backUrl = "../asset/Card/Back.png";
        this.margin = 5;
        this.id = 0;
        this.stage = new createjs.Stage("game");
        this.arrScore = new Array();
        this.totalScore = 0;
        this.isPause = true;
    }
    ;
    MainGame.prototype.init = function () {
        var _this = this;
        this.ui = new UI(this);
        this.GotoMainMenu();
        this.gameTimer = new GameTimer();
        createjs.Ticker.addEventListener("tick", function () { return _this.handleTick(_this); });
        createjs.Ticker.addEventListener("tick", this.deltaTimeCatcher);
    };
    MainGame.prototype.GotoMainMenu = function () {
        this.arrScore = new Array();
        createjs.Ticker.framerate = 60;
        this.timers = 0;
        this.ui.callMainMenu(this.stage);
        this.stage.update();
        MainGame.thisLevel = 0;
        $.ajax({
            type: "POST",
            url: $("#base_api_url").html() + "/game/creatSession",
            data: {
                access_token: $("#access_token").html()
            },
            success: function (data) {
                if (data.status_code == 200) {
                    MainGame.gt = data.data.game_token;
                    console.log(MainGame.gt);
                }
                else {
                    window.location.href = MainGame.LogOutUrl;
                }
            },
            error: function (data) {
            },
            dataType: "JSON"
        });
    };
    MainGame.prototype.StartPlayGame = function () {
        this.gameTimer.init(this);
        this.timers = 0;
        this.idleCard = 0;
        MainGame.firstId = 0;
        MainGame.secondId = 0;
        this.id = 0;
        this.arrCard = new Array();
        this.LongGameTimer = MainGame.ArrTimer[MainGame.thisLevel];
        console.log(this.LongGameTimer);
        MainGame.totalCard = 0;
        this.allContainer = new createjs.MovieClip();
        this.stage.addChild(this.allContainer);
        this.generateCard();
        this.ui.CallGameUi();
        this.isPause = false;
    };
    MainGame.prototype.NextGame = function () {
        this.gameTimer.Destroy();
        this.DestroyAllDummyCard();
        this.DestroyAllCard();
        this.arrScore.push(Math.round(this.LongGameTimer - this.timers));
        var arrscore = this.arrScore;
        var level = MainGame.thisLevel;
        $.ajax({
            type: "POST",
            url: $("#base_api_url").html() + "/game/postScorePerLevel",
            data: {
                access_token: $("#access_token").html(),
                game_token: MainGame.gt,
                score: arrscore[level],
                level: 'level' + (level + 1)
            },
            success: function (data) {
                if (data.status_code == 200) {
                }
                else {
                    window.location.href = MainGame.LogOutUrl;
                }
            },
            error: function (data) {
            },
            dataType: "JSON"
        });
        MainGame.thisLevel++;
        this.ui.changeBodyBG(this.urlBG[MainGame.thisLevel]);
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
        this.generateDummyCard();
        if (MainGame.thisLevel == MainGame.ArrTimer.length - 1) {
            console.log("FINISH");
            this.arrScore.push(Math.round(this.LongGameTimer - this.timers));
            var arrscore = this.arrScore;
            var level = MainGame.thisLevel;
            $.ajax({
                type: "POST",
                url: $("#base_api_url").html() + "/game/postScorePerLevel",
                data: {
                    access_token: $("#access_token").html(),
                    game_token: MainGame.gt,
                    score: arrscore[level],
                    level: 'level' + (level + 1)
                },
                success: function (data) {
                    if (data.status_code == 200) {
                        console.log(data);
                    }
                    else {
                        window.location.href = MainGame.LogOutUrl;
                    }
                },
                error: function (data) {
                    console.log("error");
                },
                dataType: "JSON"
            });
            this.totalScore = 0;
            for (var i = 0; i < this.arrScore.length; i++) {
                this.totalScore += this.arrScore[i];
            }
            this.ui.callWinALL();
        }
        else {
            this.ui.DestroyGameUI();
            this.ui.callWinScreen();
        }
    };
    MainGame.prototype.handleTick = function (master) {
        if (master.isPause)
            return;
        master.stage.update();
        master.timers += MainGame.deltaTime / 1000;
        master.idleCard += MainGame.deltaTime / 1000;
        this.gameTimer.update((master.LongGameTimer - master.timers) / master.LongGameTimer);
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
    MainGame.prototype.DestroyAllDummyCard = function () {
        for (var i = 0; i < this.dummyCard.length; i++) {
            this.dummyCard[0].Destroy();
        }
        this.dummyCard = new Array();
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
        this.allContainer.y = (MainGame.GameHeight - this.containerWidth) / 2 + MainGame.GameHeight / 30;
    };
    MainGame.prototype.generateDummyCard = function () {
        console.log("dummy");
        this.allContainer = new createjs.MovieClip();
        this.stage.addChild(this.allContainer);
        for (var i = 0; i < MainGame.width; i++) {
            for (var j = 0; j < MainGame.height; j++) {
                var c = new Card(this);
                c.init(this.stage, this.allContainer, i, j, this.margin, 0);
                this.dummyCard.push(c);
            }
        }
        var index = 0;
        for (var i = 0; i < MainGame.width; i++) {
            for (var j = 0; j < MainGame.height; j++) {
                this.dummyCard[index].reposition(i, j);
                index++;
            }
        }
        this.containerWidth = (this.arrCard[0].trueWidth + this.arrCard[0].margin) * MainGame.width;
        this.allContainer.x = (MainGame.GameWidth - this.containerWidth) / 2;
        this.allContainer.y = (MainGame.GameHeight - this.containerWidth) / 2 + MainGame.GameHeight / 30;
        this.stage.update();
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
    MainGame.LogOutUrl = "http://www.siboskecil.com/php/logout.php";
    MainGame.leaderboardUrl = "http://www.siboskecil.com/page/leaderboard.php";
    MainGame.thisLevel = 0;
    MainGame.ArrTimer = new Array(240, 240, 180, 180, 120);
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
;
var PreloadGame = (function () {
    function PreloadGame() {
    }
    PreloadGame.prototype.init = function () {
        var _this = this;
        var queue = new createjs.LoadQueue(true);
        queue.on("fileload", this.handleFileLoad, this);
        queue.on("complete", function () { return _this.handleComplete(null, _this.mainGame); }, this);
        queue.on('progress', this.onProgress);
        queue.loadFile({ id: "card1", src: "../asset/Card/Card 1.png" });
        queue.loadFile({ id: "card2", src: "../asset/Card/Card 2.png" });
        queue.loadFile({ id: "card3", src: "../asset/Card/Card 3.png" });
        queue.loadFile({ id: "card4", src: "../asset/Card/Card 4.png" });
        queue.loadFile({ id: "card5", src: "../asset/Card/Card 5.png" });
        queue.loadFile({ id: "card6", src: "../asset/Card/Card 6.png" });
        queue.loadFile({ id: "card7", src: "../asset/Card/Card 7.png" });
        queue.loadFile({ id: "card8", src: "../asset/Card/Card 8.png" });
        queue.loadFile({ id: "card9", src: "../asset/Card/Card 9.png" });
        queue.loadFile({ id: "card10", src: "../asset/Card/Card 10.png" });
        queue.loadFile({ id: "card11", src: "../asset/Card/Card 11.png" });
        queue.loadFile({ id: "card12", src: "../asset/Card/Card 12.png" });
        queue.loadFile({ id: "card13", src: "../asset/Card/Card 13.png" });
        queue.loadFile({ id: "card14", src: "../asset/Card/Card 14.png" });
        queue.loadFile({ id: "card15", src: "../asset/Card/Card 15.png" });
        queue.loadFile({ id: "card16", src: "../asset/Card/Card 16.png" });
        queue.loadFile({ id: "lvl1", src: "../asset/1.png" });
        queue.loadFile({ id: "lvl2", src: "../asset/2.png" });
        queue.loadFile({ id: "lvl3", src: "../asset/3.png" });
        queue.loadFile({ id: "lvl4", src: "../asset/4.png" });
        queue.loadFile({ id: "lvl5", src: "../asset/5.png" });
        queue.loadFile({ id: "card_back", src: "../asset/final/bcak.png" });
        queue.loadFile({ id: "bg", src: "../asset/final/BG.jpg" });
        queue.loadFile({ id: "border", src: "../asset/final/Border.png" });
        queue.loadFile({ id: "keluar-button", src: "../asset/final/keluar.png" });
        queue.loadFile({ id: "bg2", src: "../asset/match boss/BG 2.png" });
        queue.loadFile({ id: "main-lagi-button", src: "../asset/final/MAIN LAGI.PNG" });
        queue.loadFile({ id: "main-button", src: "../asset/final/MAIN.png" });
        queue.loadFile({ id: "corner-logo", src: "../asset/final/Tao Kae Noi.png" });
        queue.loadFile({ id: "title-image", src: "../asset/final/Title.png" });
        queue.loadFile({ id: "white-border", src: "../asset/final/Border 10px10.png" });
        queue.loadFile({ id: "bg3", src: "../asset/match boss/BG 3.png" });
        queue.loadFile({ id: "pause", src: "../asset/match boss/Pause Button.png" });
        queue.loadFile({ id: "pause-panel", src: "../asset/match boss/Pause.png" });
        queue.loadFile({ id: "continue", src: "../asset/match boss/Continue.png" });
        queue.loadFile({ id: "home", src: "../asset/match boss/Home.png" });
        queue.loadFile({ id: "failed-panel", src: "../asset/Card/Failed.png" });
        queue.loadFile({ id: "main-lagi2", src: "../asset/match boss/Main Lagi 2.png" });
        queue.loadFile({ id: "lanjut", src: "../asset/match boss/Lanjut.png" });
        queue.loadFile({ id: "win-lvl", src: "../asset/Card/Succed.png" });
        queue.loadFile({ id: "time", src: "../asset/final/Time.png" });
        queue.loadFile({ id: "time-container", src: "../asset/final/Time Container.png" });
        queue.loadFile({ id: "bg1", src: "../asset/match boss/BG 1.png" });
        queue.loadFile({ id: "fb-share", src: "../asset/match boss/FB Share.png" });
        queue.load();
        PreloadGame.queue = queue;
    };
    PreloadGame.prototype.handleFileLoad = function (event) {
    };
    PreloadGame.prototype.handleComplete = function (event, maingame) {
        maingame.init();
    };
    PreloadGame.prototype.onProgress = function (event) {
        var progress = Math.round(event.loaded * 100);
        var $state = $('#state'), $progress = $('#progress'), $progressbar = $('#progressbar .bar');
        $progress.text(progress + '%');
        $progressbar.css("display", "none");
        if (progress == 100) {
            $progress.css("display", "none");
            $progressbar.css("display", "none");
        }
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
    UI.prototype.changeBodyBG = function (string2) {
        console.log("change bg" + string2);
        $(document.body).css("background-image", "url('" + string2 + "')");
    };
    UI.prototype.callWinALL = function () {
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
        this.lanjut = new createjs.Bitmap(PreloadGame.queue.getResult("lanjut"));
        this.lanjut.scaleX = this.winPanel.scaleX * 1.5;
        this.lanjut.scaleY = this.winPanel.scaleX * 1.5;
        var heightContinue = this.lanjut.image.height * this.lanjut.scaleY;
        this.lanjut.x = this.winPanel.x + widthPanel / 2 - (this.lanjut.image.width * this.lanjut.scaleX * 0.5);
        this.lanjut.y = this.winPanel.y + heightPanel - heightContinue - heightPanel / 10;
        this.mainGame.stage.addChild(this.lanjut);
        this.lanjut.addEventListener("click", function () { return _this.gotoLeaderboard(); });
        this.mainGame.stage.update();
    };
    UI.prototype.callLvlImage = function (lvl) {
        this.lvlImage = new createjs.Bitmap(PreloadGame.queue.getResult("lvl" + lvl));
        this.lvlImage.scaleX = 0.7;
        this.lvlImage.scaleY = 0.7;
        this.lvlImage.y = MainGame.GameHeight - (this.lvlImage.image.height * this.lvlImage.scaleX) - MainGame.GameHeight / 10;
        this.lvlImage.x = MainGame.GameWidth - (this.lvlImage.image.width * this.lvlImage.scaleX) - MainGame.GameWidth / 10;
        this.mainGame.stage.addChild(this.lvlImage);
    };
    UI.prototype.destroyLvlImage = function () {
        this.mainGame.stage.removeChild(this.lvlImage);
    };
    UI.prototype.gotoLeaderboard = function () {
        $.ajax({
            type: "POST",
            url: $("#base_api_url").html() + "/game/postTotalScore",
            data: {
                access_token: $("#access_token").html(),
                game_token: MainGame.gt,
                score: this.mainGame.totalScore
            },
            success: function (data) {
                if (data.status_code == 200) {
                    window.location.href = "http://www.siboskecil.com";
                }
                else {
                    window.location.href = MainGame.LogOutUrl;
                }
            },
            error: function (data) {
                console.log("error");
            },
            dataType: "JSON"
        });
    };
    UI.prototype.DestroyWinAll = function () {
        var _this = this;
        this.lanjut.removeEventListener("click", function () { return _this.gotoLeaderboard(); });
        this.mainGame.stage.removeChild(this.whiteBorder);
        this.mainGame.stage.removeChild(this.winPanel);
        this.mainGame.stage.removeChild(this.lanjut);
        this.mainGame.stage.update();
    };
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
        this.mainGame.stage.update();
        createjs.Tween.get(null)
            .wait(3000)
            .to(null)
            .call(function () { return _this.LanjutGame(); });
    };
    UI.prototype.ShareFB = function () {
        FB.ui({
            method: 'share',
            href: 'http://www.siboskecil.com',
        }, function (response) {
            if (response && !response.error_message) {
            }
            else {
            }
        });
    };
    UI.prototype.DestroyWinScreen = function () {
        this.mainGame.stage.removeChild(this.whiteBorder);
        this.mainGame.stage.removeChild(this.winPanel);
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
        this.logoImage.regY = -this.logoImage.image.height * 0.5;
        this.logo2Image = new createjs.Bitmap(PreloadGame.queue.getResult("title-image"));
        this.logo2Image.scaleY = (MainGame.GameHeight - (MainGame.GameHeight / 12)) / this.logo2Image.image.width;
        this.logo2Image.scaleX = this.logo2Image.scaleY;
        this.stage.addChild(this.logo2Image);
        this.logoImage.x = MainGame.GameWidth / 20;
        this.logoImage.y = MainGame.GameHeight / 10;
        this.logo2Image.x = this.logoImage.x + (this.logoImage.image.width * this.logoImage.scaleX) + 20;
        this.logo2Image.y = MainGame.GameHeight / 2 - (this.logo2Image.image.height / 2 * this.logo2Image.scaleY);
        var widthlogo2 = this.logo2Image.image.width * this.logo2Image.scaleX;
        this.mainButton.x = this.logo2Image.x + widthlogo2 + (MainGame.GameWidth - (widthlogo2 + this.logo2Image.x)) / 2 - (this.mainImage.image.width * this.mainButton.scaleX * 0.5);
        this.mainButton.y = (this.logo2Image.image.height * this.logo2Image.scaleY) / 2 + this.logo2Image.y;
        console.log((this.logo2Image.image.height * this.logo2Image.scaleY) / 2 + this.logo2Image.y);
        this.mainButton.addEventListener("click", function () { return _this.startGame(); });
    };
    UI.prototype.CallGameUi = function () {
        var _this = this;
        this.callLvlImage(MainGame.thisLevel + 1);
        this.pauseImage = new createjs.Bitmap(PreloadGame.queue.getResult("pause"));
        this.pauseImage.scaleX = MainGame.GameWidth / 25 / this.pauseImage.image.width;
        this.pauseImage.scaleY = this.pauseImage.scaleX;
        this.pauseImage.x = MainGame.GameWidth - (this.pauseImage.image.width * this.pauseImage.scaleX) - (MainGame.GameWidth / 25);
        this.pauseImage.y = MainGame.GameHeight / 10;
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
        this.destroyLvlImage();
        this.mainGame.stage.update();
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
        this.mainGame.gameTimer.Destroy();
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
    GameTimer.prototype.init = function (mainGame) {
        this.mainGame = mainGame;
        this.timerContainerClip = new createjs.MovieClip();
        this.stage = mainGame.stage;
        this.gameContainer = mainGame.stage;
        this.timerContainerImage = new createjs.Bitmap(PreloadGame.queue.getResult("time-container"));
        this.initScale = MainGame.GameWidth / 2 / this.timerContainerImage.image.width;
        this.timerContainerImage.scaleX = this.initScale;
        this.timerContainerImage.scaleY = this.timerContainerImage.scaleX;
        this.timerContainerImage.x = MainGame.GameWidth / 2 - (this.timerContainerImage.image.width * this.timerContainerImage.scaleX * 0.5);
        this.timerContainerImage.y = MainGame.GameHeight / 10;
        this.timerImage = new createjs.Bitmap(PreloadGame.queue.getResult("time"));
        this.timerImage.scaleX = this.timerContainerImage.scaleX;
        this.timerImage.scaleY = this.timerContainerImage.scaleX;
        this.timerImage.x = this.timerContainerImage.x + (this.timerContainerImage.image.width * this.timerContainerImage.scaleX / 8);
        this.timerImage.y = this.timerContainerImage.y + (this.timerContainerImage.image.height / 2 * this.timerContainerImage.scaleY) - (this.timerImage.image.height * this.timerImage.scaleY * 0.4);
        this.timerContainerClip.addChild(this.timerContainerImage);
        this.timerContainerClip.addChild(this.timerImage);
        this.gameContainer.addChild(this.timerContainerClip);
    };
    GameTimer.prototype.update = function (scaleFactor) {
        if (this.timerImage == null || this.timerImage == undefined)
            return;
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
        this.waitTime = 1000;
        this.Card = function () {
        };
        this.mainGame = mainGame;
    }
    Card.prototype.init = function (stage, container, i, j, margin, id) {
        var _this = this;
        this.cardContainer = new createjs.MovieClip();
        this.thisStage = stage;
        this.container = container;
        var isNew = Math.random();
        this.id = ((id) % (MainGame.width * MainGame.height / 2) + 1);
        var arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
        var arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
        console.log(this.id);
        if (MainGame.totalCard > (MainGame.width * MainGame.height) / 2) {
            console.log("cek here");
            var isSama = false;
            for (var i = 0; i < this.mainGame.arrCard.length; i++) {
                if (this.mainGame.arrCard[i].cardFaceName == "card" + this.id) {
                    isSama = true;
                }
            }
            if (isSama == true) {
                this.cardFaceName = "card" + this.id;
            }
            else {
                this.cardFaceName = "card" + (this.id + 8);
            }
        }
        else {
            if (isNew > 0.5) {
                this.cardFaceName = "card" + (this.id + 8);
            }
            else {
                this.cardFaceName = "card" + this.id;
            }
        }
        this.frontUrl = this.baseImageUrl + this.id + ".png";
        this.backImageUrl = this.baseImageUrl + "bcak.png";
        this.picked = false;
        this.backImage = new createjs.Bitmap(PreloadGame.queue.getResult("card_back"));
        console.log(this.cardFaceName);
        this.frontImage = new createjs.Bitmap(PreloadGame.queue.getResult(this.cardFaceName));
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
        if (masterCard.picked)
            return;
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
                MainGame.firstCard.picked = true;
                MainGame.secondCard.picked = true;
                MainGame.firstId = 0;
                MainGame.secondId = 0;
                createjs.Tween.get(MainGame.firstCard.cardContainer).wait(masterCard.waitTime).to({ visible: false }, 0).call(completeTween, [masterCard], this);
                createjs.Tween.get(MainGame.secondCard.cardContainer).wait(masterCard.waitTime).to({ visible: false }, 0).call(completeTween, [masterCard], this);
                function completeTween(target) {
                    MainGame.totalCard--;
                    if (MainGame.totalCard == 0)
                        target.mainGame.handleWin();
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
    function handleFileLoad(event) {
    }
    function handleComplete(event) {
    }
}
//# sourceMappingURL=main.js.map
