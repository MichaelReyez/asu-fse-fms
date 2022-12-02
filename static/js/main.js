function setup() {
  document.querySelector('canvas').remove()
  mainMenu = new Context('transparent', 'static/img/background.png')
  aimingGameCtx = new Context('transparent', 'static/img/aimgame/background.jpg')
  typingGameCtx = new Context('transparent', 'static/img/typegame/background.jpg')
  matchingGameCtx = new Context('transparent', 'static/img/matchgame/background.jpg')
  aimingGameInstructionCtx = new Context('transparent', 'static/img/aimgame/background.jpg')
  typingGameInstructionCtx = new Context('transparent', 'static/img/typegame/background.jpg')
  matchingGameInstructionCtx = new Context('transparent', 'static/img/matchgame/background.jpg')
  aimingGameInstructionCtx.addElements([
    new Title(aimingGameInstructionCtx, 'Aiming', {
      'font-size': '4em',
      'color': '#d9a362',
      'text-align': 'center',
      'font-weight': 'bold',
      'font-family': 'Futura',
      'z-index': '100'
    }, 0, windowHeight * 0.015),
    new Button(aimingGameInstructionCtx, '< Back', switchContext, [aimingGameCtx, aimingGameInstructionCtx], {
      'font-size': '2em',
      'color': '#d9a362',
      'border-radius': '2em',
      'border': '0.1em #d9a362 solid',
      'padding': '0.2em 1em',
      'width': '4em',
      'text-align': 'center',
      'font-family': 'Futura',
      'z-index': '100'
    }, windowWidth * 0.05, windowHeight * 0.025),
    new DecorativeBox(aimingGameInstructionCtx, '/static/img/aimgame/wood.jpg', {
      'width': '100vw',
      'height': '12vh',
    }, 0, 0),
    new TextBox(aimingGameInstructionCtx, 'After clicking start, hit as many ducks as you can within 30 seconds. Try not to miss, or your score will take a hit!', {
      'font-size': '2.5em',
      'border-radius': '2em',
      'color': 'black',
      'border': '0.1em black solid',
      'padding': '0.4em 1em',
      'text-align': 'center',
      'font-family': 'Monaco',
      'overflow': 'hidden',
      'width': '90vw',
      'box-sizing': 'border-box',
      'background': 'white',
    }, windowWidth * 0.05, windowHeight * 0.4),
  ])
  typingGameInstructionCtx.addElements([
    new Title(typingGameInstructionCtx, 'Typing', {
      'font-size': '4em',
      'color': 'black',
      'text-align': 'center',
      'font-weight': 'bold',
      'font-family': 'Futura',
      'z-index': '100'
    }, 0, windowHeight * 0.015),
    new Button(typingGameInstructionCtx, '< Back', switchContext, [typingGameCtx, typingGameInstructionCtx], {
      'font-size': '2em',
      'border-radius': '2em',
      'border': '0.1em black solid',
      'padding': '0.2em 1em',
      'width': '4em',
      'text-align': 'center',
      'font-family': 'Futura',
      'background': 'rgba(255,255,255,0.75)',
      'z-index': '100'
    }, windowWidth * 0.05, windowHeight * 0.025),
    new TextBox(typingGameInstructionCtx, 'After clicking start, use your keyboard to type the entire paragraph as fast as possible. You make any mistakes and you will not be able to continue, so make sure to correct ALL your mistakes.', {
      'font-size': '2.5em',
      'border-radius': '2em',
      'color': 'black',
      'border': '0.1em black solid',
      'padding': '0.4em 1em',
      'text-align': 'center',
      'font-family': 'Monaco',
      'overflow': 'hidden',
      'width': '90vw',
      'box-sizing': 'border-box',
      'background': 'white',
    }, windowWidth * 0.05, windowHeight * 0.4),
  ])
  matchingGameInstructionCtx.addElements([
    new Title(matchingGameInstructionCtx, 'Matching', {
      'font-size': '4em',
      'color': 'black',
      'text-align': 'center',
      'font-weight': 'bold',
      'font-family': 'Futura',
      'z-index': '100'
    }, 0, windowHeight * 0.015),
    new Button(matchingGameInstructionCtx, '< Back', switchContext, [matchingGameCtx, matchingGameInstructionCtx], {
      'font-size': '2em',
      'border-radius': '2em',
      'border': '0.1em black solid',
      'padding': '0.2em 1em',
      'width': '4em',
      'text-align': 'center',
      'font-family': 'Futura',
      'z-index': '100'
    }, windowWidth * 0.05, windowHeight * 0.025),
    new TextBox(matchingGameInstructionCtx, 'After clicking start, match the animal cards together by clicking on them. Try to match all the cards in the fastest time and fewest attempts!', {
      'font-size': '2.5em',
      'border-radius': '2em',
      'color': 'black',
      'border': '0.1em black solid',
      'padding': '0.4em 1em',
      'text-align': 'center',
      'font-family': 'Monaco',
      'overflow': 'hidden',
      'width': '90vw',
      'box-sizing': 'border-box',
      'background': 'white',
    }, windowWidth * 0.05, windowHeight * 0.4),
  ])
  i1 = createImg('static/img/aiming-icon.png', 'picture')
  i1.style('max-width', '100%')
  i1.style('object-fit', 'contain')
  i1.attribute('draggable', 'false')
  i2 = createImg('static/img/typing-icon.png', 'picture')
  i2.style('max-width', '100%')
  i2.style('object-fit', 'contain')
  i2.attribute('draggable', 'false')
  i3 = createImg('static/img/matching-icon.png', 'picture')
  i3.style('max-width', '70%')
  i3.style('object-fit', 'contain')
  i3.attribute('draggable', 'false')
  mainMenu.addElements(
    [new ButtonCollection(mainMenu, {
      'display': 'flex',
      'justify-content': 'space-evenly',
      'align-items': 'center',
      'flex-direction': 'row',
      'width': '100%',
      'font-family': 'Futura',
      'padding': '2em 0',
      // 'background': 'rgba(0,0,0,0.2)',
      // 'backdrop-filter': 'blur(5px)',
      // 'box-shadow': '0 0 20px 50px rgba(0,0,0,0.2)'
    }, 0, windowHeight / 2, [new Button(mainMenu, 'Aiming', switchContext, [aimingGameCtx, mainMenu], {
        'font-size': '2em',
        'border-radius': '1em',
        'aspect-ratio': '1/1',
        'border': '0.2em #fc7762 solid',
        'padding': '1em',
        'width': '4em',
        'height': '4em',
        'text-align': 'center',
        'flex-flow': 'column',
        'background': '#404040',
        'color': '#fc7762',
        'box-shadow': '0 20px 0 0 #bf5a4b'
      }, posX = null, posY = null, nestedElement = i1),
      new Button(mainMenu, 'Typing', switchContext, [typingGameCtx, mainMenu], {
        'font-size': '2em',
        'border-radius': '1em',
        'aspect-ratio': '1/1',
        'border': '0.2em #59eb85 solid',
        'padding': '1em',
        'width': '4em',
        'height': '4em',
        'text-align': 'center',
        'flex-flow': 'column',
        'background': '#404040',
        'color': '#59eb85',
        'box-shadow': '0 20px 0 0 #47ba6a'
      }, posX = null, posY = null, nestedElement = i2),
      new Button(mainMenu, 'Matching', switchContext, [matchingGameCtx, mainMenu], {
        'font-size': '2em',
        'border-radius': '1em',
        'aspect-ratio': '1/1',
        'border': '0.2em #7db9f5 solid',
        'padding': '1em',
        'width': '4em',
        'height': '4em',
        'text-align': 'center',
        'flex-flow': 'column',
        'background': '#404040',
        'color': '#7db9f5',
        'box-shadow': '0 20px 0 0 #6191c2'
      }, posX = null, posY = null, nestedElement = i3)
    ]), new Title(mainMenu, 'No More Stroke!', {
      'font-size': '6em',
      'text-align': 'center',
      'font-weight': 'bold',
      'font-family': 'Futura',
    }, 0, windowHeight * 0.05)]
  )
  aimingGame = new AimGame(aimingGameCtx)
  aimingGameCtx.addElements(
    [new Title(aimingGameCtx, 'Aiming', {
        'font-size': '4em',
        'color': '#d9a362',
        'text-align': 'center',
        'font-weight': 'bold',
        'font-family': 'Futura',
        'z-index': '100'
      }, 0, windowHeight * 0.015),
      new Button(aimingGameCtx, '< Back', switchContext, [mainMenu, aimingGameCtx], {
        'font-size': '2em',
        'color': '#d9a362',
        'border-radius': '2em',
        'border': '0.1em #d9a362 solid',
        'padding': '0.2em 1em',
        'width': '4em',
        'text-align': 'center',
        'font-family': 'Futura',
        'z-index': '100'
      }, windowWidth * 0.05, windowHeight * 0.025),
      new DecorativeBox(aimingGameCtx, '/static/img/aimgame/wood.jpg', {
        'width': '100vw',
        'height': '12vh',
      }, 0, 0),
      new DecorativeBox(aimingGameCtx, '/static/img/aimgame/wood.jpg', {
        'width': '100vw',
        'height': '15vh',
      }, 0, windowHeight * 0.85),
      new ScoreCounter(aimingGameCtx, 'Score', {
        'font-size': '2em',
        'color': '#d9a362',
        'border-radius': '2em',
        'border': '0.1em #d9a362 solid',
        'padding': '0.2em 1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'overflow': 'hidden',
        'white-space': 'nowrap',
      }, windowWidth * 0.05, windowHeight * 0.9),
      new ScoreCounter(aimingGameCtx, 'Accuracy', {
        'font-size': '2em',
        'border-radius': '2em',
        'color': '#d9a362',
        'border': '0.1em #d9a362 solid',
        'padding': '0.2em 1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'overflow': 'hidden',
        'white-space': 'nowrap',
      }, windowWidth * 0.25, windowHeight * 0.9, '100.0%'),
      new ScoreCounter(aimingGameCtx, 'Time', {
        'font-size': '2em',
        'border-radius': '2em',
        'color': '#d9a362',
        'border': '0.1em #d9a362 solid',
        'padding': '0.2em 1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'overflow': 'hidden',
        'white-space': 'nowrap',
      }, windowWidth * 0.8, windowHeight * 0.025, '0s'),
      new Button(aimingGameCtx, 'Start', aimingGame.start, [], {
        'font-size': '2em',
        'border-radius': '2em',
        'color': '#d9a362',
        'border': '0.1em #d9a362 solid',
        'padding': '0.2em 1em',
        'width': '4em',
        'text-align': 'center',
        'font-family': 'Futura'
      }, windowWidth * 0.8, windowHeight * 0.9, null, aimingGame),
      new Button(aimingGameCtx, '?', switchContext, [aimingGameInstructionCtx, aimingGameCtx], {
        'font-size': '2em',
        'color': '#d9a362',
        'border-radius': '2em',
        'border': '0.1em #d9a362 solid',
        'padding': '0.2em 1em',
        'width': '1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'z-index': '100'
      }, windowWidth * 0.2, windowHeight * 0.025)
    ]
  )
  typingGame = new TypeGame(typingGameCtx)
  typingGameCtx.addElements(
    [new Title(typingGameCtx, 'Typing', {
        'font-size': '4em',
        'text-align': 'center',
        'font-weight': 'bold',
        'font-family': 'Futura'
      }, 0, windowHeight * 0.015),
      new Button(typingGameCtx, '< Back', switchContext, [mainMenu, typingGameCtx], {
        'font-size': '2em',
        'border-radius': '2em',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'width': '4em',
        'text-align': 'center',
        'font-family': 'Futura',
        'background': 'rgba(255,255,255,0.75)'
      }, windowWidth * 0.05, windowHeight * 0.025),
      new TextBox(typingGameCtx, '', {
        'font-size': '1.5em',
        'border-radius': '2em',
        'color': 'black',
        'border': '0.1em black solid',
        'padding': '0.4em 1em',
        'text-align': 'left',
        'font-family': 'Monaco',
        'overflow': 'hidden',
        'height': '40vh',
        'width': '90vw',
        'box-sizing': 'border-box',
        'opacity': '75%',
        'background': 'white'
      }, windowWidth * 0.05, windowHeight * 0.4),
      new TextBox(typingGameCtx, '', {
        'font-size': '1.5em',
        'border-radius': '2em',
        'color': 'green',
        'border': '0.1em black solid',
        'padding': '0.4em 1em',
        'text-align': 'left',
        'font-family': 'Monaco',
        'overflow': 'hidden',
        'height': '40vh',
        'width': '90vw',
        'box-sizing': 'border-box',
      }, windowWidth * 0.05, windowHeight * 0.4),
      new Button(typingGameCtx, 'Start', typingGame.start, [], {
        'font-size': '2em',
        'border-radius': '2em',
        'color': 'black',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'width': '4em',
        'text-align': 'center',
        'font-family': 'Futura',
        'background': 'rgba(255,255,255,0.75)'
      }, windowWidth * 0.8, windowHeight * 0.9, null, typingGame),
      new ScoreCounter(typingGameCtx, 'Time', {
        'font-size': '2em',
        'border-radius': '2em',
        'color': 'black',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'overflow': 'hidden',
        'white-space': 'nowrap',
        'background': 'rgba(255,255,255,0.75)'
      }, windowWidth * 0.8, windowHeight * 0.025, '0s'),
      new ScoreCounter(typingGame, 'Speed (WPM)', {
        'font-size': '2em',
        'border-radius': '2em',
        'color': 'black',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'overflow': 'hidden',
        'white-space': 'nowrap',
        'background': 'rgba(255,255,255,0.75)'
      }, windowWidth * 0.05, windowHeight * 0.9),
      new Button(typingGameCtx, '?', switchContext, [typingGameInstructionCtx, typingGameCtx], {
        'font-size': '2em',
        'border-radius': '2em',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'width': '1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'background': 'rgba(255,255,255,0.75)'
      }, windowWidth * 0.2, windowHeight * 0.025)
    ]
  )
  matchingGame = new MatchGame(matchingGameCtx)
  matchingGameCtx.addElements(
    [new Title(matchingGameCtx, 'Matching', {
        'font-size': '4em',
        'text-align': 'center',
        'font-weight': 'bold',
        'font-family': 'Futura'
      }, 0, windowHeight * 0.015),
      new Button(matchingGameCtx, '< Back', switchContext, [mainMenu, matchingGameCtx], {
        'font-size': '2em',
        'border-radius': '2em',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'width': '4em',
        'text-align': 'center',
        'font-family': 'Futura'
      }, windowWidth * 0.05, windowHeight * 0.025),
      new Grid(matchingGameCtx, 4, 5, {
        'width': '55vw',
        'height': '44vw',
        'gap': '1vw',
        'border': '1vw #8a3124 solid',
        'background': '#8a3124',
        'border-radius': '1em',
      }, windowWidth * 0.215, 0.12 * windowHeight),
      new Button(matchingGameCtx, 'Start', matchingGame.start, [], {
        'font-size': '2em',
        'border-radius': '2em',
        'color': 'black',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'width': '4em',
        'text-align': 'center',
        'font-family': 'Futura'
      }, windowWidth * 0.8, windowHeight * 0.9, null, matchingGame),
      new ScoreCounter(matchingGameCtx, 'Time', {
        'font-size': '2em',
        'border-radius': '2em',
        'color': 'black',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'overflow': 'hidden',
        'white-space': 'nowrap',
      }, windowWidth * 0.8, windowHeight * 0.025, '0s'),
      new ScoreCounter(matchingGameCtx, 'Attempts', {
        'font-size': '2em',
        'border-radius': '2em',
        'color': 'black',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'text-align': 'center',
        'font-family': 'Futura',
        'overflow': 'hidden',
        'white-space': 'nowrap',
      }, windowWidth * 0.8, windowHeight * 0.1, '0'),
      new Button(matchingGameCtx, '?', switchContext, [matchingGameInstructionCtx, matchingGameCtx], {
        'font-size': '2em',
        'border-radius': '2em',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'width': '1em',
        'text-align': 'center',
        'font-family': 'Futura'
      }, windowWidth * 0.2, windowHeight * 0.025)
    ]
  )
  matchingGame.preload()
  mainMenu.render()
}

function draw() {

}