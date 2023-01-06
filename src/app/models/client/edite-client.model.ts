export class EditeClient {
    target!: string;
    action!: string;
    unique_value!: UniqueValue;
    client_name!: string;
    ph_number!: number;
    email!: string;
    tax_number!: number;
}

export interface UniqueValue {
    email: string;
}
