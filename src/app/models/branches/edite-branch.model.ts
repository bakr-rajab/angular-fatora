export class EditeBranch {
    target!: string;
    action!: string;
    unique_value!: UniqueValue;
    branch_name_en!: string;
    brnach_name_ar!: string;
}

export interface UniqueValue {
    branch_code: string;
}