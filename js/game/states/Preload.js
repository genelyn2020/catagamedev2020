GameState.Preload = function(){
    this.ready = false;
};

GameState.Preload.prototype = {
    preload: function(){

        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'LOGO');
        this.splash.anchor.setTo(0.6);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 110, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('lives', 'assets/images/lives.png');
        this.load.image('rocks', 'assets/images/pusongbato.png');

    
        this.load.spritesheet('player', 'assets/images/Cloude.png', 100, 100);
        this.load.spritesheet('object', 'assets/images/object.png', 51, 47, 3);


        this.load.audio('gameMusic', 'assets/audio/ingame.mp3');
        this.load.audio('player', 'assets/audio/Death.mp3');
        this.load.audio('bounce', 'assets/audio/Swoosh.mp3');
        this.load.audio('coin', 'assets/audio/Sparkly Bonus.mp3');
        this.load.audio('death', 'assets/audio/Death.mp3');
        this.load.audio('shot', 'assets/audio/gun.mp3');
        this.load.audio('gameover', 'assets/audio/Game Over.mp3');

        this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');
        this.load.bitmapFont('Amazdoom', 'assets/fonts/Amazdoom/font.png', 'assets/fonts/Amazdoom/font.fnt');
        this.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    create: function(){
        this.preloadBar.cropEnabled = false;
    },
    update: function(){
        if (this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function(){
        this.ready = true;
    }
};