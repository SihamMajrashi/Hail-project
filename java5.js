var ShoppingCart = (function($) {
  "use strict";
  
  // Cahce necesarry DOM Elements
  var productsEl = document.querySelector(".products"),
      cartEl =     document.querySelector(".shopping-cart-list"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".cart-checkout"),
      totalPriceEl = document.querySelector(".total-price");

    

  // Fake JSON data array here should be API call
  var products = [
    {
      id: 0,
      name: " ضيافة الروينا ",
      description: "منظمات للمنصه وكاشفات جوالات بجهاز كشف الجوالات وديجى وطاولات استقبال وطاولات بعد العشا وطاولات كوفى وانواع الشاهى ومانعات مغاتير  وتنسيق طاولات الضيوف وتجهيزها بالورود والمناديل وزجاجات المويا . ويوجد لدينا قسم خاص لحفلات الاطفال واجتماعات الاعياد للنساء",
      imageUrl: "https://imgcdn.haraj.com.sa/userfiles30/2017-10-2/780x780-1_-tsXYRYynJi3KbB.jpg",
      price: 1000
    },
    {
      id: 1,
      name: " فانيلا للضيافه ",
      description: " جاهزون لتغطية كافة مناسباتكم وأفراحكم بمختلف الحلويات وقوالب الكيك بأشكال مختلفة وكلها من صناعات منزلية وبأنامل سعودية، يوجد لدينا الحلويات المختلفة وغيرها الكثير من المأكولات اللذيذة التي ستغني افراحكم وتكونوا عند حسن ضيوفكم",
      imageUrl: "https://i.saudi-arabia.zafaf.net/gallery/39180/preview_ubuggvetvvtiwrxxbhqrcygbz.jpg",
      price: 2000,
    },
    {
      id: 2,
      name: "  عصائر التوت العربي للضيافة ",
      description: "نسيق الطاولات, قائمة طعام على الطلب, خدمة توصيل, طاقم خدمة, قهوجية",
      imageUrl: "https://i.saudi-arabia.zafaf.net/gallery/46458/preview_aas-r-ltot-laarby-lldy-f_219cTimX.jpg",
      price: 3000
    }
  ],
  


  
    productsInCart = [];
      
      
  
  // Pretty much self explanatory function. NOTE: Here I have used template strings (ES6 Feature)



var generateProductList = function() {
    products.forEach(function(item) {
      var productEl = document.createElement("div");
      if(productEl.className = "product"){
            productEl.innerHTML = `<div class="product-image">
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span>الاسم : </span> ${item.name}</div>
                             <div class="product-description"><span>الوصف:</span> ${item.description}</div>
                             <div class="product-price"><span>السعر:</span> ${item.price}$</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button see-more">More Details</a>
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
                          </div>
`;

      }


      

     
    
                             
productsEl.appendChild(productEl);

    });
  }
  
  // Like one before and I have also used ES6 template strings
  var generateCartList = function() {
    
    cartEl.innerHTML = "";
    
    productsInCart.forEach(function(item) {
      var li = document.createElement("li");
      li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
      cartEl.appendChild(li);
    });
    
    productQuantityEl.innerHTML = productsInCart.length;
    
    generateCartButtons()
  }
  
  
  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function() {
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block"
      totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }
  
  // Setting up listeners for click event on all products and Empty Cart button as well
  var setupListeners = function() {
    productsEl.addEventListener("click", function(event) {
      var el = event.target;
      if(el.classList.contains("add-to-cart")) {
       var elId = el.dataset.id;
       addToCart(elId);
      }
    });
    
    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("Are you sure?")) {
        productsInCart = [];
      }
      generateCartList();
    });
  }
  
  // Adds new items or updates existing one in productsInCart array
  var addToCart = function(id) {
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }
  
  
  // This function checks if project is already in productsInCart array
  var productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.price *  item.quantity);
    }, 0);
  }
  
  // This functon starts the whole application
  var init = function() {
    generateProductList();
    setupListeners();
  }
  
  // Exposes just init function to public, everything else is private
  return {
    init: init
  };
  
  // I have included jQuery although I haven't used it
})(jQuery);







ShoppingCart.init();