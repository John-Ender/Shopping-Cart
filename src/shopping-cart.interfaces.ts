
export interface Item {
    readonly _id: number; // typically a GUID or UUID but we'll keep it simple for this example
    readonly description: string;
    readonly price: number;
    readonly applySalesTax?: boolean; // Whether to apply sales tax
    readonly applyImportTax?: boolean; // Whether to apply import tax
}

export interface Taxes {
    readonly salesTax: number; // Sales tax percentage
    readonly importTax: number; // Import tax percentage
    readonly roundValue: number; // Increment to round the tax value to
}

export interface ShoppingCartItem extends Item {
    count: number; // Number of items for this _id in the cart
    salesTax: number; // Calculated sales tax on the item
    importTax: number; // Calculated import tax on the item
    totalCost: number; // Total value of the item(s) including taxes
}