export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

export class Category {
  CategoryID: number;
  Description: string;
  ImageURL?: string;
  IsSubCategory?: boolean;
}

export class SubCategory {
  SubCategoryID: number;
  Description: string;
  CategoryID: boolean;
  ImageURL: string;
}




export class Item {
  itemName?: string;
  itemId?: number;
  price?: number;
  qty?: number;
  sIH?: number;
  discount?: number;
  imageUrl?: string;
}

export class ShoppinCartSummary {
  itemsCount: number;
  Total: number;

  subToal: number;
}

export class Breadscrub {
  test: string;
  url: string;
}

//////////////////////////////////////////////////////////
export class CategoryModel {
  CategoryID?: number;
  Description?: string;
  Remarks?: string;
  ImageURL?: string;
  StatusDesc?: string;
  StatusId?: number;
  listSubCategory?: SubCategoryModel[];
}

export class SubCategoryModel {
  SubCategoryID?: number;
  CategoryID?: number;
  Description?: string;
  ImageURL?: string;
  Remarks?: string;
  StatusDesc?: string;
  StatusId?: number;
}

export class ItemModel {
  ItemID?: number;
  ItemDescription?: string;
  CategoryID?: number;
  ListStatus?: [];
  ListSubCategory?: SubCategoryModel[];
  Remarks?: string;
  SIH?: number;
  Price?: number;
  Discount?: number;
  ImageURL?: string;
  SubCategoryID?: number;
  StatusID?: number;
}


