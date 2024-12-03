export default () => ({
  api: {
    key: process.env.API_KEY,
    url: process.env.API_URL,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  }
})