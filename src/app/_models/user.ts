export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}


export class Category {
  categoryId: number;
  description: string;
  isSubCategory: boolean;
  imageUrl?: string;
}
export class SubCategory {
  subCatId: number;
  subCateDescription: string;
  categoryId: boolean;
  imageUrl: string;
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



