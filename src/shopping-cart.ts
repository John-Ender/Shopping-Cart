import {Item, Taxes, ShoppingCartItem} from "./shopping-cart.interfaces";
import {ShoppingCartHelper} from "./shopping-cart-helper";

import * as _ from "lodash";

/**
 * Basic shopping cart API including with capabilities to add and remove items, checkout, and reset the cart.
 *
 * Assumptions:
 *  - Item inventory is retrieved via an API or File and is in correct JSON format. User input is not parsed for this example.
 *  - Items in the inventory are infinite in number, future work would include checking item availability/counts before adding
 *    the item to the cart.
 */
export class ShoppingCart {

    private cart: ShoppingCartItem[] = [];
    private inventory: Item[] = [];
    private taxes: Taxes = {salesTax: 0.10, importTax: 0.05, roundValue: 0.05};

    constructor() {
        // Typically an inventory would be retrieved from a database or filestore via an http call
        // take a shortcut here and read the file from disk
        const inventoryFile = './src/data/inventory.json';
        const fileExists = require('file-exists');

        if (!fileExists.sync(inventoryFile)) {
            console.error('Inventory File Not Found: Ensure ' + inventoryFile + ' is present.');
        }

        const loadJsonFile = require('load-json-file');
        this.inventory = loadJsonFile.sync(inventoryFile);
    }

    /**
     * Add a number of a specific item to the cart.
     * @param {Item} item - The item to add to the cart, must be an item object retrieved from the inventory.
     * @param {number} amount - The amount of the item to be added
     * @returns {boolean} - Whether the item was successfully added to the cart
     */
    public addItemToCart(item: Item, amount: number = 1): boolean {
        if (!_.includes(this.inventory, item) || amount < 0) return false; // Fail fast - Attempting to add an invalid item

        // Retrieve the item if it is currently in the cart, _.find returns undefined for non-existent values
        let listItem = _.find(this.cart, (value) => value._id === item._id);

        // If the item is already in the cart, increment by the amount. Otherwise, add an instance of it.
        if (listItem) {
            listItem.count += amount;
        } else {
            const defaultValues = {count: amount, salesTax: 0.0, importTax: 0.0, totalCost: 0.0};
            this.cart.push(_.extend({}, item, defaultValues));
        }
        return true;
    }

    /**
     * Print the receipt and reset the cart contents to empty
     */
    public checkout(header?: string) {
        this.printReceipt(header);
        this.resetCart();
    }

    /**
     * Return a immutable array of the inventory items. Items within the array are also immutable.
     * @returns {ReadonlyArray<Readonly<Item>>}
     */
    public getInventory(): ReadonlyArray<Readonly<Item>> {
        return this.inventory as ReadonlyArray<Readonly<Item>>;
    }

    /**
     * Return a immutable array of the shopping cart items. Items within the array are also immutable.
     * @returns {ReadonlyArray<Readonly<ShoppingCartItem>>}
     */
    public getShoppingCart(): ReadonlyArray<Readonly<ShoppingCartItem>> {
        return this.cart as ReadonlyArray<Readonly<ShoppingCartItem>>;
    }

    /**
     * Calculate the taxes, total cost, and print the receipt to the console
     * @param {string} header - An optional header to include at the top of the receipt
     */
    public printReceipt(header: string = 'Receipt:') {
        ShoppingCartHelper.calculateTaxes(this.cart, this.taxes);
        console.log(ShoppingCartHelper.formatReceipt(this.cart, header) + '\n');
    }

    /**
     * Remove a number of a specific item from the cart.
     *
     * No need to return a success or fail value, if the item doesn't exist in the inventory or the cart
     * we've accomplished our task.
     *
     * @param {Item} item - The item to removed from the cart, must be an item object retrieved from the inventory.
     * @param {number} amount - The amount of the item to be removed
     */
    public removeItemFromCart(item: Item, amount: number = 1) {
        if (!_.includes(this.inventory, item) || amount < 0) return; // Trying to remove an invalid item, no more work to do.

        // Retrieve the item if it is currently in the cart, _.find returns undefined for non-existent values
        let listItem = _.find(this.cart, (value) => value._id === item._id);

        if (!listItem) return; // If the item isn't currently in the cart return, no more work to do.

        // If the amount to be removed it greater that what is currently in the cart remove the item completely, otherwise
        // decrement by the amount.
        if (listItem.count <= amount) {
            _.remove(this.cart, listItem);
        } else {
            listItem.count -= amount;
        }
    }

    /**
     * Clear all of the entries from the cart
     */
    public resetCart() {
        // Action must be taken on the current list else to avoid invalidating anyone's list reference.
        _.remove(this.cart, () => true);
    }
}
