var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express();
var players = require("./players")
var methodOverride = require('method-override');
var fs = require('fs');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// 3000/players
app.get("/players", function(req, res) {
  res.json(players);
});

// 3000/players
app.post("/players", function(req, res) {
  // generate a new id and create a new player.
  var id = players.length;
  var newPlayer = {
    id: id,
    name: req.body.name,
    score: req.body.score
  };
  createPlayer(newPlayer);

  res.redirect('/players/' + players.id);
});


function createPlayer(newPlayer) {
  writePlayer(newPlayer);
}

// Converts the given player to JSON and saves the list to a permanent file.
function writePlayer(newPlayer) {
  var json = JSON.stringify(newPlayer);
  fs.writeFileSync('./players.json', json);
}



// 3000/players/*
app.get("/players/:id", function(req, res) {
  var requestedID = req.params.id
  //making the url id a variable requestedID so we can work with it
  var requestedPlayer
  //defining a variable requestedPlayer that we can respond with
  for (var i = 0; i < players.length; i++) {
    if (players[i].id==requestedID) {
      console.log(players[i]);
      requestedPlayer = players[i]
    }
  }
  res.json(requestedPlayer);
});







app.listen(3000, () => {
  console.log('Server Listening on port 3000')
})




// var path = require('path');


// configure app to use ejs for templates
// app.set('view engine', 'ejs');

// tell our server where our static files live.
// var staticPath = path.join(__dirname, 'static');
// app.use(express.static(staticPath));



//
//
// // READ
// app.get("/products", function(req, res) {
//   var products = getProducts();
//   res.render('products_all', {products: products});
// });
//
// app.get("/products/:id", function(req, res) {
//   var product = getProduct(req.params.id);
//   res.render('product_detail', {product: product});
// });
//
// // UPDATE (get an HTML page where user fills values in)
// app.get("/products/:id/edit", function(req, res) {
//   var product = getProduct(req.params.id);
//   res.render('product_edit', {product: product});
// });
//
// // UPDATE (this route accept info from the HTML form)
// app.put("/products/:id", function(req, res) {
//   var product = getProduct(req.params.id);
//   product.id = req.params.id;
//   ///// NOTE!!! For ID, it is retrieved from PARAMS (URL), and NOT body!!!????
//   product.name = req.body.name;
//   product.price = req.body.price;
//   product.quantity = req.body.quantity;
//   product.description = req.body.description;
//
//   editProduct(product);
//
//   res.redirect('/products/' + product.id);
// });
//
// app.delete("/products/:id", function(req, res) {
//   console.log("DELETE", req.params.id);
//   deleteProduct(req.params.id);
//   res.redirect("/products");
// });
//
// console.log("You're listening to the smooth smooth sounds of http://localhost:3000");
// app.listen(3000);
//
// function getProducts() {
//   // Load the todo list from a file.
//   var productsJSON = fs.readFileSync('./products.json');
//   products = JSON.parse(productsJSON);
//   return products;
// }
//
// function getProduct(id) {
//   var products = getProducts();
//
//   var product = undefined;
//   for (var i = 0; i < products.length; i++) {
//     if (products[i].id === id) {
//       product = products[i];
//     }
//   }
//   return product;
// }
//
//
// for (var i = 0; i < array.length; i++) {
//   array[i]
// }
//
// function editProduct(newProductInfo) {
//   var products = getProducts();
//
//   // find the product in the original dataset
//   var product = undefined;
//   for (var i = 0; i < products.length; i++) {
//     if (products[i].id === newProductInfo.id) {
//       // replace the old into with the new info.
//       products[i] = newProductInfo;
//     }
//   }
//
//   // write all the products back to file.
//   writeProducts(products);
// }
//
// function createProduct(newProduct) {
//   var products = getProducts();
// o
//
//   writeProducts(products);
// }
//
// function deleteProduct(id) {
//   console.log("delete", id);
//   var products = getProducts();
//   products = products.filter(function(product) {
//     // only keep products that don't have the id of the
//     // product we're deleting.
//     return product.id !== id;
//   })
//
//   writeProducts(products);
// }
//
// // Converts the given products to JSON and saves the list to a permanent file.
// function writeProducts(products) {
//   var json = JSON.stringify(products);t
//   fs.writeFileSync('./products.json', json);
// }
