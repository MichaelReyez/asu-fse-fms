function randInt(num) {
  return Math.floor(Math.random() * num);
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
    this.updateHud()
  }
  onMiss(button) {
    this.totalShots++
    this.updateHud()
  }
  updateHud() {
    this.context.elements[2].updateValue(this.score.toFixed(1))
    if (this.totalShots != 0) {
      this.context.elements[3].updateValue(`${(100 * this.totalHits / this.totalShots).toFixed(1) }%`)
    } else {
      this.context.elements[3].updateValue('100.0%')
    }
  }
  relocateTarget(t) {
    t.move(this.randomX(), this.randomY())
  }

  randomX() {
    return randInt(windowWidth * 0.9);
  }
  randomY() {
    return randInt(windowHeight * 0.8)
  }
  createTargets() {
    var css = {
      'width': `${this.targetRadius * 2}px`,
      'height': `${this.targetRadius * 2}px`,
    }
    for (var i = 0; i < this.numTargets; i++) {
      var img = createImg('static/img/aiming-icon.png', 'picture')
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
    this.missBox.style('z-index', '-100')
    let f = this.onMiss.bind(this)
    this.missBox.mouseClicked(f)
    this.missBox.id('missBox')
    this.missBox.addClass('context-' + this.context.id)
    this.missBox.position(0, 0, 'absolute')
    this.context.addElements([this.missBox])
  }
  removeMissBox() {
    this.context.removeElement(this.missBox)
    this.missBox = null;
  }

  end() {
    this.started = false
    this.context.elements[2].updateValue(`${(this.score * this.totalHits / this.totalShots).toFixed(1) }`)
    this.stopTimer(this.timerId)
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
    this.context.elements[4].updateValue(`${this.timeLeft}s`)
    return setInterval(() => {
      this.timeLeft--;
      this.context.elements[4].updateValue(`${this.timeLeft}s`)
      if (this.timeLeft <= 0) {
        this.end()
      }
    }, 1000)
  }

  stopTimer(id) {
    clearInterval(id)
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
      this.started = true
      this.timerId = this.startTimer()
    } else {
      this.end()
      this.context.derender()
      this.createTargets()
      this.context.render()
    }
    this.updateHud()
  }
}