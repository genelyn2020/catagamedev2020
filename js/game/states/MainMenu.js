GameState.MainMenu= function(){};

GameState.MainMenu.prototype={
    create:function(){
        this.background = this.game.add.tileSprite(0, 0, this.game.width, 1390 , 'background');
        // this.background.autoScroll(-100, 0);

        this.ground = this.game.add.tileSprite(0, 619, this.game.width, 37, 'ground');
        // this.ground.autoScroll(-100, 0);
        this.player = this.add.sprite(200, this.game.height/1.3, 'player');
      
        this.player.anchor.setTo(0.5, 0.5, 0.5);
        this.player.scale.setTo(1.3);

        this.player.animations.add('jump');
      
        this.game.add.tween(this.player).to({y:this.player.y-16}, 500,Phaser.Easing.Linear.NONE, true,0, Infinity, true)

        this.splash=this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'LOGO');
        this.splash.anchor.setTo(0.6);

        this.startText=this.game.add.bitmapText(0,0,'Amazdoom', 'tap to start', 70);

        this.startText.x=this.game.width/2-this.startText.textWidth/2;
        this.startText.y=this.game.height/2+this.splash.height/2;
    },
    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.game.state.start('Game');
        };
    } 

         
            
};







