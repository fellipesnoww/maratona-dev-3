
//Pega o botao e adiciona um evento a ele
document.querySelector('header button').addEventListener("click", function(){
    event.preventDefault();

    document.querySelector('.form').classList.toggle("hide");        //Se tiver a classe hide tira, caso contrario, ele adiciona
});
