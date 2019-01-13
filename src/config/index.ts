type AppConfig = {
  listenNotesApiKey: string;
};

const config: AppConfig = {
  listenNotesApiKey: process.env.LISTEN_NOTES_API_KEY || require('./secrets').listenNotesApiKey,
};

export default config;
