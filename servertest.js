// A very simple web server with url routing and a session cookie
// using only the Node.js library.

const http = require("http");

const server = http.createServer(function(request, response) {


    let requestOnErrorWriteConsoleFunction = function () {
        return request.on("error", err => console.log(err));
    }
    
    let responseOnErrorWriteConsoleFunction = function () {
        return response.on("error", err => console.log(err));
    }
    
    let responseErrorPageFunction = function () {
        return response.end("<p>Invalid address </p>");
}
    let urlCleaned = request.url;

    if (request.url.endsWith("/")) {
        urlCleaned = request.url.slice(0,-1);
    }

    switch (urlCleaned) {

        //Put this case in {} block since define let reqHeaders
        case "/home": {
            
            requestOnErrorWriteConsoleFunction();
            let reqHeaders = request.headers.cookie;
            //Set a session cookie if one has not been set yet.
            //This is for demonstration purposes. In a real implementation,
            //each user would get a unique session.
            if (!reqHeaders) { 
                response.writeHead(200, {"Set-Cookie" : "session=14213432"});
            }
            responseOnErrorWriteConsoleFunction();
            response.end(reqHeaders);
            break;
        }
        
        case "/cookies":
            requestOnErrorWriteConsoleFunction();
            response.writeHead(200);
            responseOnErrorWriteConsoleFunction();
            response.end(request.headers.cookie);
            break;
        
        case "/test":
            requestOnErrorWriteConsoleFunction();
            response.writeHead(200);
            responseOnErrorWriteConsoleFunction();
            response.end(request.headers.cookie);
            break;
        
        case "/form":
            requestOnErrorWriteConsoleFunction();
            if (request.method === "GET") {
                requestOnErrorWriteConsoleFunction();
                response.writeHead(200, {"Content-Type" : "text/html"});
                responseOnErrorWriteConsoleFunction();
                response.end(`<form action="/form" method="POST">
                            <label for="name">Enter your name: </label>
                            <input type="text" name="name" id="name" required />
                            <label for="email">Enter your email: </label>
                            <input type="email" name="email" id="email" required />
                            <input type="submit" value="Submit" />
                            </form>`);
            }
            if (request.method === "POST") {
                requestOnErrorWriteConsoleFunction();
                let body = [];
                request.on("data", function(chunk) {
                    body.push(chunk);
                });
                request.on("end", function() {
                    //Below is to staisfy JavaScript linter
                    /*global Buffer*/
                    body = Buffer.concat(body).toString()
                    console.log(body);
                    response.end(body);
                });
                responseOnErrorWriteConsoleFunction();
            }
            break;


        default:
            requestOnErrorWriteConsoleFunction();
            responseOnErrorWriteConsoleFunction();
            response.writeHead(404);
            responseErrorPageFunction();
        }
        });
server.listen(8080, "localhost");
