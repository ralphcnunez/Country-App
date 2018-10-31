
document.addEventListener('DOMContentLoaded', () => {
   const endPoint = 'https://country.register.gov.uk/records.json?page-size=5000';
   let cardStorage = {}
   let divStorage = {}
   let counter = 0
   let body = document.getElementById('body')
   let zero = 1

   let search = document.getElementById('search')


   search.addEventListener('input', (e) => {
     let input = e.target.value
     let countryArr = Object.values(divStorage)
     let filteredCtr = countryArr.filter(place => place.id.includes(input))
     let z = document.getElementById('body')
      z.innerHTML = ''
      filteredCtr.map(el => z.append(el))




   })


   let divCreator = info => {
     fetch(`https://pixabay.com/api/?key=10549709-40806f55d6e832981ab4bb943&q=${info.name}&image_type=photo`)
       .then(r => r.json())
       .then(data => {
         let y = zero ++
          let x = data.hits[0].largeImageURL
          cardStorage[y] = x
          let newCard = document.createElement('DIV')
        newCard.setAttribute('class','flip-card')
        newCard.setAttribute('id', `${info.name.toLowerCase()}`)
        newCard.innerHTML += `<div  class="flip-card-inner">

         <div  class="flip-card-front">
          <h1> ${info.name} </h1>
          <img src=${cardStorage[y]} width= '250px' id =${counter} >
         </div>

        <div  class="flip-card-back">
          <h1> Country Name: ${info['official-name']}
          <p>Citizen's Proper Name: ${info['citizen-names']}</p>
          <p> Country Acronym: ${info['country']} </p>
        </div>
      </div>`
      divStorage[info.name.toLowerCase()] = newCard
      body.append(newCard)

      })
    }



   // fetch the names of the countries
  function firstRound(){
    fetch(`https://country.register.gov.uk/records.json?page-size=5000`)
      .then(r => r.json())
      .then(data => {
        let arrData = Object.values(data)
        const yolo = arrData.slice(1,200)
        yolo.map(x => {
          counter ++
        const dataObj = x.item[0]
        divCreator(dataObj)

      })
    })
  }
  firstRound()



})
