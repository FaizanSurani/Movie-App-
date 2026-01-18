import { Queue } from "bullmq";

export const movieQueue = new Queue("movieQueue", {
  connection: { host: "127.0.0.1", port: 6379 }
});
