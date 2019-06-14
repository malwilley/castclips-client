type AppConfig = {
  firebase: {
    apiHost: string;
    authHost: string;
    apiKey: string;
  };
};

const local: AppConfig = {
  firebase: {
    apiHost: 'http://localhost:5000/castclips-dev/us-central1/api',
    authHost: 'castclips-dev.firebaseapp.com',
    apiKey: 'AIzaSyBtA0m2pgSQ16SOVXdAexWD5K_hqXWa1b0',
  },
};

const development: AppConfig = {
  firebase: {
    apiHost: 'https://us-central1-castclips-dev.cloudfunctions.net/api',
    authHost: 'castclips-dev.firebaseapp.com',
    apiKey: 'AIzaSyBtA0m2pgSQ16SOVXdAexWD5K_hqXWa1b0',
  },
};

const production: AppConfig = {
  firebase: {
    apiHost: 'https://us-central1-castclips-7c579.cloudfunctions.net/api',
    authHost: 'castclips-7c579.firebaseapp.com',
    apiKey: 'AIzaSyCDNk16gnJo4FHVLfqD-l_vEYZH8MCkcJo',
  },
};

const config = process.env.NODE_ENV === 'production' ? production : development;

export default config;
