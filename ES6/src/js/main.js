let showProducts = (minPrice, maxPrice) => {
   console.log("hi");
if($(this).is(':checked')){
  $("#products li").hide().filter(function() {
        let price = parseInt($(this).data("price"), 10);
        return price >= minPrice && price <= maxPrice;
    }).show();
}else{
   $("#products li").hide().filter(function() {
        let price = parseInt($(this).data("price"), 10);
        return price >= minPrice && price <= maxPrice;
    }).show();
}
   
}

$(function() {
    let options = {
        range: true,
        min: 100,
        max: 1500,
        values: [100, 1500],
        slide: function(event, ui) {
            let min = ui.values[0],
                max = ui.values[1];

            $("#amount").val(" Rs. " + min + " - Rs. " + max);
            showProducts(min, max);
        }
    }, min, max;

    $("#slider-range").slider(options);

    min = $("#slider-range").slider("values", 0);
    max = $("#slider-range").slider("values", 1);

    $("#amount").val(" Rs. " + min + " - Rs. " + max);

    showProducts(min, max);

});

let data1 =  [
    { "id": 1, 
    "price": "500" 
     },
    { "id": 2, 
    "price": "1200" 
    },
    { "id": 3, 
    "price": "600" 
    },
    { "id": 4, 
    "price": "1500"
    }
  ]
let data = JSON.stringify( data1);
data1.forEach(obj => {
  $(`div.price#${obj['id']}`) .text(obj['price']);
  $(`.title`) .text("Flipkart");
  $(`.offers`) .text("Special Offers for You");
});