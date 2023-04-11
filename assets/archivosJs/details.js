const newCard = dataCard.eventos
//extrae la localizacion de document

let urlSearch = location.search
console.log(urlSearch)

const $detailscont = document.getElementById("maindetail")



let parametro = new URLSearchParams(urlSearch)



let idParams = parametro.get("id")


let cartasFiltradas  = newCard.find(evento => evento.name.replace(/ /g, "") == idParams)


$detailscont.innerHTML = pintarCarta(cartasFiltradas)


function pintarCarta(card){
return  `<div class="d-flex justify-content-center mt-5 mb-5 card" style="width: 80%; min-height: 66vh;">
    <div class="d-flex justify-content-center row g-0">
      <div class="col-md-4">
        <img src="${card.image}" class="paginaDeDetails" alt="${card.category}" style="width:100%; height: 100%;">
      </div>
      <div class="col-md-6">
        <div class="ms-5 card-body ">
          <h2 class="card-title">${card.name}</h2>
          <p class="card-text">
            <ul>
            <li>Date: ${card.date}</li>
            <li>Category: ${card.category}</li>
            <li>Place: ${card.place}</li>
            <li>Capacity: ${card.capacity}</li>
            ${card.assistance ? `<li>Assistance: ${card.assistance}</li>` : `<li>Estimate: ${card.estimate}</li>`}
            <li>Price: ${card.price}</li>
            <li>Description: ${card.description}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>`
}