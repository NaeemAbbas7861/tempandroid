// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    //  BASE_URL: "http://be.ehs.edu.pk/api/",
    //  RESOURCE_URL: "http://be.ehs.edu.pk/",
    // BASE_URL: "http://localhost:80/api/",
    // RESOURCE_URL: "http://localhost:80/",
    // BASE_URL: "192.168.10.114:5000/api/",
    // RESOURCE_URL: "192.168.10.114:5000/",
    BASE_URL:"https://localhost:5001/api/", //"https://be.kuicksave.com/api/",
     RESOURCE_URL:"https://localhost:5001/", //"https://be.kuicksave.com/",
    USER: 'User'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
