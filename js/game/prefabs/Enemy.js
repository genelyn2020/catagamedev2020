var Enemy = function(game, x, y, key, frame){ 
    key = 'object';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(1.3);
    this.anchor.setTo(0.6);

    this.animations.add('fly', [0,1,2,], 3, true);

    this.game.physics.arcade.enableBody(this); 
    this.body.allowGravity = false;


    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function(){
    this.game.add.tween(this).to({y: this.y - 25}, Phaser.Easing.Linear.NONE, true, 0, Infinity, false);

    this.body.velocity.x = -300;
    this.animations.play('fly');
  }