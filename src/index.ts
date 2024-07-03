import express from "express";

const app = express();
app.use(express.json());

app.post("*", async function rootHandler(req, res) {
    const data = {
        headers: req.headers,
        body: req.body,
        query: req.query,
        path: req.path,
    };

    console.log(data);

    res.sendStatus(202);
});

app.listen(3000);
