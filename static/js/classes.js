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
  constructor(backgroundColor, backgroundImage = null, active = false) {
    this.active = active
    this.backgroundColor = backgroundColor
    this.backgroundImage = backgroundImage
    this.elements = []
    this.id = makeid(16)
  }
  addElements(elements) {
    elements.forEach(element => {
      this.elements.push(element)
    })
  }
  removeElement(element) {
    try {
      this.elements.splice(this.elements.indexOf(element), 1)
    } catch {
      console.log(`Could not find element ${element.id} in context ${this.id}.`)
    }
  }
  render() {
    this.active = true
    if (this.backgroundImage == null) {
      background(this.backgroundColor)
    } else {
      this.bg = createDiv()
      this.bg.style('background-image', `url(${this.backgroundImage})`)
      this.bg.style('background-repeat', 'no-repeat')
      this.bg.style('background-size', 'cover')
      this.bg.style('z-index', '-1000')
      this.bg.style('width', '99vw')
      this.bg.style('height', '99vh')
    }
    this.elements.forEach(element => {
      try {
        element.render()
      } catch {
        console.log(`Element ${element} in context ${this.id} not valid. Rendering not executed. Assuming custom element`)
      }
    })
  }
  derender() {
    if (this.bg != null) {
      this.bg.remove()
    }
    this.active = false
    this.elements.forEach(element => {
      try {
        element.derender()
      } catch {
        console.log(`Element ${element} in context ${this.id} not valid. Derendering not executed. Assuming custom element`)
      }
    })
  }
}

class Button {
  constructor(parentContext, textLabel, callbackFunc, callbackFunctionArgs, css, posX = null, posY = null, nestedElement = null, callbackFunctionClass = null) {
    this.parentContext = parentContext
    this.textLabel = textLabel
    if (callbackFunctionClass != null) {
      callbackFunc = callbackFunc.bind(callbackFunctionClass)
      this.callbackFunction = () => {
        callbackFunc(...callbackFunctionArgs)
      }
    } else {
      this.callbackFunction = () => {
        callbackFunc(...callbackFunctionArgs)
      }
    }
    this.callbackFunctionArgs = callbackFunctionArgs
    this.css = css
    this.id = makeid(16)
    this.posX = posX
    this.posY = posY
    this.nestedElement = nestedElement
  }
  render() {
    this.div = createDiv()
    if (this.nestedElement) {
      nestElement(this.div, this.nestedElement)
    }
    var label = createElement('label', this.textLabel)
    label.style('cursor', 'pointer')
    nestElement(this.div, label)
    this.div.style('cursor', 'pointer')
    this.div.style('user-select', 'none')
    this.div.style('display', 'flex')
    this.div.style('align-items', 'center')
    this.div.style('justify-content', 'center')
    this.div.style('flex-flow', 'columiconfriconn')
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
  move(x, y) {
    this.posX = x
    this.posY = y
    try {
      this.div.position(this.posX, this.poY)
    } catch (e) {
      console.log(`Button ${this.id} not rendered, move not executed.`)
    }
  }
}

class Target {
  constructor(context, game, css, posX, posY, nestedElement) {
    this.parentContext = context
    this.css = css
    this.id = makeid(16)
    this.posX = posX
    this.posY = posY
    this.nestedElement = nestedElement
    this.callbackFunction = () => {
      game.onHit()
      game.relocateTarget(this)
    }
  }
  render() {
    this.div = createDiv()
    if (this.nestedElement) {
      nestElement(this.div, this.nestedElement)
    }
    this.div.style('cursor', 'pointer')
    this.div.style('user-select', 'none')
    this.div.style('display', 'flex')
    this.div.style('align-items', 'center')
    this.div.style('justify-content', 'center')
    this.div.style('flex-flow', 'columiconfriconn')
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
    this.div.id('Target-' + this.id)
  }
  derender() {
    try {
      this.div.remove()
    } catch (e) {
      console.log(`Target ${this.id} not rendered, derender not executed.`)
    }
  }
  move(x, y) {
    this.posX = x
    this.posY = y
    try {
      this.div.position(this.posX, this.posY)
    } catch (e) {
      console.log(`Target ${this.id} not rendered, move not executed.`)
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

class DecorativeBox {
  constructor(parentContext, imageUrl, css, posX, posY) {
    this.parentContext = parentContext
    this.imageUrl = imageUrl
    this.css = css
    this.id = makeid(16)
    this.posX = posX
    this.posY = posY
  }
  render() {
    this.div = createDiv()
    this.div.style('background-image', `url(${this.imageUrl})`)
    this.div.style('background-repeat', 'no-repeat')
    this.div.style('background-size', 'cover')
    for (const property in this.css) {
      this.div.style(property, this.css[property])
    }
    this.div.position(this.posX, this.posY)
    this.div.addClass('context-' + this.parentContext.id)
    this.div.id('decbox-' + this.id)
  }
  derender() {
    try {
      this.div.remove()
    } catch (e) {
      console.log(`DecBox ${this.id} not rendered, derender not executed.`)
    }
  }
}