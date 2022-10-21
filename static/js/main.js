function setup() {
  document.querySelector('body').style.backgroundImage = 'url(https://64.media.tumblr.com/461f07e0cd7bbbb1f4980f0ae7fb63f8/tumblr_oiudlb0x2t1v27836o1_500.gifv)'
  document.querySelector('body').style.backgroundSize = 'cover'
  document.querySelector('body').style.backgroundRepeat = 'no-repeat'
  document.querySelector('body').style.backgroundPosition = 'center 25%'
  document.querySelector('canvas').remove()
  mainMenu = new Context('transparent')
  aimingGame = new Context('transparent')
  typingGame = new Context('transparent')
  matchingGame = new Context('transparent')
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
      'background': 'rgba(0,0,0,0.2)',
      'backdrop-filter': 'blur(5px)',
      'box-shadow': '0 0 20px 50px rgba(0,0,0,0.2)'
    }, 0, windowHeight / 2, [new Button(mainMenu, 'Aiming', switchContext, [aimingGame, mainMenu], {
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
      new Button(mainMenu, 'Typing', switchContext, [typingGame, mainMenu], {
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
      new Button(mainMenu, 'Matching', switchContext, [matchingGame, mainMenu], {
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
  aimingGame.addElements(
    [new Title(aimingGame, 'Aiming', {
        'font-size': '4em',
        'text-align': 'center',
        'font-weight': 'bold',
        'font-family': 'Futura'
      }, 0, windowHeight * 0.05),
      new Button(aimingGame, '< Back', switchContext, [mainMenu, aimingGame], {
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
    }, 0, windowHeight * 0.05), new Button(typingGame, '< Back', switchContext, [mainMenu, typingGame], {
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
      new Button(matchingGame, '< Back', switchContext, [mainMenu, matchingGame], {
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