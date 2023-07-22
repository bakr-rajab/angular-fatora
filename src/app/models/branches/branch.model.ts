import { Address } from "../address.model";

export class Branch {
    id!: string;
    name_ar!: string;
    name_en!: string;
    code!: string;
    invoiceSerial!: number;
    company!: any;
    address!: Address
}