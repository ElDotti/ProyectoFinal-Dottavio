let productos = [
    {
        nombre: "Chanelle",
        img: "./assets/img/chanelle.png",
        id: 1,
        precio: 7800
    },
    {
        nombre: "Gabrielle",
        img: "./assets/img/gabrielle.png",
        id: 2,
        precio: 5500
    },
    {
        nombre: "Gold",
        img: "./assets/img/gold.png",
        id: 3,
        precio: 2500
    },
    {
        nombre: "Goldewa",
        img: "./assets/img/Goldewa.png",
        id: 4,
        precio: 5000
    },
    {
        nombre: "Nisanto",
        img: "./assets/img/nisanto.png",
        id: 5,
        precio: 8500
    },
    {
        nombre: "Rosseto",
        img: "./assets/img/rosseto.png",
        id: 6,
        precio: 9000
    }
]
let vacio = 0
let elementos = document.querySelector(".elementos")
let carritoArr = JSON.parse(localStorage.getItem("carrito")) || []
let carrito = document.getElementById(`carrito`)

function cartas(){
productos.forEach((i) => {
    elementos.innerHTML += `<div> <img src="${i.img}">
                            <h2> ${i.nombre} </h2>
                            <h3> $${i.precio} </h3>
                            <button id="boton${i.id}"> Comprar </button> </div>`

})
botones()

}
cartas()

function botones(){
    productos.forEach((i) =>{
        document.getElementById(`boton${i.id}`).addEventListener(`click`, () =>{
            agregarAlCarro(i)
            
                          
        })
    })
    

}

function agregarAlCarro(i){

    let existe = carritoArr.some((elemento) => elemento.id == i.id);
    if (existe == false){
        i.cantidad = 1
        carritoArr.push(i)
    }
    else{
        let miProd = carritoArr.find((elemento) => elemento.id == i.id);
        miProd.cantidad++;
    }
    localStorage.setItem("carrito", JSON.stringify(carritoArr))
    
    mostrarCarro()
    vacio = 1
    }
function mostrarCarro(){
    carrito.innerHTML = ""
    carritoArr.forEach((i)=>{
        carrito.innerHTML += `<div><h2> ${i.nombre} $${i.precio} c/${i.cantidad} </h2>
                              <button id="borrador${i.id}">Eliminar uno </button> </div>
                              `

    
    })
    carrito.innerHTML += `<div>
                            <button id="borrarFinal">Eliminar todo</button>
                            <button id="botonFinal">Comprar</button> </div> `
    final()
    borrarFinal()

    borrador()
}
function borrador (){
    carritoArr.forEach((i)=>{
        document.getElementById(`borrador${i.id}`).addEventListener(`click`, () =>{
            borrar(i)
            console.log(i)
        })
    
    })
}
function borrar(i){
    if (i.cantidad == 1){
        console.log("hola")
        let pos = carritoArr.indexOf(i)
        carritoArr.splice(pos,1)
        mostrarCarro()
    }
    else{
       i.cantidad--;
        mostrarCarro()
    }
    localStorage.setItem("carrito", JSON.stringify(carritoArr))

    

}
function final(){
    document.getElementById(`botonFinal`).addEventListener(`click`,() =>{
        if(carritoArr == 0){
            Swal.fire('No hay nada que comprar', '', 'error')
        }
        else{
            Swal.fire({
                title: 'Seguro que deseas comprar?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Comprar',
                denyButtonText: `No comprar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Compra realizada!', '', 'success')
                        localStorage.clear()
                        carritoArr = []
                        console.log(carritoArr)
                        mostrarCarro()
                }
                  
                  
                 else if (result.isDenied) {
                  
                }
              }) 
        }
        
    })
}
function borrarFinal(){
    document.getElementById(`borrarFinal`).addEventListener(`click`,() =>{
        if(carritoArr == 0){
            Swal.fire('No hay nada que eliminar', '', 'error')
        }
        else{
            Swal.fire({
                title: 'Seguro que deseas eliminar el carrito?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Eliminar',
                denyButtonText: `No eliminar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Eliminado!', '', 'success')
                        localStorage.clear()
                        carritoArr = []
                        console.log(carritoArr)
                        mostrarCarro()
                }
                  
                  
                 else if (result.isDenied) {
                  
                }
              }) 
        }
        
    })
}
mostrarCarro()


fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
.then ((response) => response.json())
.then ((datos) =>{
    let salida = ""
    let suma = 0
    datos.forEach(i => {
        salida += `<div class="tarjeta">
                     <h3> Nombre: ${i.name} </h3>
                     <h5> Email: ${i.email} </h5>
                     <p> ${i.body}</p> 
                   </div>`
        suma = suma + 1
                    
    })
    document.getElementById("clientes").innerHTML = salida

})

