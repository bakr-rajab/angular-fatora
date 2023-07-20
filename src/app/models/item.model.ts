export class Item {
    id!: string;
    name!: string;
    code!: string;
    type!: ItemTypes;
    unit!: string;
    price!: string;
    group!: string;
    taxCode!: string;
}
export enum ItemTypes {
    EGS = "EGS",
    GS1 = "GS1",
}