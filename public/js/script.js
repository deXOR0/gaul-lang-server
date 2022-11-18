const codingTextArea = document.getElementById("coding-text-area");
const inputTextArea = document.getElementById("input-text-area");
const outputTextArea = document.getElementById("output-text-area");
const runCodeButton = document.getElementById("run-code-button");

codingTextArea.innerHTML =
	'baca n\nulangin i dari 1 sampe n\n\tkalo i % 3 == 0 dan i % 5 == 0\n\t\ttulis "FizzBuzz”\n\t\tkalogak i % 3 == 0\n\t\t\ttulis "Fizz”\n\t\tkalogak i % 5 == 0\n\t\t\ttulis "Buzz"\n\t\tlainnya\n\t\ttulis i\n\t\tyaudah\nyaudah';

inputTextArea.innerHTML = 15;

runCodeButton.addEventListener("click", async () => {
	const code = codingTextArea.value.trim();
	const input = inputTextArea.value.trim().split("\n");

	const response = await fetch("https://gaul-lang.up.railway.app//run", {
		method: "post",
		body: {
			code,
			input,
		},
	});

	const { output } = await response.json();

	outputTextArea.innerHTML = output;
});
