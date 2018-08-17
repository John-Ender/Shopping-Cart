import {ShoppingCart} from "../src/shopping-cart";

import * as _ from "lodash";

describe('Shopping Cart Initialization', () => {
    it('Should be defined', () => {
        const shoppingCart = new ShoppingCart();
        expect(shoppingCart).toBeDefined('Shopping cart returned undefined');
    });

    it('Check Initialization', () => {
        const shoppingCart = new ShoppingCart();
        const inventory = shoppingCart.getInventory();
        expect(inventory).toBeDefined('Shopping cart inventory is undefined');
        expect(inventory.length).toEqual(9,'Shopping cart inventory != to 9');

        const cart = shoppingCart.getShoppingCart();
        expect(cart).toBeDefined('Shopping cart internal cart is undefined');
        expect(cart.length).toEqual(0,'Shopping cart should be empty');
    });
});

describe('Shopping Cart Adds and Removes Items Correctly', () => {
    it('Add/Remove invalid item', () => {
        const shoppingCart = new ShoppingCart();
        const cart = shoppingCart.getShoppingCart();
        const cartSize = _.cloneDeep(cart.length);

        const invalidItem = {_id: 10, price: 2, description: ''};
        expect(shoppingCart.addItemToCart(invalidItem)).toBeFalsy();
        expect(cart.length).toEqual(cartSize,'Shopping cart should be empty');

        shoppingCart.removeItemFromCart(invalidItem);
        expect(cart.length).toEqual(cartSize,'Shopping cart should be empty');

        // Add an item that similar to one already in the inventory that shares an _id
        const modifiedItem = {_id: 1, price: 16.00, description: 'I changed this'};
        expect(shoppingCart.addItemToCart(modifiedItem)).toBeFalsy();
        expect(cart.length).toEqual(cartSize,'Shopping cart should be empty');

        shoppingCart.removeItemFromCart(invalidItem);
        expect(cart.length).toEqual(cartSize,'Shopping cart should be empty');
    });

    it('Add/Remove one valid item', () => {
        const shoppingCart = new ShoppingCart();
        const cart = shoppingCart.getShoppingCart();
        let expectedCartSize = 1;
        let expectedItemAmount = 1;

        const inventory = shoppingCart.getInventory();
        expect(shoppingCart.addItemToCart(inventory[0])).toBeTruthy();
        expect(cart.length).toEqual(expectedCartSize);
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should be incremented');

        expectedItemAmount += 1;
        expect(shoppingCart.addItemToCart(inventory[0])).toBeTruthy();
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should be incremented');

        expectedItemAmount -= 1;
        shoppingCart.removeItemFromCart(inventory[0]);
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should be decremented');

        expectedCartSize = 0;
        shoppingCart.removeItemFromCart(inventory[0]);
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
    });

    it('Add/Remove one valid item with non-defaulted amount', () => {
        const shoppingCart = new ShoppingCart();
        const cart = shoppingCart.getShoppingCart();
        let expectedCartSize = 1;
        let amountToAdd = 2;
        let expectedItemAmount = 2;

        const inventory = shoppingCart.getInventory();
        expect(shoppingCart.addItemToCart(inventory[0], amountToAdd)).toBeTruthy();
        expect(cart.length).toEqual(expectedCartSize);
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should be incremented');

        amountToAdd = 7;
        expectedItemAmount += amountToAdd;
        expect(shoppingCart.addItemToCart(inventory[0], amountToAdd)).toBeTruthy();
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should be incremented');

        amountToAdd = 0;
        expectedItemAmount += amountToAdd;
        expect(shoppingCart.addItemToCart(inventory[0], amountToAdd)).toBeTruthy();
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should remain the same');

        amountToAdd = -1;
        expect(shoppingCart.addItemToCart(inventory[0], amountToAdd)).toBeFalsy();
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should remain the same');

        let amountToRemove = 0;
        expectedItemAmount -= amountToRemove;
        shoppingCart.removeItemFromCart(inventory[0], amountToRemove);
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should remain the same');

        amountToRemove = -1;
        shoppingCart.removeItemFromCart(inventory[0], amountToRemove);
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should remain the same');

        amountToRemove = 7;
        expectedItemAmount -= amountToRemove;
        shoppingCart.removeItemFromCart(inventory[0], amountToRemove);
        expect(cart.length).toEqual(expectedCartSize, 'Shopping cart count should be the same');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item count should remain the same');

        amountToRemove = 7;
        expectedCartSize = 0;
        shoppingCart.removeItemFromCart(inventory[0], amountToRemove);
        expect(cart.length).toEqual(expectedCartSize, 'Removing more than the amount should remove the entry from the cart');
    });

    it('Add/Remove multiple valid items', () => {
        const shoppingCart = new ShoppingCart();
        const cart = shoppingCart.getShoppingCart();
        const inventory = shoppingCart.getInventory();
        let expectedCartSize = 2;
        let amountToAdd = 3;
        let expectedItemAmount = 1;

        // Add Items
        expect(shoppingCart.addItemToCart(inventory[0])).toBeTruthy();
        expect(shoppingCart.addItemToCart(inventory[1])).toBeTruthy();
        expect(shoppingCart.addItemToCart(inventory[1], amountToAdd)).toBeTruthy();
        expect(cart.length).toEqual(expectedCartSize);
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item should be added');
        expect(cart[1].count).toEqual(expectedItemAmount + amountToAdd, 'Item amount should be incremented');

        let amountToRemove = 1;
        shoppingCart.removeItemFromCart(inventory[1], amountToRemove);
        expect(cart.length).toEqual(expectedCartSize, 'Cart size should be unchanged');
        expect(cart[0].count).toEqual(expectedItemAmount, 'Item should be unchanged');
        expect(cart[1].count).toEqual(amountToAdd, 'Item amount should be decremented');

        amountToRemove = 9;
        shoppingCart.removeItemFromCart(inventory[0], amountToRemove);
        expect(cart.length).toEqual(expectedCartSize - 1, 'Cart size should be decremented');
        expect(cart[0].count).toEqual(amountToAdd, 'Item amount should be unchanged');

        shoppingCart.removeItemFromCart(inventory[1], amountToRemove);
        expect(cart.length).toEqual(0, 'Cart size should be decremented');
    });
});

