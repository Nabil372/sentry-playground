import * as Sentry from "@sentry/node";
import express from "express";
import { writeFile } from "fs/promises";

const app = express();
app.use(express.json());

app.post("/", async function rootHandler(req, res) {
    const data = {
        headers: req.headers,
        body: req.body,
        query: req.query,
        path: req.path,
    };

    try {
        await writeFile(`sentry/issue_${new Date().toISOString()}.json`, JSON.stringify(data));
        res.sendStatus(202);
    } catch (error) {
        console.error("Error writing to file", error);
        res.sendStatus(500);
    }
});
app.get("/debug-sentry", function mainHandler(_req, _res) {
    throw new Error("My first Sentry error!");
});

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(_err: any, _req: any, res: any, _next: any) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.listen(3000);
