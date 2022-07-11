type AppConfig = {
  firebase: {
    apiHost: string
    authHost: string
    apiKey: string
  }
  sentry: {
    dsn?: string
    tracesSampleRate: number
  }
}

const convertEnvVariableToNumber = (value: string | undefined) => {
  const number = Number(value)

  if (!isNaN(number)) {
    return number
  }

  return null
}

const local: AppConfig = {
  firebase: {
    apiHost: 'http://localhost:5000/castclips-dev/us-central1/api',
    authHost: 'castclips-dev.firebaseapp.com',
    apiKey: 'AIzaSyBtA0m2pgSQ16SOVXdAexWD5K_hqXWa1b0',
  },
  sentry: {
    dsn: process.env.REACT_APP_SENTRY_DSN,
    tracesSampleRate:
      convertEnvVariableToNumber(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE) ?? 1.0,
  },
}

const development: AppConfig = {
  firebase: {
    apiHost: 'https://us-central1-castclips-dev.cloudfunctions.net/api',
    authHost: 'castclips-dev.firebaseapp.com',
    apiKey: 'AIzaSyBtA0m2pgSQ16SOVXdAexWD5K_hqXWa1b0',
  },
  sentry: {
    dsn: process.env.REACT_APP_SENTRY_DSN,
    tracesSampleRate:
      convertEnvVariableToNumber(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE) ?? 1.0,
  },
}

const production: AppConfig = {
  firebase: {
    apiHost: 'https://us-central1-castclips-7c579.cloudfunctions.net/api',
    authHost: 'castclips-7c579.firebaseapp.com',
    apiKey: 'AIzaSyCDNk16gnJo4FHVLfqD-l_vEYZH8MCkcJo',
  },
  sentry: {
    dsn: process.env.REACT_APP_SENTRY_DSN,
    tracesSampleRate:
      convertEnvVariableToNumber(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE) ?? 1.0,
  },
}

const getConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return production
  }

  switch (process.env.REACT_APP_CONFIG) {
    case 'prod':
      return production
    case 'local':
      return local
    case 'dev':
    default:
      return development
  }
}

const config = getConfig()

export default config
