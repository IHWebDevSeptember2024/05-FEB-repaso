// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
const dotenv = require("dotenv");
dotenv.config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

const app = require("express")();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
/* const config = require("./config");
config(app); */
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

app.use("/auth", require("./routes/auth.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
