export class EditeType {
    target:             string;
    action:             string;
    unique_value:       UniqueValue;
    type_name:          string;
    tax_code:           number;
    type_group:         string;
    unit_of_measurment: string;
    tax_type:           number;
    tax_percentage:     number;
    price:              number;
}

export interface UniqueValue {
    type_code: number;
}
