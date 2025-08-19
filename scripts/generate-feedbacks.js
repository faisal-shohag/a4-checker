function generateFeedback(solutionResult, testCases, marks, submitedNum) {
  const solutionMap = Object.fromEntries(solutionResult.map(s => [s.name, s]));
  let html = ``;

  for (const [funcName, testInfo] of Object.entries(testCases)) {
    const solution = solutionMap[funcName];
    html += `<h2 style="border-bottom: 1px solid #e2e2e2; margin-bottom: 5px;">⚡ ${testInfo.title}</h2>`;

    if (!solution) {
      html += `<i style="color:red;">❌ No solution found for function <code>${funcName}</code></i>`;
      continue;
    }

    // Counts
    const allTests = [...(solution.testCases || []), ...(solution.challenges || [])];
    const passedCount = allTests.filter(t => t.passed).length;
    const failedCount = allTests.length - passedCount;

    html += `<span>✅ <b>Passed:</b> ${passedCount} &nbsp; | &nbsp; ❌ <b>Failed:</b> ${failedCount}</span>`;

    // Normal test cases
    html += `<h3>🔹 <u><b>Test Cases</b></u></h3><ul>`;
    for (const test of solution.testCases || []) {
      if (test.passed) {
        html += `<li style="text-align: left;">✅ <b>Input:</b> <code style="color:green; text-align: left;">${JSON.stringify(test.input)}</code> → <b >Output:</b> <code style="color:green;">${JSON.stringify(test.actual)}</code></li>`;
      } else {
        html += `<li style="color:red; text-align: left;">❌ <b>Input:</b> <code>${JSON.stringify(test.input)}</code><br>
                 Expected: <code>${JSON.stringify(test.expected)}</code><br>
                 Got: <code>${JSON.stringify(test.actual)}</code>`;
        if (test.error) {
          html += `<br><span style="color:darkred;">⚠️ Error: ${test.error}</span>`;
        }
        html += `</li>`;
      }
    }
    html += `</ul>`;

    // Challenge test cases
    html += `<br><h3>🔸 <u><b>Challenge Cases</b></u></h3><ul>`;
    for (const ch of solution.challenges || []) {
      if (ch.passed) {
        html += `<li style="text-align: left;">✅ <b>Input:</b> <code style="color:green;">${JSON.stringify(ch.input)}</code> → <b>Output:</b> <code style="color:green;">${JSON.stringify(ch.actual)}</code></li>`;
      } else {
        html += `<li style="color:red; text-align: left;">❌ <b>Input:</b> <code>${JSON.stringify(ch.input)}</code><br>
                 Expected: <code>${JSON.stringify(ch.expected)}</code><br>
                 Got: <code>${JSON.stringify(ch.actual)}</code>`;
        if (ch.error) {
          html += `<br><span style="color:darkred;">⚠️ Error: ${ch.error}</span>`;
        }
        html += `</li>`;
      }
    }
    html += `</ul><br>`;

    
   if(solution.totalScore === 12) {
    html += `<b>🎉Yayy...! You got full marks for this solution.</b><hr><br>`;
   }
   else if(solution.totalScore < 12 && solution.totalScore !== 0) {
    html += `<b>👍Good Effort!  Not all test cases passed. However, you’ve earned marks for the correctly passed test casess</b><hr><br>`;
   } else if(solution.totalScore === 0) {
    html += `<b>❗No marks awarded — please revisit the requirements before "Recheck".</b><hr><br>`;
   }
   html += `<h2 style="border-bottom: 1px solid #e2e2e2;"></h2>`
    // // Score
    // html += `<p><b>Score:</b> ${solution.totalScore}/${solution.maxTotalScore}</p><hr><br><br>`;
  }

  html += `<br><br><hr><strong class="font-bold">Examiner Feedback:</strong>${getFeedBack(submitedNum, marks)}<br><strong><u>Important Instructions:</u></strong><br>=> Don't post any marks-related issues on Facebook.<br>=> Make sure to read all the feedback carefully.
<strong>Let's Code_ Your Career</strong>`;
  return html;
}


// Examiner feedbacks
const defaultMessage = {
  BEST: [
    "Awesome work!🌟 Keep it up! 💪",
    "Wow! 👏 You did very well! It must have been your dedication and hard work behind it. Keep up the fantastic effort! 🚀",
    "Congratulations 🎉 on achieving a perfect score! You should be very proud! 🏆",
  ],
  GOOD: [
    "Good job! 👏 Keep working hard! 💪",
    "Solid effort!📈 Keep practicing, and you'll reach your goals! 🎯",
    "You're on the right track!📈 Keep up the good work! 👏",
  ],
  AVERAGE: [
    "There's always room for improvement. Keep practicing, and you'll see results! 💪",
    "It looks like you could use some extra practice. Don’t give up—keep at it! 🚀",
    "Remember, progress takes time ⏳. Keep working hard, and you'll improve! 🌟",
  ],
  BAD: [
    "Stay focused and keep pushing forward—wishing you the best of luck! 💪",
    "It looks like you faced some challenges this time. Don't be discouraged; keep at it! 💪",
    "Remember, everyone makes mistakes. Keep learning and growing! 🌟",
  ],
};

function getFeedBack(submittedMarks, obtainedMarks) {
  switch (submittedMarks) {
    case "60":
      // console.log("60");
      if (obtainedMarks >= submittedMarks * 0.9) {
        //54-60
        return defaultMessage["BEST"][
          Math.floor(Math.random() * defaultMessage["BEST"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.7) {
        //42-53
        return defaultMessage["GOOD"][
          Math.floor(Math.random() * defaultMessage["GOOD"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.5) {
        // 30-41
        return defaultMessage["AVERAGE"][
          Math.floor(Math.random() * defaultMessage["AVERAGE"].length)
        ];
      } else {
        //0-29
        return defaultMessage["BAD"][
          Math.floor(Math.random() * defaultMessage["BAD"].length)
        ];
      }

    case "50":
      console.log("50");
      if (obtainedMarks >= submittedMarks * 0.9) {
        //45-50
        return defaultMessage["BEST"][
          Math.floor(Math.random() * defaultMessage["BEST"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.7) {
        //35-44
        return defaultMessage["GOOD"][
          Math.floor(Math.random() * defaultMessage["GOOD"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.5) {
        // 25-34
        return defaultMessage["AVERAGE"][
          Math.floor(Math.random() * defaultMessage["AVERAGE"].length)
        ];
      } else {
        //0-24
        return defaultMessage["BAD"][
          Math.floor(Math.random() * defaultMessage["BAD"].length)
        ];
      }

    case "30":
      console.log("30");
      if (obtainedMarks >= submittedMarks * 0.9) {
        //27-30
        return defaultMessage["BEST"][
          Math.floor(Math.random() * defaultMessage["BEST"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.7) {
        //21-26
        return defaultMessage["GOOD"][
          Math.floor(Math.random() * defaultMessage["GOOD"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.5) {
        // 15-20
        return defaultMessage["AVERAGE"][
          Math.floor(Math.random() * defaultMessage["AVERAGE"].length)
        ];
      } else {
        //0-14
        return defaultMessage["BAD"][
          Math.floor(Math.random() * defaultMessage["BAD"].length)
        ];
      }

    default:
      return "Invalid marks.";
  }
}



