var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'');

game.state.add('Boot', GameState.Boot);
game.state.add('Preloader', GameState.Preload);
game.state.add('MainMenu', GameState.MainMenu);
game.state.add('Game', GameState.Game);

game.state.start('Boot');