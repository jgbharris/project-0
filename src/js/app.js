$(() => {
  console.log('Woohoo!!!!!!');

  // CONSTANTS ETC //

  const $startgame = $('#startgame');
  const $audio = $('audio')[0];
  // const $askPlayerName1 = prompt('Player 1 what is your name?');
  // const $askPlayerName2 = prompt('Player 2 what is your name?');
  const $gameboard = $('.gameboard');
  const $cells = $('.cell');
  let turnCounter = null;

  // const mainaudio = new Audio('sounds/arcadefunk.mp3');
  // GAME SET UP BUTTON //

  $startgame.on('click', (e) => {
    console.log('clicked');
    $audio.src = 'sounds/arcadefunk.mp3';
    $audio.play();
    $askPlayerName1();
    $askPlayerName2();
    responsiveVoice.speak('Hello welcome to connect 4');
  });


  // CLICK ON SQUARE: PUTS X OR O IN SQUARE, ADDS 1 TO TURN COUNTER, MAKES SQUARE UNPLAYABLE (CAN'T PLACE ANOTHER PIECE ON SQUARE) AND MAKES SQUARE ABOVE PLAYABLE

  $cells.on('click', (e) => {
    if (turnCounter % 2 === 0 && $(e.target).hasClass('playable')) {
      console.log('logging e target is ', $(e.target));
      // $(e.target).index();
      $(e.target).html('X');
      console.log($(e.target).html());
      $(e.target).removeClass('playable');
      $(e.target).addClass('notplayable');
    } else {
      if (turnCounter % 2 === !0 && $(e.target).hasClass('playable')) {
        $(e.target).html('O');
        $(e.target).removeClass('playable');
        $(e.target).addClass('notplayable');
      }
    }


    turnCounter++;

    console.log(turnCounter);






  });










































});
