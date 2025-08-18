const testCases = {
  totalFine: {
    title: "Problem-01 : Train TT's Fine Calculator",
    parameter: 1,
    functionName: "totalFine",
    tests: [
      { input: 200, expected: 270, description: "expected = 270" },
      { input: 50, expected: 90, description: "expected = 90" },
      { input: 552, expected: 692.4, description: "expected = 692.4" },
      { input: 920, expected: 1134, description: "expected = 1134" },
      { input: 460, expected: 582, description: "expected = 582" },
      { input: 1000, expected: 1230, description: "expected = 1230" },
    ],
    challenges: [
      { input: 0, expected: "Invalid", description: "expected = Invalid" },
      { input: -35, expected: "Invalid", description: "expected = Invalid" },
      { input: "65", expected: "Invalid", description: "expected = Invalid" },
      {
        input: "Gorib",
        expected: "Invalid",
        description: "expected = Invalid",
      },
      { input: null, expected: "Invalid", description: "expected = Invalid" },
    ],
  },
  onlyCharacter: {
    title: "Problem-02 : Clean & Capitalize Characters",
    functionName: "onlyCharacter",
    parameter: 1,
    tests: [
      {
        input: "  h e llo wor   ld",
        expected: "HELLOWORLD",
        description: "expected = HELLOWORLD",
      },
      {
        input: "Cy   ber- At  tac k  ",
        expected: "CYBER-ATTACK",
        description: "expected = CYBER-ATTACK",
      },
      {
        input: " ha ck m e 1 @ru.c  n  ",
        expected: "HACKME1@RU.CN",
        description: "expected = HACKME1@RU.CN",
      },
      {
        input: "Serv er : : Do wn",
        expected: "SERVER::DOWN",
        description: "expected = SERVER::DOWN",
      },
    ],
    challenges: [
      {
        input: ["hack", "me"],
        expected: "Invalid",
        description: "expected = Invalid",
      },
      { input: true, expected: "Invalid", description: "expected = Invalid" },
      { input: {}, expected: "Invalid", description: "expected = Invalid" },
    ],
  },
  bestTeam: {
    title: "Problem-03 : FIFA Best Team Award",
    functionName: "bestTeam",
    tests: [
      {
        input: [
          { name: "Brazil", foul: 5, cardY: 1, cardR: 0 },
          { name: "Argentina", foul: 7, cardY: 0, cardR: 0 },
        ],
        expected: "Brazil",
        description: "expected = Brazil",
      },
      {
        input: [
          { name: "Germany", foul: 12, cardY: 0, cardR: 0 },
          { name: "Sweden", foul: 7, cardY: 4, cardR: 1 },
        ],
        expected: "Tie",
        description: "expected = Tie",
      },
      {
        input: [
          { name: "Germany", foul: 10, cardY: 1, cardR: 1 },
          { name: "France", foul: 10, cardY: 2, cardR: 1 },
        ],
        expected: "Germany",
        description: "expected = Germany",
      },
    ],
    challenges: [
      {
        input: [{ name: "Germany", foul: 10, cardY: 1, cardR: 1 }, "France"],
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: ["Brazil", "Argentina"],
        expected: "Invalid",
        description: "expected = Invalid",
      },
    ],
  },
  isSame: {
    title: "Problem-04 : Same Same But Different",
    functionName: "isSame",
    parameter: 2,
    tests: [
      {
        input: [
          [1, 2, 3],
          [1, 2, 3],
        ],
        expected: true,
        description: "expected = true",
      },
      {
        input: [
          [34, 5, 7, 9],
          [34, 5, 7],
        ],
        expected: false,
        description: "expected = false",
      },
      {
        input: [
          [1, undefined, 3],
          [1, null, 3],
        ],
        expected: false,
        description: "expected = false",
      },
      {
        input: [
          [1, 4, 5],
          [1, 4, 5],
        ],
        expected: true,
        description: "expected = true",
      },
      {
        input: [
          ["1", "4", 4],
          [1, 4, 4],
        ],
        expected: false,
        description: "expected = false",
      },
    ],
    challenges: [
      {
        input: [[2, 5, 6], 256],
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: [{ data: [2, 5, 6] }, [2, 5, 6]],
        expected: "Invalid",
        description: "expected = Invalid",
      },
    ],
  },
  resultReport: {
    title: "Problem-05 : Exam Result Report Generator",
    functionName: "resultReport",
    parameter: 1,
    tests: [
      {
        input: [],
        expected: { finalScore: 0, pass: 0, fail: 0 },
        description: "expected = { finalScore: 0, pass: 0, fail: 0 }",
      },
      {
        input: [98, 87, 67, 91, 92, 33, 87],
        expected: { finalScore: 79, pass: 6, fail: 1 },
        description: "expected = { finalScore: 79, pass: 6, fail: 1 }",
      },
      {
        input: [99, 87, 67, 12, 87],
        expected: { finalScore: 70, pass: 4, fail: 1 },
        description: "expected = { finalScore: 70, pass: 4, fail: 1 }",
      },
      {
        input: [99],
        expected: { finalScore: 99, pass: 1, fail: 0 },
        description: "expected = { finalScore: 99, pass: 1, fail: 0 }",
      },
    ],
    challenges: [
      { input: 100, expected: "Invalid", description: "expected = Invalid" },
      {
        input: "marks",
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: { math: 90 },
        expected: "Invalid",
        description: "expected = Invalid",
      },
    ],
  },
};
