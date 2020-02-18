import { createServer } from "http";

const whenRequestReciebed = (req, res) => {
    const url = req.url;

    if (url == "/") {
        res.writeHead(200, { "Content-type": `text/plain` });
        res.write(`Hello`);
        res.end();
    }
    if (url = "/test") {
        res.writeHead(200, 'json content', { "Content-type": `application/json` });
        res.write('{ message: "ok" }');
        res.end();
    }
};

const server = createServer(whenRequestReciebed);

server.listen(8000, () => {
    console.log("App listening on port 8000");
});