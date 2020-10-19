var Impostor= function(game, x, y, key, frame){ 
    key = 'rocks';
    Phaser.Sprite.call(this, game, x, y, key, frame);


    this.game.physics.arcade.enableBody(this); 
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);
};

Impostor.prototype = Object.create(Phaser.Sprite.prototype);
Impostor.prototype.constructor = Impostor;

Impostor.prototype.onRevived = function(){
    this.game.add.tween(this).to({y: this.y - 25}, Phaser.Easing.Linear.NONE, true, 0, Infinity, false);

    this.body.velocity.x = -300;
    
  }