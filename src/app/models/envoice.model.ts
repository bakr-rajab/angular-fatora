export class Envoice {
    id!: string;
    docymentType!: string;
    version!: string
    internalId!: string;
    comment!: string;
    client!: string;
    purchaseOrderReference!: string;
    purchaseOrderDescription!: string;
    salesOrderReference!: string;
    salesOrderDescription!: string;
    proformaInvoiceNumber!: string;
    lines!: any;
}