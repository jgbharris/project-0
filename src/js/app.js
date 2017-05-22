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
  const $resetButton = $('#reset')
  // const mainaudio = new Audio('sounds/arcadefunk.mp3');
  // GAME SET UP BUTTON //

responsiveVoice.speak('Hello welcome to funky laser connect 4');

  $startgame.on('click', (e) => {
    console.log('clicked');
    $audio.src = 'sounds/arcadefunk.mp3';
    $audio.play();
    $askPlayerName1();
    $askPlayerName2();
  });


  // CLICK ON SQUARE: PUTS X OR O IN SQUARE, ADDS 1 TO TURN COUNTER, MAKES SQUARE UNPLAYABLE (CAN'T PLACE ANOTHER PIECE ON SQUARE) AND MAKES SQUARE ABOVE PLAYABLE

  $cells.on('click', (e) => {
    if (turnCounter % 2 === 0 && $(e.target).hasClass('playable')) {
      console.log('logging e target is ', $(e.target).index());
      const index = $(e.target).index();
      // $(e.target).index();
      $(e.target).html('X');
      $(e.target).css('background-color', 'red');
      console.log($(e.target).html());
      $(e.target).removeClass('playable');
      $(e.target).addClass('notplayable');
      $cells.eq(index -7).removeClass('notplayable').addClass('playable');
      turnCounter++;
      checkForWin();
    } else {
      if (turnCounter % 2 !== 0 && $(e.target).hasClass('playable')) {
        const index = $(e.target).index();
        $(e.target).html('O');
        $(e.target).css('background-color', 'blue');
        $(e.target).removeClass('playable');
        $(e.target).addClass('notplayable');
        $cells.eq(index -7).removeClass('notplayable').addClass('playable');
        turnCounter++;
        checkForWin();
      }
    }

    // RESET BUTTON //

    $resetButton.on('click', (e) => {
      $cells.html(' ');
      $cells.css('background', 'transparent');
    });




    // console.log(turnCounter);

    // WIN CONDITIONS //


    function checkForWin() {
      const currentIndex = $(e.target).index();


      console.log('checkForWin');
      let i = 4;
      console.log(i);
      console.log(currentIndex);

      while (i--) {
        console.log('This is i:', i);
        if ($cells.eq(currentIndex +i).text() !=='X') {
          break;
        } else {
          console.log('Horizontal Win');
        }
      }
    }







  });










































});
