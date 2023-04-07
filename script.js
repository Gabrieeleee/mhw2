/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const C_IMAGE_URL ='./images/checked.png';
const U_IMAGE_URL ='./images/UNchecked.png';

function changeimg(event){

   const container = event;
   const check=container.querySelector('.checkbox');
  
    for(const box of container.parentNode.querySelectorAll('.checkbox')){
        box.src=  U_IMAGE_URL;  
    }

    check.src = C_IMAGE_URL;
    changebckg(container);
}

function changebckg(event){

    const container= event;
    
    for(const box of boxes1){
        if(box.dataset.questionId===container.dataset.questionId){
        box.classList.add("sfondogrigio");
        box.classList.remove("sfondoazzurro");
        }
    }
   
    container.classList.add("sfondoazzurro");
    container.classList.remove("sfondogrigio");
   
}





function addtext(risultato){
    const new_div = document.createElement('div');
    const new_h1 = document.createElement('h1');
    const new_p = document.createElement('p');
    const new_button = document.createElement('button');

    new_div.classList.add("risposta");
    new_button.classList.add("bott");

    const art=document.querySelector('article');
    art.appendChild(new_div);

    new_h1.textContent=RESULTS_MAP[risultato].title;
    new_p.textContent= RESULTS_MAP[risultato].contents;
    new_button.textContent='Ricomincia Quiz';
    new_div.appendChild(new_h1);
    new_div.appendChild(new_p);
    new_div.appendChild(new_button);
    new_button.addEventListener('click',reset);  
    
}



function risultato(){
    
    let conta=0;

    for(let i=0; i<3; i++){
        for(let j=0; j<3;j++){
            if(vet[i]===vet[j]){
            conta++;
            console.log(conta);
            if(conta>3)
            return vet[i];
            }
        }
    }
    return vet[0];
}



function reset(){

    for(const box of document.querySelectorAll('.checkbox ')){
            box.src=  U_IMAGE_URL; 
    }

    for(const box of boxes1){
        box.classList.remove("sfondoazzurro");
        box.classList.remove("sfondogrigio");
    }

    for(const box of boxes1){
            box.addEventListener('click',avviomeccanismo);  
    }
    
    for(let i=0;i<vet.length;i++){
        vet[i]=undefined;
    }

    const og= document.querySelector('div.risposta');
    og.remove();
    
}

function avviomeccanismo(event){
   
    const variabile = event.currentTarget;
    
    changeimg(variabile);
    
    if("one"===variabile.dataset.questionId){
        vet[0]=variabile.dataset.choiceId;
    }
    else if ("two"===variabile.dataset.questionId){
        vet[1]=variabile.dataset.choiceId;
    }
    else{
        vet[2]=variabile.dataset.choiceId;
    }

    if(vet[0]!==undefined && vet[1]!==undefined  && vet[2]!==undefined ){
        for(const box of boxes1){
            box.removeEventListener('click',avviomeccanismo);
        }
        const ris=risultato();
        addtext(ris);
    }

}


const vet=[];
const boxes1 = document.querySelectorAll('.choice-grid div ');
for(const box of boxes1){
    box.addEventListener('click',avviomeccanismo);  
}

