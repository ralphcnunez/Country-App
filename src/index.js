document.addEventListener('DOMContentLoaded', () => {
   const endPoint = 'https://country.register.gov.uk/records.json?page-size=5000';
   let cardStorage = {}
   let counter = 0
   const body = document.body
   let zero = 1

   let divCreator = info => {
     fetch(`https://pixabay.com/api/?key=10549709-40806f55d6e832981ab4bb943&q=${info.name}&image_type=photo`)
       .then(r => r.json())
       .then(data => {
         let y = zero ++
          let x = data.hits[0].largeImageURL
          cardStorage[y] = x
          console.log(cardStorage[y])
          let newCard = document.createElement('DIV')
        newCard.setAttribute('class','flip-card')
        newCard.innerHTML += `<div  class="flip-card-inner">

         <div  class="flip-card-front">
          <h1> ${info.name} </h1>
          <p> ${counter} </p>
          <img src=${cardStorage[y]} width= '250px' id =${counter} >
         </div>

        <div  class="flip-card-back">
          <h1> ${info['official-name']}
          <p>${info['citizen-names']}</p>
          <p> ${info['country']} </p>
        </div>

      </div>`
      body.append(newCard)
      })
    }





   // fetch the names of the countries
  function firstRound(){
    fetch(`https://country.register.gov.uk/records.json?page-size=5000`)
      .then(r => r.json())
      .then(data => {
        let arrData = Object.values(data)
        const yolo = arrData.slice(1,5)
        yolo.map(x => {
          counter ++
        const dataObj = x.item[0]
        divCreator(dataObj)

      })
    })
  }



  firstRound()


})
