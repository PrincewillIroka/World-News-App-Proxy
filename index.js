require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const routes = require("./routes");
const port = process.env.APP_PORT;
const host = process.env.APP_DOMAIN;

const server = Hapi.server({
  port: port,
  host: host,
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Authorization"],
      exposedHeaders: ["Accept"],
      additionalExposedHeaders: ["Accept"],
      maxAge: 60,
      credentials: true,
    },
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