var http = require("http"),
  httpProxy = require("http-proxy"),
  axios = require("axios");
//
// Create your proxy server and set the target in the options.
//
var proxy = httpProxy
  .createProxyServer({ target: "https://api.clickup.com" })
  .listen(8001); // See (†)

//
// Create your target server
//
http
  .createServer(function (req, res) {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization",
      "Content-Type": "text/plain",
    });

    axios
      .get("http://localhost:8002/api/v2/team", {
        headers: {
          authorization: "pk_2586274_TSD0SI9R593QKEYH7V1MDHN5GJ02WWLW", //the token is a variable which holds the token
        },
      })
      .then(function (response) {
        console.log(response.data);
        res.write(JSON.stringify(response.data, true, 2));
        res.end();
      })
      .catch(function (error) {
        console.log(error);
        res.write(JSON.stringify({ notworking: true }, true, 2));
        res.end();
      });

    /* res.write(
        JSON.stringify(response.data, true, 2)
    );
    res.end();

    const hasAuth = req.headers.authorization;*/

    /*req.headers = {
      //authorization: "pk_2586274_TSD0SI9R593QKEYH7V1MDHN5GJ02WWLW",
   
      "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
      "accept-encoding": "gzip,deflate",
      connection: "close",
      host: "localhost:8002",
    };*/

    /*if (hasAuth) {
      req.headers.authorization = "pk_2586274_TSD0SI9R593QKEYH7V1MDHN5GJ02WWLW";
    }*/
    /*delete req.headers.pragma;
    delete req.headers["user-agent"];
    delete req.headers["sec-fetch-mode"];
    delete req.headers["sec-fetch-site"];
    delete req.headers["sec-fetch-dest"];
    delete req.headers.referer;
    delete req.headers["accept-encoding"];
    delete req.headers["accept-language"];*/

    //const { connection, accept, origin, accept-language,accept-encoding,referer, ['sec-fetch-des'],...other } = req.headers;
    /*
    console.log(req.method);

    if ("OPTIONS" === req.method) {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization",
      });
      res.end();
    } else {*/
    /* delete req.headers.pragma;
      delete req.headers["user-agent"];
      delete req.headers["sec-fetch-mode"];
      delete req.headers["sec-fetch-site"];
      delete req.headers["sec-fetch-dest"];
      delete req.headers.referer;
      delete req.headers["accept-encoding"];
      delete req.headers["accept-language"];
*/
    /*req.headers = {
        authorization: "pk_2586274_TSD0SI9R593QKEYH7V1MDHN5GJ02WWLW",
        //accept: "",
        //host: "localhost:8002",
      };*/
    /*console.log(req.headers);

      proxy.web(req, res, {
        target: "https://api.clickup.com",
        secure: false,
        ws: false,
        prependPath: false,
        ignorePath: false,
      });
    }*/
    // proxy.web(req, res, { target: "https://api.clickup.com" });
  })
  .listen(8002);

proxy.on("proxyRes", function (proxyRes, req, res) {
  /*if ("OPTIONS" === req.method) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
  }*/
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
});
