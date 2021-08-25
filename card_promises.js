const BASE_URL = 'http://deckofcardsapi.com/api/deck'

// #1
axios
  .get(`${BASE_URL}/new/draw?count=1`)
  .then(res => {
    value = res.data.cards[0].value
    suit = res.data.cards[0].suit
    console.log(`${value} of ${suit}`)
  })
  .catch(err => console.log(err))

// #2
axios
  .get(`${BASE_URL}/new/draw?count=1`)
  .then(res => {
    value = res.data.cards[0].value
    suit = res.data.cards[0].suit
    deck_id = res.data.deck_id
    console.log('First request', `${value} of ${suit}`)
    return axios.get(`${BASE_URL}/${deck_id}/draw?count=1`)
  })
  .then(res => {
    value = res.data.cards[0].value
    suit = res.data.cards[0].suit
    console.log('Second request', `${value} of ${suit}`)
  })
  .catch(err => console.log(err))


// #3
const btn = document.querySelector('button')
const body = document.querySelector('body')
let deck_id
let z = 1

// Grab a new deck
axios
  .get(`${BASE_URL}/new/shuffle?deck_count=1`)
  .then((res) => {
    deck_id = res.data.deck_id
  })
  .catch((err) => console.log(err))

/** Event Handler for drawing a card from the deck. */
function drawCard() {
  axios
    .get(`${BASE_URL}/${deck_id}/draw/?count=1`)
    .then((res) => {
      // Checks if deck is empty
      remaining = res.data['remaining']
      
      if (remaining === 0) {
        btn.removeEventListener('click', drawCard)
      }

      // Separate response values
      value = res.data.cards[0]['value']
      suit = res.data.cards[0]['suit']
      image = res.data.cards[0]['image']
      
      // Create and add img to DOM
      img = document.createElement('img')
      img.setAttribute('src', image)
      img.style['z-index'] = z
      // Add rotation
      let angle = Math.random() * 90 - 45
      let randomX = Math.random() * 40 - 20
      let randomY = Math.random() * 40 - 20
      
      img.style[
        'transform'
      ] = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`

      body.appendChild(img)

      z += 1
    })
    .catch((err) => console.log(err))
}

btn.addEventListener('click', drawCard)