const BASE_URL = 'http://numbersapi.com'
const ul = document.querySelector('ul')
const ol = document.querySelector('ol')
const body = document.querySelector('body')

// Single Promise
axios
  .get(`${BASE_URL}/7/trivia?json`)
  .then(res => {
    const li = document.createElement('li')
    li.innerText = res.data.text
    ul.appendChild(li)
  })
  .catch(err => console.log(err))

// Batch Promise
axios
  .get(`${BASE_URL}/1..7/trivia?json`)
  .then(res => {
    for (const num in res.data) {
      if (Object.hasOwnProperty.call(res.data, num)) {
        const numFacts = res.data[num];

        const li = document.createElement('li')
        li.innerText = numFacts
        ol.appendChild(li)
      }
    }
  })
  .catch((err) => console.log(err))

// Promise all 
let fourNumberPromises = []

for (let i = 0; i < 4; i++) {
  fourNumberPromises.push(axios.get(`${BASE_URL}/7/trivia?json`))
}

Promise.all(fourNumberPromises)
  .then(numberArr => numberArr.forEach(num => {
    const p = document.createElement('p')
    p.innerText = num.data.text
    body.appendChild(p)
  }))
  .catch((err) => console.log(err))
