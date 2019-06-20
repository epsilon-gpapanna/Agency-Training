"use strict";

var products;
var brandsArr = []; // to fetch JSON Data

fetch("../js/json/data.json").then(function (response) {
  return response.json();
}).then(function (res) {
  products = res;
  listing.createTemplate(res);
})["catch"](function (error) {
  return console.error('Error:', error);
});
var listing = {
  createTemplate: function createTemplate(res) {
    var outputTemplate = '';
    res.map(function (product) {
      outputTemplate += listing.productTemplate(product);
    });
    document.getElementById('listing').innerHTML = outputTemplate;
  },
  productTemplate: function productTemplate(data) {
    return "<div class=\"col-md-3 col-sm-6\">\n        <div class=\"product-grid\">\n            <div class=\"product-image\">\n                <a href=\"#\">\n                    <img class=\"pic-1\" src=\"".concat(data.imageUrl, "\">                    \n                </a>\n                <ul class=\"social\">\n                    <li><a href=\"\" data-tip=\"Quick View\"><i class=\"fa fa-search\"></i></a></li>\n                    <li><a href=\"\" data-tip=\"Add to Wishlist\"><i class=\"fa fa-shopping-bag\"></i></a></li>\n                    <li><a href=\"\" data-tip=\"Add to Cart\"><i class=\"fa fa-shopping-cart\"></i></a></li>\n                </ul>\n                <span class=\"product-new-label\">sale</span>\n                <span class=\"product-discount-label\">").concat(data.starRating, " *</span>\n            </div>\n            <ul class=\"rating\">\n                <li class=\"fa fa-star\"></li>\n                <li class=\"fa fa-star\"></li>\n                <li class=\"fa fa-star\"></li>\n                <li class=\"fa fa-star\"></li>\n                <li class=\"fa fa-star disable\"></li>\n            </ul>\n            <div class=\"product-content\">\n                <h3 class=\"title\"><a href=\"#\">").concat(data.productName, "</a></h3>\n                <div class=\"price\">").concat(data.price, "\n                    <span>$20.00</span>\n                </div>\n                <a class=\"add-to-cart\" href=\"\">+ Add To Cart</a>\n            </div>\n        </div>\n    </div>");
  },
  filter: function filter(id, divid) {
    document.getElementById(divid).checked ? listing.brandUpdate(id, true) : listing.brandUpdate(id, false);
    var filterdProducts = [];
    products.forEach(function (product) {
      brandsArr.forEach(function (el) {
        if (el === product.brand) {
          filterdProducts.push(product);
        }
      });
    });
    filterdProducts.length > 0 ? listing.createTemplate(filterdProducts) : listing.createTemplate(products);
  },
  brandUpdate: function brandUpdate(id, status) {
    if (status) {
      brandsArr.push(id);
    } else {
      brandsArr = brandsArr.filter(function (brandId) {
        return id !== brandId;
      });
    }
  },
  filterPrice: function filterPrice() {
    var minPrice = document.getElementById('price-min').value;
    var maxPrice = document.getElementById('price-max').value;
    var filterdProducts = products.filter(function (product) {
      return product.price < maxPrice && product.price > minPrice;
    });
    listing.createTemplate(filterdProducts);
  }
};