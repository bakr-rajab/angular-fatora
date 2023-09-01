export class Envoice {
    id!: string;
    documentType!: string;
    client!: string;
    version: string = "1.0"
    purchaseOrderReference!: string;
    purchaseOrderDescription!: string;
    salesOrderReference!: string;
    salesOrderDescription!: string;
    proformaInvoiceNumber!: string;
    currency!: string;
    lines!: Array<Line>;
}
export class Line {
    id!: string;
    itemId!: string;
    quantity!: number;
    salesTotal: number=0;
    discoundRate!: number;
    taxableItems!: Array<TaxableItem>;
}

export class TaxableItem {
    taxType!: string;
    subType!: string;
    taxRate!: number;
}