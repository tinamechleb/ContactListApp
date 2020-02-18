import app from "./app";
import InitDB from "./db";

const start = async () => {
    const controller = await InitDB();
    app.get('/', (req, res) => {
        const result = await controller.getContacts();
        res.send(result);
    });
    app.listen(8000, () => {
        console.log("App listening on port 8000");
    });
}

start() 