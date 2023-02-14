const config = {
  BASE_NAME: '/',
  BASE_URL: 'https://dev.em.api-evam.com/demo-environment',
  CLIENT_ID: '42170541834-e86o1lmted1r0cppc7gi40aqb8co92qe.apps.googleusercontent.com',
  CLIENT_ID_LOCAL: '42170541834-e86o1lmted1r0cppc7gi40aqb8co92qe.apps.googleusercontent.com',
  CLIENT_ID_LOCAL_TAHIR: '693098272055-eu8vqeauku85kg6b7sr1nt5pnqhfd7mm.apps.googleusercontent.com',
  REDIRECT_URL: 'https://dev.em.api-evam.com/demo-environment/login/oauth2/code/google',
  REDIRECT_URL_LOCAL: 'http://localhost:3000/',
  env: '42170541834-ophr334t4uv2ksjp6b85775ani2ihjk2.apps.googleusercontent.com',
  local: '42170541834-e86o1lmted1r0cppc7gi40aqb8co92qe.apps.googleusercontent.com'
};

//window.localStorage.setItem('config', JSON.stringify(config));
window.localStorage.setItem('BASE_URL', config.BASE_URL);
window.localStorage.setItem('CLIENT_ID', config.CLIENT_ID_LOCAL_TAHIR);
window.localStorage.setItem('REDIRECT_URL', config.REDIRECT_URL)