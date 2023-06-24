export class Item {
    id?: string;
    name!: string;
    code!: string;
    type!: ItemTypes;
    unit!: string;
    price!: string;
    gpcCode!: string;
    groupId!: string;
    taxCode!: string;
}
export enum ItemTypes {
    EGS = "EGS",
    GS1 = "GS1",
}