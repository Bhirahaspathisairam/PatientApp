const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

app.listen(process.env.PORT, () => {
  console.log(
    `server started in the port ${process.env.PORT} and in ${process.env.NODE_ENV} mode`
  );
});

//process.on("unhandledRejection", (reason, promise) => {
//   console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
//   process.exit(1);
// });

// process.on("uncaughtException", (err) => {
//   console.log(`Uncaught Exception: ${err.message}`);
//   process.exit(1);
// });
