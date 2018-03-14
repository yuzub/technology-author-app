// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDB66jjgT8cwZA9m3ygIZBhxIPZzuSPFeo",
    authDomain: "tech-auth-app.firebaseapp.com",
    databaseURL: "https://tech-auth-app.firebaseio.com",
    projectId: "tech-auth-app",
    storageBucket: "tech-auth-app.appspot.com",
    messagingSenderId: "717769665186"
  }
};
