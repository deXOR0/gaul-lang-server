const codingTextArea = document.getElementById("coding-text-area");
const inputTextArea = document.getElementById("input-text-area");
const outputTextArea = document.getElementById("output-text-area");
const runCodeButton = document.getElementById("run-code-button");

codingTextArea.innerHTML =
	'baca n\nulangin i dari 1 sampe n\n\tkalo i % 3 == 0 dan i % 5 == 0\n\t\ttulis "FizzBuzz"\n\tkalogak i % 3 == 0\n\t\ttulis "Fizz"\n\tkalogak i % 5 == 0\n\t\ttulis "Buzz"\n\tlainnya\n\t\ttulis i\n\tyaudah\nyaudah';

inputTextArea.innerHTML = 15;

runCodeButton.addEventListener("click", async () => {
	const code = codingTextArea.value.trim();
	const input = inputTextArea.value.trim().split("\n");

	const response = await fetch("/run", {
		method: "post",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			code,
			input,
		}),
	});

	const { output } = await response.json();

	outputTextArea.innerHTML = output;
});
