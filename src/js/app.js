$(() => {
  console.log('Woohoo!!!!!!');

  // CONSTANTS ETC //

  const $startgame = $('#startgame');
  const $audio = $('audio')[0];
  // const $askPlayerName1 = prompt('Player 1 what is your name?');
  // const $askPlayerName2 = prompt('Player 2 what is your name?');
  // const $gameboard = $('.gameboard');
  const $cells = $('.cell');
  let turnCounter = null;
  const $resetButton = $('#reset');
  // const mainaudio = new Audio('sounds/arcadefunk.mp3');
  // GAME SET UP BUTTON //

  // responsiveVoice.speak('Hello welcome to funky laser connect 4');

  $startgame.on('click', (e) => {
    console.log('clicked');
    $audio.src = 'sounds/arcadefunk.mp3';
    $audio.play();
    $askPlayerName1();
    $askPlayerName2();
  });


  // CLICK ON SQUARE: PUTS X OR O IN SQUARE, ADDS 1 TO TURN COUNTER, MAKES SQUARE UNPLAYABLE (CAN'T PLACE ANOTHER PIECE ON SQUARE) AND MAKES SQUARE ABOVE PLAYABLE

  $cells.on('click', (e) => {
    const color = turnCounter % 2 === 0 ? 'red' : 'blue';
    const counter = turnCounter % 2 === 0 ? 'X' : 'O';
    if ($(e.target).hasClass('playable')) {
      const index = $(e.target).index();
      $(e.target).html(counter);
      $(e.target).css('background-color', color);
      $(e.target).removeClass('playable');
      $(e.target).addClass('notplayable');
      $cells.eq(index -7).removeClass('notplayable').addClass('playable');
      turnCounter++;
      checkForWin(index);
    }

    // RESET BUTTON //

    $resetButton.on('click', (e) => {
      $cells.html(' ');
      $cells.css('background', 'transparent');
    });




    // console.log(turnCounter);

    // WIN CONDITIONS //


    function checkForWin(index) {
      // VERTICAL WIN CHECK //
      console.log('index', index, $cells.eq(index+7));
      // const currentIndex = $(e.target).index();
      console.log($cells.eq(index+7).html());
      if ($cells.eq(index).html() === $cells.eq(index+7).html() &&
      $cells.eq(index+7).html() === $cells.eq(index+14).html() &&
      $cells.eq(index+14).html() === $cells.eq(index+21).html()) {
        responsiveVoice.speak('vertical win');

      }
    }
      // checkForWin();

      // console.log('checkForWin');
      // let i = 4;
      // console.log(i);
      // console.log(currentIndex);
      //
      // while (i--) {
      //   console.log('This is i:', i);
      //   if ($cells.eq(currentIndex +i).text() !=='X') {
      //     break;
      //   } else {
      //     console.log('Horizontal Win');
      //   }
      // }








  });










































});