describe('Shopping Cart clears the cart correctly', () => {
    it('Clear one and many items from the cart', () => {
        const shoppingCart = new ShoppingCart();
        const cart = shoppingCart.getShoppingCart();
        const inventory = shoppingCart.getInventory();

        shoppingCart.resetCart();
        expect(cart.length).toEqual(0, 'Cart should be cleared');

        expect(shoppingCart.addItemToCart(inventory[0])).toBeTruthy();
        expect(cart.length).toEqual(1);
        expect(cart[0].count).toEqual(1, 'Item should be added');

        shoppingCart.resetCart();
        expect(cart.length).toEqual(0, 'Cart should be cleared');

        expect(shoppingCart.addItemToCart(inventory[0])).toBeTruthy();
        expect(cart.length).toEqual(1);
        expect(cart[0].count).toEqual(1, 'Item should be added');

        expect(shoppingCart.addItemToCart(inventory[1])).toBeTruthy();
        expect(cart.length).toEqual(2, 'Shopping cart count should be incremented by 1');
        expect(cart[1].count).toEqual(1, 'Item should be added');

        expect(shoppingCart.addItemToCart(inventory[1], 3)).toBeTruthy();
        expect(cart.length).toEqual(2, 'Shopping cart count should be the same');
        expect(cart[1].count).toEqual(4, 'Item amount should be incremented');

        shoppingCart.resetCart();
        expect(cart.length).toEqual(0, 'Cart should be cleared');
    });

    it('Clear one and many items by checking out', () => {
        const shoppingCart = new ShoppingCart();
        const cart = shoppingCart.getShoppingCart();
        const inventory = shoppingCart.getInventory();

        shoppingCart.checkout();
        expect(cart.length).toEqual(0, 'Cart should be cleared');

        expect(shoppingCart.addItemToCart(inventory[0])).toBeTruthy();
        expect(cart.length).toEqual(1);
        expect(cart[0].count).toEqual(1, 'Item should be added');

        shoppingCart.checkout();
        expect(cart.length).toEqual(0, 'Cart should be cleared');

        expect(shoppingCart.addItemToCart(inventory[0])).toBeTruthy();
        expect(cart.length).toEqual(1);
        expect(cart[0].count).toEqual(1, 'Item should be added');

        expect(shoppingCart.addItemToCart(inventory[1])).toBeTruthy();
        expect(cart.length).toEqual(2, 'Shopping cart count should be incremented by 1');
        expect(cart[1].count).toEqual(1, 'Item should be added');

        expect(shoppingCart.addItemToCart(inventory[1], 3)).toBeTruthy();
        expect(cart.length).toEqual(2, 'Shopping cart count should be the same');
        expect(cart[1].count).toEqual(4, 'Item amount should be incremented');

        shoppingCart.checkout();
        expect(cart.length).toEqual(0, 'Cart should be cleared');
    });
});