import express from "express";
import { Worker } from "worker_threads";
import { performance } from "perf_hooks";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;
const TIME_LIMIT_MS = Number(process.env.TIME_LIMIT_MS) || 5000;

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

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
	res.render("home");
});

app.get("/docs", (req, res) => {
	res.redirect(
		"https://sweltering-thursday-343.notion.site/Dokumentasi-Gaul-lang-10d312582e804b83953c2d858fb94df7"
	);
});

app.listen(PORT, () => console.log("Gaul-lang Service is runing..."));
