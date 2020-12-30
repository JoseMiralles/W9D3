class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $(".square").on("click", this.game.playMove);
  }

  makeMove($square) {}

  setupBoard() {
    for (let i = 0; i < 3; i++){
      const row = $("<ul class='row'></ul>");
      for (let x = 0; x < 3; x++){
        row.append("<li class='square grey'></li>");
      }
      this.$el.append( row );
    }
  }
}

module.exports = View;
