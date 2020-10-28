const fetch = require("node-fetch");

const getNews = {
  handler: async (request, h) => {
    try {
      //   let { url } = request.payload;
      let url =
        "https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=277e502592bd4fbba0b5152081152b53";

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

const routes = [{ method: "POST", path: "/getNews", config: getNews }];
module.exports = routes;
