var Life = function(game, x, y, key, frame){ 
    //key = 'lives';
    Phaser.Sprite.call(this, game, x, y, key, frame);

    this.scale.setTo(.20);
    this.anchor.setTo(.20);

    this.animations.add('fly');

    this.game.physics.arcade.enableBody(this); 
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);
};

Life.prototype = Object.create(Phaser.Sprite.prototype);
Life.prototype.constructor = Life;

Life.prototype.onRevived = function(){
    this.body.velocity.x = -400; //horizontal speed of the coin

};

Life.prototype.onKilled = function(){
    this.animations.frame = 0; //the coin will face the screen when it spin
};
