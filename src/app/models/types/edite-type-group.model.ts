export class EditeTypeGroup {
    target!: string;
    action!: string;
    unique_value!: UniqueValue;
    group_name_ar!: string;
    group_name_en!: string;
}
export interface UniqueValue {
    group_code: string;
}