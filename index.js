import express from "express";
import { Worker } from "worker_threads";
import { performance } from "perf_hooks";

const app = express();
const PORT = process.env.PORT || 3001;
const TIME_LIMIT_MS = Number(process.env.TIME_LIMIT_MS) || 5000;

app.use(express.json());

app.post("/run", (req, res) => {
	const { code, input } = req.body;

	const start = performance.now();

	const worker = new Worker("./src/run.js", {
		workerData: { program: code, input },
	});

	const timeout = setTimeout(() => {
		worker.terminate();
		res.send({ type: "error", performance: 0, output: "TLE" });
	}, TIME_LIMIT_MS);

	worker.on("error", (error) => {
		clearTimeout(timeout);
		res.send({ type: "error", performance: 0, output: String(error) });
	});

	worker.on("message", (msg) => {
		const end = performance.now();
		const perf = Math.round(end - start);
		res.send({
			type: "success",
			performance: perf,
			output: msg.output.join("\n"),
		});
		clearTimeout(timeout);
	});
});

app.get("/", (req, res) => {
	res.send("Welcome to Gaul-lang!");
});

app.get("/docs", (req, res) => {
	res.redirect(
		"https://adajkt.notion.site/Dokumentasi-Gaul-lang-5688df9c84f7441494be7bd74504b7b4"
	);
});

app.listen(PORT, () => console.log("Gaul-lang Service is runing..."));
