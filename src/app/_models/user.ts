export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}


export class Category{
    categoryId: number;
    description: string;
    isSubCategory:boolean;
}
export class SubCategory{
    subCatId: number;
    subCateDescription: string;
    categoryId:boolean;
}
export class Item{
    itemName?:string;
    itemId?:number;
    price?:number;
    qty?:number;
}
 
