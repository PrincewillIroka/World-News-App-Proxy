require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const routes = require("./routes");
const port = process.env.PORT;
const host = process.env.APP_DOMAIN;
const environment = process.env.NODE_ENV;

const server = Hapi.server({
  port: port,
  host: environment === "development" ? host : null,
  routes: {
    cors: true,
  },
});

const init = async () => {
  await server.register(Inert);
  await server.start();
  console.log(`Server is running at ${server.info.uri}`);

  process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });
};

server.route(routes);
init();
