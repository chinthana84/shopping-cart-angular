// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:83/WebAPI'
  // apiUrl: 'http://13.75.198.182/webapi'
  , imageNotFoundUrl: '/assets/images/notfound.png'
  , imageUrlPath: 'http://localhost:83/WebAPI/UploadFile/'
};

export enum GridType {
  Category = 1,
  SubCategory = 2,
  ItemsBySubCategory = 3,
  ItemsByCategory = 4,
  ItemsListByName = 5,
  AdminCategory = 6,
  AdminItems = 7
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
