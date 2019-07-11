export class User {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;

  UserID?: number;
  UserName?: string;
  Password?: string;
  Token?: string;

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
  Description?: string;
  ItemID?: number;
  Remarks?: string;
  Price?: number;
  OrderQty?: number;
  SIH?: number;
  Discount?: number;
  ImageURL?: string;
}

export class ShoppinCartSummary {
  itemsCount: number;
  Total: number;
  TotalDiscount: number;

  subToal: number;
}


export class Breadcrumb {
  Url: string;
  DisplayText: string;
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


