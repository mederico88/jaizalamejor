let carrito = document.querySelectorAll('.add-cart');
let productos = [
    {
        name:'Total 90 Rojo',
        tag: 'T90 rojo',
        precio: 100,
        enCarro: 0
    },
    {
        name:'Total 90 amarillo',
        tag: 'T90 amarillo',
        precio: 90,
        enCarro: 0
    },
    {
        name:'Total 90 Dorado',
        tag: 'T90 dorado',
        precio: 120,
        enCarro: 0
    }
];
//DON PAGINA PRINCIPAL

for(let i=0; i <carrito.length; i++){
    carrito[i].addEventListener('click', () => {
        carroNum(productos[i]);
        precioTotal(productos[i]);
    })
};

function carroNum(productos) {
    let numProducts = localStorage.getItem('carroNum');
    numProducts = parseInt(numProducts);
    if (numProducts ){
        localStorage.setItem('carroNum', numProducts + 1);
        document.querySelector('.carro span').textContent = numProducts+1;
    }else{
        localStorage.setItem('carroNum', 1);
        document.querySelector('.carro span').textContent = 1;
    }
    AnadirPP(productos);
}

function AnadirPP(productos){
    let itemsCarrito = localStorage.getItem('productosEnCarro');// extraer la variable de localStorage    
    itemsCarrito = JSON.parse(itemsCarrito);//transforma string en la fuentes
    console.log(itemsCarrito);
    if(itemsCarrito != null) {
        if(itemsCarrito[productos.tag]==undefined){
            itemsCarrito = {
                ...itemsCarrito,// transforma array [] a una lista de argumentos ()
                [productos.tag]:productos // this.tag= nombre del tag
            }
        }
        itemsCarrito[productos.tag].enCarro +=1;
    }else{
        productos.enCarro =1;
        itemsCarrito =  {
            [productos.tag]: productos
        }
    console.log(itemsCarrito);
    }
    localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));// remplaza el localstorage por "JSON.stringify(itemsCarrito)" ( convierte un objeto o valor de JavaScript en una cadena de texto)
}


function carroF5 (){
    let numProducts = localStorage.getItem('carroNum');
    if( numProducts){
        document.querySelector('.carro span').textContent = numProducts
    }
}

function precioTotal(productos) {
    let costoENcarro = localStorage.getItem('costoTotal');
    if(costoENcarro !=null){
        costoENcarro=parseInt(costoENcarro);
        localStorage.setItem("costoTotal", costoENcarro+productos.precio);
    }else{
        localStorage.setItem("costoTotal", productos.precio);
    }  
}
carroF5();
// Pagina del carrito

function dentroDELcarro(){
    let itemsCarrito = localStorage.getItem("productosEnCarro");
    itemsCarrito = JSON.parse(itemsCarrito);
    let productoscontenidos = document.querySelector(".productos");
    let costoENcarro = localStorage.getItem('costoTotal');
    
   
    if(itemsCarrito && productoscontenidos){
        productoscontenidos.innerHTML = '';
        Object.values(itemsCarrito).map(item => {
            productoscontenidos.innerHTML += `
            <div class="cadaElemento">
                <div class="productico">
                    <a href="#" name="borrar" class="iconos fa fa-trash"></a>
                    <img src="../imagen/${item.tag}.jpg">
                    <span>${item.tag}</span>
                </div>
                <div class="precio"><span>$${item.precio},00</span></div>
                <div class="cantidades">
                    <a href="#" name="incrementar" class="iconos fa fa-arrow-up"></a>
                    <span>${item.enCarro}</span>
                    <a href="#" name="decrementar" class="iconos fa fa-arrow-down"></a>
                </div>
                <div class="totales">
                <span>$${item.enCarro * item.precio},00</span>
                </div>
            </div>
            `
        })
        productoscontenidos.innerHTML += `
            <div class="compraTotalContenido">
                <h4 class="compraTotalTITULO">COMPRA TOTAL</h4>
                <h4 class="compraTotal">
                    $${costoENcarro},00
                </h4>
            </div>
        `
    }
}
dentroDELcarro();
// actividades de compras
let botones = document.querySelector('.productos');

function clickBotones (element) {
    let itemsCarrito = localStorage.getItem('productosEnCarro'); 
    let costoENcarro = localStorage.getItem('costoTotal');
    let numProducts = localStorage.getItem('carroNum');
    let padre=element.parentElement.parentElement;
    let tag,numCarrito;
    itemsCarrito = JSON.parse(itemsCarrito);
    numProducts = parseInt(numProducts);
    costoENcarro=parseInt(costoENcarro);
    
         if (element.name === 'borrar') {
            //padre span nombre tag
            tag=padre.getElementsByTagName('span')[0].innerText;
           //precio de la comprar total
           let totalPrecio=itemsCarrito[tag].enCarro*itemsCarrito[tag].precio;
           localStorage.setItem("costoTotal", costoENcarro-totalPrecio);
           //Eliminar carritos
           numCarrito=itemsCarrito[tag].enCarro;
           localStorage.setItem('carroNum', numProducts -numCarrito);
           document.querySelector('.carro span').textContent = numProducts-numCarrito;
           //eliminar el objeto
           delete itemsCarrito[tag];
           //sobreescribir el objeto
           localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));
           //mostar objetos
           dentroDELcarro();
         }
         if (element.name === 'incrementar') {
             //aumentar carritos
            localStorage.setItem('carroNum', numProducts+1);
            document.querySelector('.carro span').textContent = numProducts+1;
            //padre span nombre tag
            tag=padre.getElementsByTagName('span')[0].innerText;
            itemsCarrito[tag].enCarro = itemsCarrito[tag].enCarro +1;
            localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));
            localStorage.setItem("costoTotal", costoENcarro+itemsCarrito[tag].precio);
            console.log(itemsCarrito);
            dentroDELcarro();
         }
         if (element.name === 'decrementar') {
             //padre span nombre tag
             tag=padre.getElementsByTagName('span')[0].innerText;
             console.log(numProducts);
             console.log(itemsCarrito[tag].enCarro);
             //disminuir carritos Y CostoTotal
             if (itemsCarrito[tag].enCarro==0) {
                localStorage.setItem('carroNum', numProducts);
                document.querySelector('.carro span').textContent = numProducts;
                delete itemsCarrito[tag];
             } else {
                localStorage.setItem('carroNum', numProducts-1);
                document.querySelector('.carro span').textContent = numProducts-1;
                itemsCarrito[tag].enCarro = itemsCarrito[tag].enCarro -1;
                localStorage.setItem("costoTotal", costoENcarro-itemsCarrito[tag].precio);
             }
             localStorage.setItem("productosEnCarro", JSON.stringify(itemsCarrito));
             console.log(itemsCarrito);
             dentroDELcarro();
        }
}
    
if(botones != null){
            botones.addEventListener('click',function(e){
            clickBotones(e.target);
})};



