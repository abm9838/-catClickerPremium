
// js for 5 cat clicker

document.body.innerHTML='';
document.body.style.background = "#262924";

var nums = ['cat1','cat2','cat3','cat4','cat5'];
var catList = document.createElement('div');
catList.setAttribute('class','content');


for(var i=0; i<nums.length ; i++){
    var num = nums[i];

    var elem = document.createElement('div');
    elem.setAttribute('class','catName');
    elem.textContent = num;
    elem.style.color="white";
    elem.addEventListener('click',(function(numCopy){
        return function(){
            draw(numCopy);
        };
    })(num));

    catList.appendChild(elem);
}

document.body.appendChild(catList);
var clickCount = [0,0,0,0,0]; 
var catSrc = ['cat1.jpg','cat2.jpg','cat3.jpg','cat4.jpg','cat5.jpg'];
var display = document.createElement('div');
display.setAttribute('class','catSpace');
 var catName = document.createAttribute('h2');
 var catImg = document.createAttribute('img');
 var catClick = document.createAttribute('p');
 document.body.appendChild(display);
 

function draw(cat){
    display.innerHTML="<h2>"+cat+"</h2><img class=\""+cat+ "\" src=\"img/"+cat+".jpg\" alt=\"cat1\"><p> Clicks : <span class=\"count\">"+clickCount[cat[3]-1]+"</span></p>";
    var image = document.getElementsByTagName('img');
    console.log(image);
    image[0].addEventListener('click',(function(count){
        
        return function(){
            clickCount[count]+=1;    
            var cVal = document.getElementsByClassName('count');
            cVal[0].innerHTML=clickCount[count];
            //console.log(cVal);
        };
    })(cat[3]-1));

}
/*

elem.addEventListener('click',(function(numCopy){
        return function(){
            draw(numCopy);
        };
    })(num));
*/