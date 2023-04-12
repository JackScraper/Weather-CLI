import axios from "axios";

// const weatherApi = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
//     params: {
//         q: 'London',
//         appid: '1a898ec880e42bc06fb0394bfb4ee423',
//         lang: 'en',
//         units: 'metric'
//     }
// })
// console.log(weatherApi)

const randomApiAnswer = await axios.get('https://puzzle.mead.io/puzzle')
console.log(randomApiAnswer.data)

const randomApiAnswer2 = await axios.get('https://puzzle.mead.io/puzzle')
console.log(randomApiAnswer2.data)

const randomApiAnswer3 = await axios.get('https://puzzle.mead.io/puzzle')
console.log(randomApiAnswer3.data)