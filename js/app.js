//  Octopus model

var model = {
    currentCat : null,
    cats : [
        {
            clickCount : 0,
            name : 'Cat1',
            imgSrc : 'img/cat1.jpg'
        },
        {
            clickCount : 0,
            name : 'Cat2',
            imgSrc : 'img/cat2.jpg'
        },
        {
            clickCount : 0,
            name : 'Cat3',
            imgSrc : 'img/cat3.jpg'
        },
        {
            clickCount : 0,
            name : 'Cat4',
            imgSrc : 'img/cat4.jpg'
        },
        {
            clickCount : 0,
            name : 'Cat5',
            imgSrc : 'img/cat5.jpg'
        }
    ]
};

var octopus = {
    init : function(){
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
    },
    getCurrentCat : function(){
        return model.currentCat;
    },
    getCats : function(){
        return model.cats;
    },
    setCurrentCat : function(cat){
        model.currentCat = cat;
    },
    incrementCatCount : function(){
        model.currentCat.clickCount++;
        catView.render();
    },
    updateCat : function(name,src,count){
        model.currentCat.name=name;
        model.currentCat.imgSrc=src;
        model.currentCat.clickCount=count;
        catView.x='none';
        catListView.render();
        catView.render();
    }
};


var catView = {
    init : function(){
        this.catSpace = document.getElementsByClassName('cat-space')[0];
        this.catNameSpace = document.getElementById('catNameSpace');
        this.catImgSpace = document.getElementById('catImgSpace');
        this.catCountSpace = document.getElementById('catCountSpace');
        this.adminPanel = document.getElementById('admin-panel');
        this.adminButton = document.getElementById('admin-button');
        this.cancelButton = document.getElementById('cancel');
        this.submitButton = document.getElementById('submit');
        this.inputCatName = document.getElementById('input-cat-name');
        this.inputCatLink = document.getElementById('input-cat-link');
        this.inputCatCount = document.getElementById('input-cat-count');
        this.x = 'none'
        // increment counter on click
        this.catImgSpace.addEventListener('click',function(){
            octopus.incrementCatCount();
        });
        //event listener on admin button
        this.adminButton.addEventListener('click',function(){
            catView.x='block';
            catView.inputCatName.value = model.currentCat.name;
            catView.inputCatLink.value = model.currentCat.imgSrc;
            catView.inputCatCount.value = model.currentCat.clickCount;
            catView.render();
            
        });
        this.cancelButton.addEventListener('click',function(event){
            catView.x='none';
            catView.render();
            event.preventDefault();
        })
        this.submitButton.addEventListener('click',function(event){
            octopus.updateCat(catView.inputCatName.value, catView.inputCatLink.value, catView.inputCatCount.value);
            console.log(catView.inputCatName.value);
            event.preventDefault();
        })
        this.render();
    }, 
   render : function(){
       //update DOM element value from the currentCat 
       var currentCat = octopus.getCurrentCat();
       this.catCountSpace.textContent = currentCat.clickCount;
       this.catNameSpace.textContent = currentCat.name;
       this.catImgSpace.src = currentCat.imgSrc;
       this.adminPanel.style.display=this.x;

   }
};

var catListView = {
   init : function(){
       this.catListSpace = document.getElementsByClassName('content')[0];
       this.render();
   },
   render : function(){
       var cat,elem,i;
       // getsCats from octopus 
       // it will give the list of all cats
       var cats = octopus.getCats();
       // empty the catlistSpace 
       this.catListSpace.innerHTML = '';
       for(i=0; i<cats.length;i++){
           cat = cats[i];
           elem = document.createElement('div');
           elem.setAttribute('class','catName');
           elem.textContent = cat.name;
           
           //add eventlistener for this using imidiate-invoke-closure
           //
           elem.addEventListener('click',(function(catCopy){
               return function(){
                   // set this cat as currentCat into octopus
                   octopus.setCurrentCat(catCopy);
                   catView.render();
               };
           })(cat));

           //add element to space 
           this.catListSpace.appendChild(elem);
       }
   } 
};

// Run code
octopus.init();
