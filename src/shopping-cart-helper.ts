import {ShoppingCartItem, Taxes} from "./shopping-cart.interfaces";
import * as _ from "lodash";

/**
 * Static Helper Functions for the ShoppingCart class
 */
export class ShoppingCartHelper {

    /**
     * Generate a formatted string representing the receipt for a shopping cart.
     *
     * @param {ShoppingCartItem[]} cart - The cart to format a receipt for
     * @param {string} header - An optional header to print at the top of the receipt
     * @returns {string} - The formatted receipt string
     */
    public static formatReceipt(cart: ShoppingCartItem[], header?: string): string {
        let receipt: string[] = [];

        if (header) receipt.push(header);

        const formatter = new Intl.NumberFormat( 'en-US', {minimumFractionDigits: 2});

        _.each(cart, (item: ShoppingCartItem) => {
            receipt.push(`${item.count} ${item.description}: ${formatter.format(item.totalCost)}`);
        });

        const salesTax = _.sumBy(cart, (item: ShoppingCartItem) => item.salesTax + item.importTax);
        const total = _.sumBy(cart, (item: ShoppingCartItem) => item.totalCost);
        receipt.push(`Sales Tax: ${formatter.format(salesTax)}`);
        receipt.push(`Total: ${formatter.format(total)}`);

        const joinValue = header ? '\n\t' : '\n';
        return _.join(receipt, joinValue);
    }

    /**
     * Calculate the tax values for the items in the shopping cart
     */
    public static calculateTaxes(cart: ShoppingCartItem[], taxes: Taxes) {
        _.map(cart, (item: ShoppingCartItem) => {
            const totalPrice = item.count * item.price;

            if (item.applySalesTax) {
                item.salesTax = this.round( totalPrice * taxes.salesTax, taxes.roundValue);
            }

            if (item.applyImportTax) {
                item.importTax = this.round(totalPrice * taxes.importTax, taxes.roundValue);
            }

            item.totalCost = totalPrice + item.salesTax + item.importTax;
        })
    }

    /**
     * Round a given value to a number with a given precision
     *
     * @param {number} value - The value to round
     * @param {number} round - The value to round to the nearest of
     * @param {number} precision - Integer value determining how many decimal places to return
     * @returns {number}
     */
    private static round(value: number, round: number, precision: number = 2): number {
        const roundedValue = _.ceil(value / round) * round;
        return _.round(roundedValue, precision); // roundedValue has too much precision, round the decimal places down
    }

}