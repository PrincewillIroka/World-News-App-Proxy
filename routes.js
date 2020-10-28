const fetch = require("node-fetch");

const getNews = {
  handler: async (request, h) => {
    try {
      let { url } = request.payload;

      const result = await fetch(url, {
        method: "GET",
        headers: { origin: "localhost" },
      });
      const body = await result.json();
      return body;
    } catch (error) {
      console.error("Get news error:", error);
      return h.response(errorData("Oops something went wrong!")).code(500);
    }
  },
};

const getHome = {
  handler: async (request, h) => {
    try {
      return "Welcome to WorldNewsAppProxy";
    } catch (error) {
      console.error("Get home:", error);
      return h.response(errorData("Oops something went wrong!")).code(500);
    }
  },
};

const routes = [
  { method: "POST", path: "/getNews", config: getNews },
  { method: "GET", path: "/", config: getHome },
];
module.exports = routes;
