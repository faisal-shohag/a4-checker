

const checker = async () => {
    let rawSubmission = document.getElementsByClassName("col-12 col-md-11");
    let studentSubmisson = rawSubmission[9].innerText;
    let submitedNum = document.getElementsByClassName("font-weight-bold pl-2 ")[0]
        .innerText;
    const markField = document.querySelector('#Mark');
    markField.focus();
    const container = document.querySelectorAll('.col-md-12')
    const el = document.createElement('div');
    el.style.cssText = `
  font-weight: bold;
  margin-top: 20px;
  padding: 7px 20px;
  font-size: 18px;
  border: 2px solid #eee;
  border-radius: 10px;
  background: #2eb85c;
  color: white;
  font-family: 'Inter';
`;
    el.textContent = "⌯⌲⏳ Initializing....";
    container[15].appendChild(el);

    try {
        const { totalScore, problems } = await runTests(extractCodeBlocks(studentSubmisson), testCases, el)
        const final_marks = getFinalMark(60, totalScore, parseInt(submitedNum))
        navigator.clipboard.writeText(final_marks)
        markField.value = final_marks;

        el.innerHTML = `<div>
    <div>⌯⌲✅ Successfully executed!</div>
    <div>⌯⌲📋 Marks(${final_marks}) copied to clipboard!</div>
    </div>`;


        // feedback
        const feedbacks = generateFeedback(problems, testCases, totalScore, submitedNum)
        // console.log(feedbacks)
        // quill.clipboard.dangerouslyPasteHTML(feedbacks);
        const editor = document.querySelector('.ql-editor')
        editor.innerHTML = `<p>${feedbacks}</p>`

    } catch (error) {
        el.innerHTML = `<div style="font-weight: bold;font-weight: bold;
    margin-top: 20px;
    padding: 7px 20px;
    font-size: 18px;
    border: 2px solid #eee;
    border-radius: 10px;
    background: crimson; color:white;">⌯⌲❌ Error occurred! ${error.toString()}</div>`
    }


};
// checker()


const manualCheck = async () => {
    const studentSubmisson = cm.getValue();;
    const submitedNum = document.getElementById("submitted_at").value;

    const { maxScore, totalScore, problems } = await runTests(extractCodeBlocks(studentSubmisson), testCases, '', 'manual')
    const feedbacks = generateFeedback(problems, testCases, totalScore, submitedNum)

    quill.clipboard.dangerouslyPasteHTML(feedbacks);
    document.querySelector('#marks').value = getFinalMark(60, totalScore, parseInt(submitedNum))

}


const main = () => {
    document.addEventListener("keydown", async (event) => {
        if (
            document.getElementById("functional-assignment") &&
            event.code === "Backslash"
        ) {
            console.log("functional assignment");
            return;
        }

        if (event.code === "Backslash") {
            checker();
        }
    });
};

main();



