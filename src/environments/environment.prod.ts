export const environment = {
   production: true,
   apiUrl: 'http://13.75.198.182/webapi'
   , imageNotFoundUrl: '/sc/assets/images/notfound.png'
   , imageUrlPath: 'http://13.75.198.182/WebAPI/UploadFile/'


  //   apiUrl: 'http://localhost:83/WebAPI'
  // , imageNotFoundUrl: '/assets/images/notfound.png'
  // , imageUrlPath: 'http://localhost:83/WebAPI/UploadFile/'
};

export enum GridType {
  Category = 1,
  SubCategory = 2,
  ItemsBySubCategory = 3,
  ItemsByCategory = 4,
  ItemsListByName = 5,
  AdminCategory = 6
}
