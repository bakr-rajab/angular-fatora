export class Branch {
    id?: string;
    name_ar!: string;
    name_en!: string;
    code!: string;
    invoiceSerial!: number;
    company!: any;
    address!: Address
}
export class Address {
    country!: string
    governerate!: string
    regionCity!: string
    street!: string
    buildingNumber!: string
    postalCode!: string
    floor!: string
    landmark!: string
    additionalInformation!: string
}