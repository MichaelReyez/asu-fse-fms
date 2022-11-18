function randInt(num) {
  return Math.floor(Math.random() * num);
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
      let part1 = this.currentText.slice(0, this.currentInput.length + 1)
      let part2 = this.currentText.slice(this.currentInput.length + 2, this.currentText.length)
      this.context.elements[2].updateText(`${part1}<span style="text-decoration: underline">${this.currentText[this.currentInput.length + 1]}</span>${part2}`)
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
      this.checkMistakes()
      this.updateCursor()
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
      fetch('static/typegame/paragraphs.json')
        .then(response => response.json()).then(json => {
          this.currentText = json[randInt(json.length - 1)]
          this.context.elements[2].updateText(this.currentText)
        })
    } else {
      fetch('static/typegame/paragraphs.json')
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
    this.missBox.style('cursor', 'url("static/img/crosshair.cur")')
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