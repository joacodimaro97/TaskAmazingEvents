const $contenedor = document.getElementById("section-past")


const newCard = []
const fecha = dataCard.fechaActual
for( let cards of dataCard.eventos){
    if(cards.date < fecha ){
        newCard.push( cards )
    } 
}

let staff = ""
for(let cards of newCard ){
    staff += createCards( cards)
}

$contenedor.innerHTML = staff

function createCards(newCard){
    return `
    <div id="1" class="card d-flex justify-content-center m-2" style="width: 18rem">
         <img src="${newCard.image}" class="card-img-top p-1" alt="${newCard.category}" style="width:18rem; height: 10rem;">
           <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title">${newCard.name}</h5>
              <p class="card-text">${newCard.description}</p>
             <div class=" d-flex flex-row justify-content-between">
               <p>$${newCard.price}</p>
               <a href="./pages/details.html" class="btn vermas btn-primary">See more..</a>
             </div>
           </div>
    </div>
`
}
