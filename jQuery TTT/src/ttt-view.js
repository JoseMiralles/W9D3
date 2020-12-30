class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $(".square").on("click", (e) => {
      this.makeMove(e);
    });
  }

  makeMove(e) {
    this.game.playMove(e);
    if (this.game.isOver()){
      // Set winner font to white
      // Set winner squares to green

      // Set looser font to red
      // Set remaining squares to white

      // print: You win {mark}

      const game = this.game;
      $(".square").each(function(){
        const square = $(this);
        if (square.text() === game.winner()){
          square.addClass("winner");
        } else {
          square.removeClass("grey");
          square.addClass("looser");
        }
      });
      $("#message").text(`You are the winner, ${game.winner()}!`);
    }
  }

  setupBoard() {
    for (let i = 0; i < 3; i++){
      const row = $("<ul class='row'></ul>");
      for (let x = 0; x < 3; x++){
        const square = $("<li class='square grey'></li>");
        square.attr("row", i);
        square.attr("col", x);
        row.append(square);
      }
      this.$el.append( row );
    }
  }
}

module.exports = View;
