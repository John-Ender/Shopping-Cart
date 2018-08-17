import {ShoppingCart} from "../src/shopping-cart";
import {ShoppingCartItem, Taxes} from "../src/shopping-cart.interfaces";
import {ShoppingCartHelper} from "../src/shopping-cart-helper";

import * as _ from "lodash";

describe('Output 1 Check', () => {
    it('Check Output Value', () => {
        const receipt = [`1 16lb bag of Skittles: 16.00`,
            `1 Walkman: 109.99`,
            `1 bag of microwave Popcorn: 0.99`,
            `Sales Tax: 10.00`,
            `Total: 126.98`];

        let expectedOutput = _.join(receipt, '\n');
        const shoppingCart = new ShoppingCart();
        const inventory = shoppingCart.getInventory();
        const cart = shoppingCart.getShoppingCart() as ShoppingCartItem[];
        const taxes: Taxes = {salesTax: 0.10, importTax: 0.05, roundValue: 0.05};

        shoppingCart.addItemToCart(inventory[0]);
        shoppingCart.addItemToCart(inventory[1]);
        shoppingCart.addItemToCart(inventory[2]);

        ShoppingCartHelper.calculateTaxes(cart, taxes);
        let formattedReceipt = ShoppingCartHelper.formatReceipt(cart);
        expect(formattedReceipt).toBe(expectedOutput);

        let header = 'Output 1:';
        expectedOutput = header + '\n\t' + _.join(receipt, '\n\t');
        formattedReceipt = ShoppingCartHelper.formatReceipt(cart, header);
        expect(formattedReceipt).toBe(expectedOutput);
    });
});

describe('Output 2 Check', () => {
    it('Check Output Value', () => {
        const receipt = [`1 imported bag of Vanilla-Hazelnut Coffee: 11.55`,
            `1 Imported Vespa: 17,251.50`,
            `Sales Tax: 2,250.80`,
            `Total: 17,263.05`];

        let expectedOutput = _.join(receipt, '\n');
        const shoppingCart = new ShoppingCart();
        const inventory = shoppingCart.getInventory();
        const cart = shoppingCart.getShoppingCart() as ShoppingCartItem[];
        const taxes: Taxes = {salesTax: 0.10, importTax: 0.05, roundValue: 0.05};

        shoppingCart.addItemToCart(inventory[3]);
        shoppingCart.addItemToCart(inventory[4]);

        ShoppingCartHelper.calculateTaxes(cart, taxes);
        let formattedReceipt = ShoppingCartHelper.formatReceipt(cart);
        expect(formattedReceipt).toBe(expectedOutput);

        let header = 'Output 2:';
        expectedOutput = header + '\n\t' + _.join(receipt, '\n\t');
        formattedReceipt = ShoppingCartHelper.formatReceipt(cart, header);
        expect(formattedReceipt).toBe(expectedOutput);
    });
});

describe('Output 3 Check', () => {
    it('Check Output Value', () => {
        const receipt = [`1 imported crate of Almond Snickers: 79.79`,
            `1 Discman: 60.50`,
            `1 Imported Bottle of Wine: 11.50`,
            `1 300# bag of Fair-Trade Coffee: 997.99`,
            `Sales Tax: 10.80`,
            `Total: 1,149.78`];

        let expectedOutput = _.join(receipt, '\n');
        const shoppingCart = new ShoppingCart();
        const inventory = shoppingCart.getInventory();
        const cart = shoppingCart.getShoppingCart() as ShoppingCartItem[];
        const taxes: Taxes = {salesTax: 0.10, importTax: 0.05, roundValue: 0.05};

        shoppingCart.addItemToCart(inventory[5]);
        shoppingCart.addItemToCart(inventory[6]);
        shoppingCart.addItemToCart(inventory[7]);
        shoppingCart.addItemToCart(inventory[8]);

        ShoppingCartHelper.calculateTaxes(cart, taxes);
        let formattedReceipt = ShoppingCartHelper.formatReceipt(cart);
        expect(formattedReceipt).toBe(expectedOutput);

        let header = 'Output 3:';
        expectedOutput = header + '\n\t' + _.join(receipt, '\n\t');
        formattedReceipt = ShoppingCartHelper.formatReceipt(cart, header);
        expect(formattedReceipt).toBe(expectedOutput);
    });
});

