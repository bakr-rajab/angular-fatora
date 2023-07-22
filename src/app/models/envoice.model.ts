export class Envoice {
    id!: string;
    documentType!: string;
    client!: string;
    version: string = "1.0"
    internalId!: string;
    comment!: string;
    purchaseOrderReference!: string;
    purchaseOrderDescription!: string;
    salesOrderReference!: string;
    salesOrderDescription!: string;
    proformaInvoiceNumber!: string;
    lines!: Line;
}
export class Line {
    itemId!: string;
    quantity!: number;
    currency!: string;
    rate!: number;
    taxableItems!: TaxableItem;
}

export class TaxableItem {
    taxType!: string;
    subType!: string;
    rate!: number;
}