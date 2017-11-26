const isDevelopmentBuild = process.env.NODE_ENV === 'development';

export const API_ENDPOINT = isDevelopmentBuild ? 'http://emoji-api.dev/api/v1' : 'https://emoji-api.maartendev.me/api/v1';