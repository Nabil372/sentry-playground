import * as Sentry from "@sentry/node";
import express from "express";

const app = express();
app.use(express.json());

app.post("/", function rootHandler(req, res) {
    console.log(req.body);
    res.end("OK")
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
