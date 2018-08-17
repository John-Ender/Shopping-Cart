import {ShoppingCart} from "./shopping-cart";

const shoppingCart = new ShoppingCart();
const inventory = shoppingCart.getInventory();

shoppingCart.addItemToCart(inventory[0]);
shoppingCart.addItemToCart(inventory[1]);
shoppingCart.addItemToCart(inventory[2]);
shoppingCart.checkout('Output 1:');

shoppingCart.addItemToCart(inventory[3]);
shoppingCart.addItemToCart(inventory[4]);
shoppingCart.checkout('Output 2:');

shoppingCart.addItemToCart(inventory[5]);
shoppingCart.addItemToCart(inventory[6]);
shoppingCart.addItemToCart(inventory[7]);
shoppingCart.addItemToCart(inventory[8]);
shoppingCart.checkout('Output 3:');