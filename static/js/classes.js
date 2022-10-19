function switchContext(newContext, oldContext) {
  oldContext.derender()
  newContext.render()
}

function makeid(length) {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function nestElement(parent, child) {
  child.parent(parent)
}

class Context {
  constructor(backgroundColor, active = false) {
    this.active = active
    this.backgroundColor = backgroundColor
    this.elements = []
    this.visibleElements = []
    this.id = makeid(16)
  }
  addElements(elements) {
    elements.forEach(element => {
      this.elements.push(element)
    })
  }
  render() {
    this.active = true
    background(this.backgroundColor)
    this.elements.forEach(element => {
      element.render()
    })
  }
  derender() {
    this.active = false
    this.elements.forEach(element => {
      element.derender()
    })
  }
  hideElement(element) {
    this.visibleElements.splice(this.visibleElements.indexOf(element), 1)
  }
}

class Button {
  constructor(parentContext, textLabel, callbackFunction, callbackFunctionArgs, css, posX = null, posY = null) {
    this.parentContext = parentContext
    this.textLabel = textLabel
    this.callbackFunction = function() {
      callbackFunction(...callbackFunctionArgs)
    }
    this.callbackFunctionArgs = callbackFunctionArgs
    this.css = css
    this.id = makeid(16)
    this.posX = posX
    this.posY = posY
  }
  render() {
    this.div = createDiv()
    var label = createElement('label', this.textLabel)
    label.style('cursor', 'pointer')
    nestElement(this.div, label)
    this.div.style('cursor', 'pointer')
    this.div.style('user-select', 'none')
    this.div.style('display', 'flex')
    this.div.style('align-items', 'center')
    this.div.style('justify-content', 'center')
    for (const property in this.css) {
      this.div.style(property, this.css[property])
    }
    if (this.posX == null) {
      this.div.position(this.posX, this.posY, 'relative')
    } else {
      this.div.position(this.posX, this.posY)
    }
    this.div.mouseClicked(this.callbackFunction)
    this.div.addClass('context-' + this.parentContext.id)
    this.div.id('button-' + this.id)
  }
  derender() {
    try {
      this.div.remove()
    } catch (e) {
      console.log(`Button ${this.id} not rendered, derender not executed.`)
    }
  }
}

class ButtonCollection {
  constructor(parentContext, css, posX, posY, buttons) {
    this.parentContext = parentContext
    this.css = css
    this.id = makeid(16)
    this.posX = posX
    this.posY = posY
    this.buttons = buttons
  }
  addButtons(buttons) {
    for (const button in buttons) {
      this.buttons.push(button)
    }
  }
  render() {
    this.div = createDiv()
    this.div.position(this.posX, this.posY)
    this.div.addClass('context-' + this.parentContext.id)
    this.div.id('buttonCollection-' + this.id)
    for (const property in this.css) {
      this.div.style(property, this.css[property])
    }
    console.log(this.buttons)
    for (const button in this.buttons) {
      this.buttons[button].render()
      nestElement(this.div, this.buttons[button].div)
    }
  }
  derender() {
    try {
      this.div.remove()
    } catch (e) {
      console.log(`ButtonCollection ${this.id} not rendered, derender not executed.`)
    }
  }
}

class Title {
  constructor(parentContext, textLabel, css, posX, posY) {
    this.parentContext = parentContext
    this.textLabel = textLabel
    this.css = css
    this.id = makeid(16)
    this.posX = posX
    this.posY = posY
  }
  render() {
    this.div = createDiv(this.textLabel)
    this.div.style('width', '100%')
    for (const property in this.css) {
      this.div.style(property, this.css[property])
    }
    this.div.position(this.posX, this.posY)
    this.div.addClass('context-' + this.parentContext.id)
    this.div.id('button-' + this.id)
  }
  derender() {
    try {
      this.div.remove()
    } catch (e) {
      console.log(`Title ${this.id} not rendered, derender not executed.`)
    }
  }
}

class ScoreCounter {
  constructor(parentContext, textLabel, css, posX, posY, initValue = 0) {
    this.parentContext = parentContext
    this.textLabel = textLabel
    this.css = css
    this.id = makeid(16)
    this.value = initValue
    this.posX = posX
    this.posY = posY
  }
  render() {
    this.div = createDiv(`${this.textLabel}: ${this.value}`)
    for (const property in this.css) {
      this.div.style(property, this.css[property])
    }
    this.div.position(this.posX, this.posY)
    this.div.addClass('context-' + this.parentContext.id)
    this.div.id('button-' + this.id)
  }
  derender() {
    try {
      this.div.remove()
    } catch (e) {
      console.log(`ScoreCounter ${this.id} not rendered, derender not executed.`)
    }
  }
  updateValue(value) {
    this.value = value;
    this.div.html(`${this.textLabel}: ${this.value}`)
  }
}