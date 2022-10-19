function setup() {
  createCanvas(windowWidth, windowHeight)
  mainMenu = new Context('white')
  aimingGame = new Context('white')
  typingGame = new Context('white')
  matchingGame = new Context('white')
  mainMenu.addElements(
    [new ButtonCollection(mainMenu, {
      'display': 'flex',
      'justify-content': 'space-evenly',
      'align-items': 'center',
      'flex-direction': 'row',
      'width': '100%',
      'font-family': 'Futura'
    }, 0, windowHeight / 2, [new Button(mainMenu, 'Aiming', switchContext, [aimingGame, mainMenu], {
        'font-size': '2em',
        'border-radius': '10em',
        'aspect-ratio': '1/1',
        'border': '0.1em black solid',
        'padding': '1em',
        'width': '4em',
        'text-align': 'center',
      }),
      new Button(mainMenu, 'Typing', switchContext, [typingGame, mainMenu], {
        'font-size': '2em',
        'border-radius': '10em',
        'aspect-ratio': '1/1',
        'border': '0.1em black solid',
        'padding': '1em',
        'width': '4em',
        'text-align': 'center',
      }),
      new Button(mainMenu, 'Matching', switchContext, [matchingGame, mainMenu], {
        'font-size': '2em',
        'border-radius': '10em',
        'aspect-ratio': '1/1',
        'border': '0.1em black solid',
        'padding': '1em',
        'width': '4em',
        'text-align': 'center',
      })
    ]), new Title(mainMenu, 'No More Stroke!', {
      'font-size': '6em',
      'text-align': 'center',
      'font-weight': 'bold',
      'font-family': 'Futura',
    }, 0, windowHeight * 0.05)]
  )
  aimingGame.addElements(
    [new Title(aimingGame, 'Aiming', {
        'font-size': '4em',
        'text-align': 'center',
        'font-weight': 'bold',
        'font-family': 'Futura'
      }, 0, windowHeight * 0.05),
      new Button(aimingGame, 'Back', switchContext, [mainMenu, aimingGame], {
        'font-size': '2em',
        'border-radius': '2em',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'width': '4em',
        'text-align': 'center',
        'font-family': 'Futura'
      }, windowWidth * 0.05, windowHeight * 0.05),
    ]
  )
  typingGame.addElements(
    [new Title(typingGame, 'Typing', {
      'font-size': '4em',
      'text-align': 'center',
      'font-weight': 'bold',
      'font-family': 'Futura'
    }, 0, windowHeight * 0.05), new Button(typingGame, 'Back', switchContext, [mainMenu, typingGame], {
      'font-size': '2em',
      'border-radius': '2em',
      'border': '0.1em black solid',
      'padding': '0.2em 1em',
      'width': '4em',
      'text-align': 'center',
      'font-family': 'Futura'
    }, windowWidth * 0.05, windowHeight * 0.05), ]
  )
  matchingGame.addElements(
    [new Title(matchingGame, 'Matching', {
        'font-size': '4em',
        'text-align': 'center',
        'font-weight': 'bold',
        'font-family': 'Futura'
      }, 0, windowHeight * 0.05),
      new Button(matchingGame, 'Back', switchContext, [mainMenu, matchingGame], {
        'font-size': '2em',
        'border-radius': '2em',
        'border': '0.1em black solid',
        'padding': '0.2em 1em',
        'width': '4em',
        'text-align': 'center',
        'font-family': 'Futura'
      }, windowWidth * 0.05, windowHeight * 0.05),
    ]
  )
  mainMenu.render()
}

function draw() {

}