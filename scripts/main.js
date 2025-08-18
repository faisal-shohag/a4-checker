

const checker = async () => {
    let rawSubmission = document.getElementsByClassName("col-12 col-md-11");
    let studentSubmisson = rawSubmission[9].innerText;
    let submitedNum = document.getElementsByClassName("font-weight-bold pl-2 ")[0]
        .innerText;
    // console.log({ studentSubmisson, rawSubmission })
    const { totalScore, problems } = await runTests(extractCodeBlocks(studentSubmisson), testCases)

    // mark field
    const markField = document.querySelector('#Mark');
    markField.focus();
    const final_marks = getFinalMark(60, totalScore, parseInt(submitedNum))
    navigator.clipboard.writeText(final_marks)
    markField.value = final_marks;

    // feedback
    const feedbacks = generateFeedback(problems, testCases, totalScore, submitedNum)
    console.log(feedbacks)
    // quill.clipboard.dangerouslyPasteHTML(feedbacks);
    const editor = document.querySelector('.ql-editor')
    editor.innerHTML = `<p>${feedbacks}</p>`

};
// checker()


const manualCheck = async () => {
    const studentSubmisson = document.getElementById("studentCode").value;
     const submitedNum = document.getElementById("submitted_at").value;

    const { maxScore, totalScore, problems } = await runTests(extractCodeBlocks(studentSubmisson), testCases)
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



