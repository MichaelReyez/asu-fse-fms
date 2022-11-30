function randInt(num) {
  return Math.floor(Math.random() * num);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

class MatchGame {
  constructor(context) {
    this.context = context;
    this.started = false;
    this.firstCard = null;
    this.elapsedTime = 0;
    this.attempts = 0
  }
  preload() {
    this.grid = this.context.elements[2]
  }
  generateCards() {
    this.grid.elements = []
    this.solvedCards = []
    this.cards = [
      new Card(this.context, 'static/img/matchgame/0.jpg', 'static/img/matchgame/back.jpg', 0, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/0.jpg', 'static/img/matchgame/back.jpg', 0, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/1.jpg', 'static/img/matchgame/back.jpg', 1, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/1.jpg', 'static/img/matchgame/back.jpg', 1, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/2.jpg', 'static/img/matchgame/back.jpg', 2, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/2.jpg', 'static/img/matchgame/back.jpg', 2, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/3.jpg', 'static/img/matchgame/back.jpg', 4, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/3.jpg', 'static/img/matchgame/back.jpg', 4, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/4.jpg', 'static/img/matchgame/back.jpg', 5, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/4.jpg', 'static/img/matchgame/back.jpg', 5, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/5.jpg', 'static/img/matchgame/back.jpg', 6, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/5.jpg', 'static/img/matchgame/back.jpg', 6, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/6.jpg', 'static/img/matchgame/back.jpg', 7, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/6.jpg', 'static/img/matchgame/back.jpg', 7, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/7.jpg', 'static/img/matchgame/back.jpg', 8, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/7.jpg', 'static/img/matchgame/back.jpg', 8, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/8.jpg', 'static/img/matchgame/back.jpg', 9, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/8.jpg', 'static/img/matchgame/back.jpg', 9, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/9.jpg', 'static/img/matchgame/back.jpg', 3, {
        'border-radius': '1em',
      }, this),
      new Card(this.context, 'static/img/matchgame/9.jpg', 'static/img/matchgame/back.jpg', 3, {
        'border-radius': '1em',
      }, this),
    ]
    this.cardIndexes = []
    for (var i = this.cards.length - 1; i >= 0; i--) {
      this.cardIndexes.push(i)
    }
    shuffleArray(this.cardIndexes)
    for (var i = 0; i < this.cardIndexes.length; i++) {
      var num = this.cardIndexes[i]
      this.grid.addElement(this.cards[num], Math.floor(i / 5), i % 5)
    }
  }

  startTimer() {
    this.elapsedTime = 0;
    this.context.elements[4].updateValue(`${this.elapsedTime}s`)
    return setInterval(() => {
      this.elapsedTime++
      this.context.elements[4].updateValue(`${this.elapsedTime}s`)
      if (!this.started) {
        clearInterval(this.timerId)
      }
    }, 1000)
  }

  cardFlip(card) {
    if (this.started) {
      card.flip()
      card.block()
      if (this.firstCard == null) {
        this.firstCard = card
      } else if (card.identifier != this.firstCard.identifier) {
        this.attempts++
        let a = new Audio('/static/snd/foghorn.m4a')
        a.play()
        var temp1 = this.firstCard
        var temp2 = card
        this.cards.forEach((c) => {
          c.block()
        })
        setTimeout(() => {
          temp1.unblock()
          temp1.flip()
          temp2.unblock()
          temp2.flip()
          this.cards.forEach((c) => {
            if (!this.solvedCards.includes(c)) {
              c.unblock()
            }
          })
        }, 1000)
        this.firstCard = null
      } else {
        this.attempts++
        this.firstCard.block()
        card.block()
        this.solvedCards.push(this.firstCard)
        this.solvedCards.push(card)
        this.firstCard = null
        let a = new Audio('/static/snd/bell.m4a')
        a.play()
      }
    }
    this.context.elements[5].updateValue(this.attempts)
    if (this.cards.length == this.solvedCards.length) {
      this.started = false;
      let a = new Audio('/static/snd/yay.m4a')
      a.play()
    }
  }
  start() {
    if (this.started) {
      clearInterval(this.timerId)
      this.timerId = this.startTimer()
    } else {
      this.timerId = this.startTimer()
    }
    this.started = true
    this.attempts = 0
    this.context.elements[5].updateValue(this.attempts)
    this.generateCards()
    this.context.derender()
    this.context.render()

  }
}

class TypeGame {
  constructor(context) {
    this.context = context

    //game settings
    this.score = 0
    this.totalTypes = 0
    this.totalCorrectTypes = 0

    this.started = false
    this.currentInput = ''
    this.currentText = ''
    this.mistake = false
    this.elapsedTime = 0

    this.speeds = []
    this.wpmTimer = null

    document.addEventListener('keypress', (e) => {
      this.typeEvent(e)
    })
    document.addEventListener('keydown', (e) => {
      this.deleteEvent(e)
    })
  }
  checkMistakes() {
    this.mistake = false
    for (var i = 0; i < this.currentInput.length; i++) {
      if (this.currentText[i] != this.currentInput[i]) {
        this.spanLetter(i)
        this.mistake = true
      }
    }
  }
  updateCursor() {
    if (this.currentText.length == this.currentInput.length + 1) {
      return
    } else {
      if (!this.mistake) {
        let part1 = this.currentText.slice(0, this.currentInput.length + 1)
        let part2 = this.currentText.slice(this.currentInput.length + 2, this.currentText.length)
        this.context.elements[2].updateText(`${part1}<span style="text-decoration: underline">${this.currentText[this.currentInput.length + 1]}</span>${part2}`)
      }
    }
  }
  spanLetter(index) {
    let text = this.context.elements[3].div.html().toString()
    let part1 = text.slice(0, index)
    let part2 = text.slice(index + 1, text.length)

    if (text[index] != ' ') {
      this.context.elements[3].updateText(`${part1}<span style="background: red; color: white; text-decoration: underline">${text[index]}</span>${part2}`)
    } else {
      this.context.elements[3].updateText(`${part1}<span style="white-space: pre-wrap; background: red; color: white; text-decoration: underline">&nbsp</span>${part2}`)
    }
  }
  deleteEvent(e) {
    if (this.started) {
      if (e.keyCode == 8) {
        if (this.currentInput.length > 1) {
          this.currentInput = this.currentInput.slice(0, this.currentInput.length - 1)
        } else {
          this.currentInput = ''
        }
      }
      this.context.elements[3].updateText(this.currentInput)
      this.updateCursor()
      this.checkMistakes()
    }
  }
  typeEvent(e) {
    if (this.currentText.length == this.currentInput.length + 1) {
      this.wpmTimer = null
      this.started = false;
    }
    if (!this.mistake && (this.started)) {
      if (e.key == 'Enter') {

      } else {
        if (this.wpmTimer != null) {
          this.speeds.push(Date.now() - this.wpmTimer)
        }
        this.wpmTimer = Date.now()
        this.currentInput += e.key
      }
      this.context.elements[6].updateValue(`${this.calcSpeed()}`)
      this.context.elements[3].updateText(this.currentInput)
      this.checkMistakes()
    }
  }
  calcSpeed() {
    var sum = 0;
    this.speeds.forEach(speed => {
      sum += parseInt(speed)
    })
    return Math.ceil(60000 / (sum / this.speeds.length) / 5)
  }
  startTimer() {
    this.elapsedTime = 0;
    return setInterval(() => {
      this.elapsedTime++
      this.context.elements[5].updateValue(`${this.elapsedTime}s`)
      if (!this.started) {
        clearInterval(this.timerId)
      }
    }, 1000)
  }
  start() {
    this.currentInput = ""
    this.context.elements[3].updateText(this.currentInput)
    this.updateCursor()
    if (!this.started) {
      this.started = true;
      fetch('static/paragraphs.json')
        .then(response => response.json()).then(json => {
          this.currentText = json[randInt(json.length - 1)]
          this.context.elements[2].updateText(this.currentText)
        })
    } else {
      fetch('static/paragraphs.json')
        .then(response => response.json()).then(json => {
          this.currentText = json[randInt(json.length - 1)]
          this.context.elements[2].updateText(this.currentText)
        })
    }
    this.timerId = this.startTimer()
  }
}

class AimGame {
  constructor(context) {
    this.context = context

    //game settings
    this.score = 0;
    this.totalShots = 0
    this.totalHits = 0
    this.hitPoints = 10 //how many points awarded per hit
    this.penaltyPoints = 5 //how many pointe deducted on miss

    this.numTargets = 5
    this.targetRadius = 80
    this.started = false;
    this.targets = []

    this.missBox = null;
    this.timerId = null;
  }
  onHit() {
    this.totalHits++
    this.totalShots++
    this.score += this.hitPoints
    let a = new Audio('/static/snd/quack.m4a')
    a.play()
    this.updateHud()
  }
  onMiss(button) {
    this.totalShots++
    let a = new Audio('/static/snd/pistol.m4a')
    a.play()
    this.updateHud()
  }
  updateHud() {
    this.context.elements[4].updateValue((this.score * this.totalHits / this.totalShots).toFixed(1))
    if (this.totalShots != 0) {
      this.context.elements[5].updateValue(`${(100 * this.totalHits / this.totalShots).toFixed(1) }%`)
    } else {
      this.context.elements[5].updateValue('100.0%')
    }
  }
  relocateTarget(t) {
    t.move(this.randomX(), this.randomY())
  }

  randomX() {
    return randInt(windowWidth * 0.8) + (0.05 * windowWidth)
  }
  randomY() {
    return randInt(windowHeight * 0.6) + (0.15 * windowHeight)
  }
  createTargets() {
    var css = {
      'width': `${this.targetRadius * 2}px`,
      'height': `${this.targetRadius * 2}px`,
    }
    for (var i = 0; i < this.numTargets; i++) {
      var img = createImg('static/img/aimgame/duck.png', 'picture')
      img.style('max-width', '100%')
      img.style('object-fit', 'contain')
      img.attribute('draggable', 'false')
      this.targets.push(new Target(this.context, this, css, this.randomX(), this.randomY(), img))
    }
    this.context.addElements(this.targets)
  }
  createMissBox() {
    this.missBox = createDiv()
    this.missBox.style('width', '100vw')
    this.missBox.style('height', '100vh')
    let f = this.onMiss.bind(this)
    this.missBox.mouseClicked(f)
    this.missBox.id('missBox')
    this.missBox.addClass('context-' + this.context.id)
    this.missBox.position(0, 0, 'absolute')
    this.context.addElements([this.missBox])
  }
  removeMissBox() {
    this.context.removeElement(this.missBox)
    this.missBox.remove()
    this.missBox = null;
  }

  end() {
    this.started = false
    this.context.elements[4].updateValue(`${(this.score * this.totalHits / this.totalShots).toFixed(1) }`)
    clearInterval(this.timerId)
    this.context.derender()
    for (var target of this.targets) {
      this.context.removeElement(target)
    }
    this.removeMissBox()
    this.targets = []
    this.context.render()
  }

  startTimer() {
    this.timeLeft = 30
    this.context.elements[6].updateValue(`${this.timeLeft}s`)
    return setInterval(() => {
      this.timeLeft--;
      this.context.elements[6].updateValue(`${this.timeLeft}s`)
      if (this.timeLeft <= 0) {
        this.end()
      }
    }, 1000)
  }

  start() {
    this.totalHits = 0
    this.totalShots = 0
    this.score = 0
    if (!this.started) {
      this.createTargets()
      this.createMissBox()
      this.context.derender()
      this.context.render()
    } else {
      this.end()
      this.context.derender()
      this.createMissBox()
      this.createTargets()
      this.context.render()
    }
    this.timerId = this.startTimer()
    this.started = true
    this.updateHud()
  }
}