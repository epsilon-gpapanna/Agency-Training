

/* Json */
var data = ["Baby","Books","Car","Clothing","Electronics"];

/* function call */
function pages(page) {
  this.category = page;
  this.link = page+'.html';
}

/* looping the json for creating new json with links */
var dataArr = [];  /* array creation */

data.forEach(function(el){
    var newPage = new pages(el);   /* object creation */
    dataArr.push(newPage);
});


function autocomplete(inp, arr) {

  /* the autocomplete function takes two arguments,
   the text field element and an array of possible autocompleted values:
   */

  var currentFocus;

  /* execute a function when someone writes in the text field: */

  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
     
      closeAllLists();       /* close any already open lists of autocompleted values  */
     
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");   /* create a DIV element that will contain the items (values): */
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
     
      this.parentNode.appendChild(a);    /* append the DIV element as a child of the autocomplete container: */
      for (i = 0; i < arr.length; i++) {       /* for each item in the array...  */  
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {   /* check if the item starts with the same letters as the text field value: */   
          b = document.createElement("DIV");     /* create a DIV element for each matching element: */
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";      /* make the matching letters bold:  */
          b.innerHTML += arr[i].substr(val.length);      
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";    /* insert a input field that will hold the current array item's value: */    
          b.addEventListener("click", function(e) {      /* xecute a function when someone clicks on the item value (DIV element): */            
              inp.value = this.getElementsByTagName("input")[0].value;      /* insert the value for the autocomplete text field */
               for(j=0; j < dataArr.length;j++){
              if(inp.value == dataArr[j].category ){
                 window.location.href = dataArr[j].link;
              }
             }            
             
              closeAllLists();       /* close the list of autocompleted values, (or any other open lists of autocompleted values: */
          });
          a.appendChild(b);
        }
      }
  });


  /* execute a function presses a key on the keyboard:
  */
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {      
        currentFocus++;        /* If the arrow DOWN key is pressed,increase the currentFocus variable: */    
        addActive(x);        /* and and make the current item more visible: */
      } else if (e.keyCode == 38) { //up        
        currentFocus--;     /* If the arrow UP key is pressed, decrease the currentFocus variable: */     
        addActive(x);      /* and and make the current item more visible:*/
      } else if (e.keyCode == 13) {      
        e.preventDefault();      /*If the ENTER key is pressed, prevent the form from being submitted, */
        if (currentFocus > -1) {    
          if (x) x[currentFocus].click();        /* and simulate a click on the "active" item: */
        }
      }
  });
  function addActive(x) {
    if (!x) return false;  /* a function to classify an item as "active": */
    removeActive(x); /* start by removing the "active" class on all items: */
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
   
    x[currentFocus].classList.add("autocomplete-active");  /*add class "autocomplete-active":*/
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {            /*a function to remove the "active" class from all autocomplete items:*/
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");         /* close all autocomplete lists in the document, except the one passed as an argument: */
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  /* execute a function when someone clicks in the document: */
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/* initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values: */
autocomplete(document.getElementById("myInput"), data);