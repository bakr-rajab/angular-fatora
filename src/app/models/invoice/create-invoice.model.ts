export class CreateInvoice {
    target!: string;
    action!: string;
    date!: Date;
    client!: string;
    payment_type!: string;
    branch!: string;
    discount_ratio!: number;
    total_invoice!: number;
    notes!: string;
    invoice_types!: string[];
    user_id!: string;
}
