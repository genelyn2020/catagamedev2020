var Scoreboard=function(game){
    Phaser.Group.call(this, game);
};

Scoreboard.prototype=Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor=Scoreboard;

Scoreboard.prototype.show = function(score, kill, time){

    var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, startText, scoreText1, killText;

    bmd=this.game.add.bitmapData(this.game.width,this.game.height);
    bmd.ctx.fillStyle='#000';
    bmd.ctx.fillRect(0,0,this.game.width,this.game.height);

    background=this.game.add.sprite(0,0,bmd);
    background.alpha=0.5;

    this.add(background);

    var isNewHighScore=false;
    var highscore1=localStorage.getItem('highscore1');
    if(!highscore1 || highscore1 < score){
        isNewHighScore=true;
        highscore1=score;
        localStorage.setItem('highscore1', highscore1);
    }

    this.y=this.game.height;


    gameoverText=this.game.add.bitmapText(0,150, 'minecraftia', 'You Died', 36);
    gameoverText.x=this.game.width/2-(gameoverText.textWidth/2);
    this.add(gameoverText);

    scoreText=this.game.add.bitmapText(0,200, 'minecraftia', 'Your Score '+score, 24);
    scoreText.x=this.game.width/2-(scoreText.textWidth/2);
    this.add(scoreText);

    killText=this.game.add.bitmapText(0,250, 'minecraftia', 'Your Kill '+kill, 24);
    killText.x=this.game.width/2-(killText.textWidth/2);
    this.add(killText);

    scoreText1=this.game.add.bitmapText(0,300, 'minecraftia', 'Your Time '+time, 24);
    scoreText1.x=this.game.width/2-(scoreText1.textWidth/2);
    this.add(scoreText1);

    highScoreText=this.game.add.bitmapText(0,350, 'minecraftia', 'Your High Score '+highscore1, 24);
    highScoreText.x=this.game.width/2-(highScoreText.textWidth/2);
    this.add(highScoreText);

    startText=this.game.add.bitmapText(0,400, 'minecraftia', 'Tap to play again', 16);
    startText.x=this.game.width/2-(startText.textWidth/2);
    this.add(startText);

    if(isNewHighScore){
        newHighScoreText=this.game.add.bitmapText(0,100, 'minecraftia', 'New High Score', 12);
        newHighScoreText.tint=0x4ebef7;
        newHighScoreText.x=gameoverText.x+gameoverText.textWidth+40;
        newHighScoreText.angle=45;
        this.add(newHighScoreText);
    }

    this.game.add.tween(this).to({y:0},1000,Phaser.Easing.Bounce.Out,true);

    this.game.input.onDown.addOnce(this.restart,this);

};

Scoreboard.prototype.restart=function(){
    this.game.state.start('Game',true,false);
};