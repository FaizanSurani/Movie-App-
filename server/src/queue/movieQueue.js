import { Queue } from "bullmq";

export const movieQueue = new Queue("movieQueue", {
  connection: {
    url: process.env.REDIS_URL,
  },
});
