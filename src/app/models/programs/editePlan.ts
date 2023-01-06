export class EditePlan {
    target!: string;
    action!: string;
    plan_name!: string;
    plan_duration!: number
    unique_value!: UniqueValue;
}

export interface UniqueValue {
    plan_id: string;
}