// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCjqvkQjhYUHpik868sucCiPftYkJMCNdk",
    authDomain: "my365messages.firebaseapp.com",
    databaseURL: "https://my365messages.firebaseio.com",
    projectId: "my365messages",
    storageBucket: "my365messages.appspot.com",
    messagingSenderId: "704585721559"
  }
};
