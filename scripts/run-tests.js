
async function runTests(solution, testcases, container, status="extension") {
    // console.log("Starting test execution...", solution, testcases);
       if(status !== "manual") container.innerHTML = `<div>⌯⌲⏳Starting test execution...</div>`;

    const results = {
        totalScore: 0,
        maxScore: 0,
        problems: []
    };

    // Test cases data structure from the provided JSON
    const problemTests = {
        totalFine: testcases.totalFine,
        onlyCharacter: testcases.onlyCharacter,
        bestTeam: testcases.bestTeam,
        isSame: testcases.isSame,
        resultReport: testcases.resultReport
    };

    for (const solutionFunc of solution) {
        const functionName = solutionFunc.name;
        const problemData = problemTests[functionName];

        if (!problemData) {
            console.log(`No test data found for function: ${functionName}`);
            continue;
        }

        // console.log(`\n=== Testing ${functionName} ===`);
           if(status !== "manual") container.innerHTML = `<div>⌯⌲🧪Testing ${functionName}</div>`;

        const problemResult = {
            name: functionName,
            title: problemData.title,
            testCases: [],
            challenges: [],
            testScore: 0,
            challengeScore: 0,
            totalScore: 0,
            maxTestScore: problemData.tests.length,
            maxChallengeScore: problemData.challenges.length,
            maxTotalScore: 12
        };

        // Run regular test cases (10 marks total)
        // console.log(`Running ${problemData.tests.length} test cases...`);
        for (let i = 0; i < problemData.tests.length; i++) {
            const testCase = problemData.tests[i];
            try {
                // Prepare input based on function signature and test data structure
                let inputArgs;

                // Check the function's parameter count from the solution object
                const paramCount = solutionFunc.parameters ? solutionFunc.parameters.length : 1;

                if (Array.isArray(testCase.input)) {
                    if (paramCount > 1) {
                        // Multiple parameters - spread the array elements
                        inputArgs = testCase.input.map(arg => JSON.stringify(arg, (key, value) => value === undefined ? "__undefined__" : value)).join(', ');
                    } else {
                        // Single array parameter - pass as one argument
                        inputArgs = JSON.stringify(testCase.input);
                    }
                } else {
                    // Single parameter
                    inputArgs = typeof testCase.input === 'string' ? `"${testCase.input}"` : JSON.stringify(testCase.input);
                }

                const modifiedTestCase = {
                    ...testCase,
                    input: inputArgs
                };

                const executionResult = await executeCodeInIframe(
                    solutionFunc.code,
                    modifiedTestCase,
                    functionName,
                    3000
                );

                let passed = false;
                let errorMessage = null;

                if (executionResult.error) {
                    errorMessage = executionResult.error;
                    passed = false;
                } else {
                    // Compare result with expected
                    if (isDeepEqual(executionResult.result, testCase.expected)) {
                        passed = true;
                        problemResult.testScore++;
                    } else {
                        passed = false;
                        errorMessage = `Expected: ${JSON.stringify(testCase.expected)}, Got: ${JSON.stringify(executionResult.result)}`;
                    }
                }

                problemResult.testCases.push({
                    index: i + 1,
                    input: testCase.input,
                    expected: testCase.expected,
                    actual: executionResult.result,
                    passed: passed,
                    error: errorMessage,
                    stdout: executionResult.stdout,
                    description: testCase.description
                });

                // console.log(`Test ${i + 1}: ${passed ? 'PASSED' : 'FAILED'} ${errorMessage ? `- ${errorMessage}` : ''}`);

            } catch (error) {
                problemResult.testCases.push({
                    index: i + 1,
                    input: testCase.input,
                    expected: testCase.expected,
                    actual: null,
                    passed: false,
                    error: `Execution error: ${error.message}`,
                    stdout: [],
                    description: testCase.description
                });
                // console.log(`Test ${i + 1}: FAILED - Execution error: ${error.message}`);
            }
        }

        // Run challenge test cases (2 marks total)
        // console.log(`Running ${problemData.challenges.length} challenge cases...`);
        for (let i = 0; i < problemData.challenges.length; i++) {
            const challengeCase = problemData.challenges[i];
            try {
                // Prepare input for challenges
                let inputArgs;
                const paramCount = solutionFunc.parameters ? solutionFunc.parameters.length : 1;

                if (Array.isArray(challengeCase.input)) {
                    if (paramCount > 1) {
                        // Multiple parameters - spread the array elements
                        inputArgs = challengeCase.input.map(arg => JSON.stringify(arg)).join(', ');
                    } else {
                        // Single array parameter - pass as one argument
                        inputArgs = JSON.stringify(challengeCase.input);
                    }
                } else {
                    inputArgs = typeof challengeCase.input === 'string' ? `"${challengeCase.input}"` : JSON.stringify(challengeCase.input);
                }

                const modifiedChallengeCase = {
                    ...challengeCase,
                    input: inputArgs
                };

                const executionResult = await executeCodeInIframe(
                    solutionFunc.code,
                    modifiedChallengeCase,
                    functionName,
                    3000
                );

                let passed = false;
                let errorMessage = null;

                if (executionResult.error) {
                    errorMessage = executionResult.error;
                    passed = false;
                } else {
                    if (isDeepEqual(executionResult.result, challengeCase.expected)) {
                        passed = true;
                        problemResult.challengeScore++;
                    } else {
                        passed = false;
                        errorMessage = `Expected: ${JSON.stringify(challengeCase.expected)}, Got: ${JSON.stringify(executionResult.result)}`;
                    }
                }

                problemResult.challenges.push({
                    index: i + 1,
                    input: challengeCase.input,
                    expected: challengeCase.expected,
                    actual: executionResult.result,
                    passed: passed,
                    error: errorMessage,
                    stdout: executionResult.stdout,
                    description: challengeCase.description
                });

                // console.log(`Challenge ${i + 1}: ${passed ? 'PASSED' : 'FAILED'} ${errorMessage ? `- ${errorMessage}` : ''}`);

            } catch (error) {
                problemResult.challenges.push({
                    index: i + 1,
                    input: challengeCase.input,
                    expected: challengeCase.expected,
                    actual: null,
                    passed: false,
                    error: `Execution error: ${error.message}`,
                    stdout: [],
                    description: challengeCase.description
                });
                // console.log(`Challenge ${i + 1}: FAILED - Execution error: ${error.message}`);
            }
        }

        // Calculate scores
        const testScorePoints = (problemResult.testScore / problemResult.maxTestScore) * 10;
        const challengeScorePoints = (problemResult.challengeScore / problemResult.maxChallengeScore) * 2;
        problemResult.totalScore = Math.round((testScorePoints + challengeScorePoints) * 100) / 100;

        // console.log(`\n${functionName} Results:`);
        // console.log(`Test Cases: ${problemResult.testScore}/${problemResult.maxTestScore} (${testScorePoints.toFixed(1)}/10 points)`);
        // console.log(`Challenges: ${problemResult.challengeScore}/${problemResult.maxChallengeScore} (${challengeScorePoints.toFixed(1)}/2 points)`);
        // console.log(`Total Score: ${problemResult.totalScore}/12 points`);

        results.problems.push(problemResult);
        results.totalScore += problemResult.totalScore;
        results.maxScore += 12;
    }

    // console.log(`\n=== FINAL RESULTS ===`);
    // console.log(`Overall Score: ${results.totalScore.toFixed(1)}/${results.maxScore} points`);
    // console.log(`Percentage: ${((results.totalScore / results.maxScore) * 100).toFixed(1)}%`);

    // // Detailed breakdown
    // console.log(`\n=== DETAILED BREAKDOWN ===`);
    // results.problems.forEach(problem => {
    //     console.log(`\n${problem.name} (${problem.title}):`);
    //     console.log(`  Score: ${problem.totalScore}/12`);
    //     console.log(`  Test Cases: ${problem.testScore}/${problem.maxTestScore}`);
    //     console.log(`  Challenges: ${problem.challengeScore}/${problem.maxChallengeScore}`);

    //     // Show failed test cases
    //     const failedTests = problem.testCases.filter(t => !t.passed);
    //     if (failedTests.length > 0) {
    //         console.log(`  Failed Tests:`);
    //         failedTests.forEach(test => {
    //             console.log(`    Test ${test.index}: ${test.error}`);
    //         });
    //     }

    //     const failedChallenges = problem.challenges.filter(c => !c.passed);
    //     if (failedChallenges.length > 0) {
    //         console.log(`  Failed Challenges:`);
    //         failedChallenges.forEach(challenge => {
    //             console.log(`    Challenge ${challenge.index}: ${challenge.error}`);
    //         });
    //     }
    // });

    return results;
}