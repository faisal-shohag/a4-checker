const testCases = {
  totalFine: {
    title: "Problem-01 : Train TT's Fine Calculator",
    parameter: 1,
    functionName: "totalFine",
    tests: [
      { input: 100, expected: 150, description: "expected = 150" },
      { input: 200, expected: 270, description: "expected = 270" },
      { input: 50, expected: 90, description: "expected = 90" },
      { input: 60, expected: 102, description: "expected = 102" },
      { input: 410, expected: 522, description: "expected = 522" },
    ],
    challenges: [
      { input: 0, expected: "Invalid", description: "expected = Invalid" },
      {
        input: "gorib",
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: -500,
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: true,
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: { fare: "30" },
        expected: "Invalid",
        description: "expected = Invalid",
      },
    ],
  },
  onlyCharacter: {
    title: "Problem-02 : Clean & Capitalize Characters",
    functionName: "onlyCharacter",
    parameter: 1,
    tests: [
      {
        input: "h e l  lo  ",
        expected: "HELLO",
        description: "expected = HELLO",
      },
      {
        input: " p r o   gram m ing",
        expected: "PROGRAMMING",
        description: "expected = PROGRAMMING",
      },
      {
        input: "cod e  ",
        expected: "CODE",
        description: "expected = CODE",
      },
      {
        input: "faisal 1 # 1 ",
        expected: "FAISAL1#1",
        description: "expected = FAISAL1#1",
      },
      {
        input: " j- 6 7@ p hero.c om  ",
        expected: "J-67@PHERO.COM",
        description: "expected = J-67@PHERO.COM",
      },
    ],
    challenges: [
      { input: 1, expected: "Invalid", description: "expected = Invalid" },
      {
        input: true,
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: { code: "data" },
        expected: "Invalid",
        description: "expected = Invalid",
      },
      { input: [], expected: "Invalid", description: "expected = Invalid" },
    ],
  },
  bestTeam: {
    title: "Problem-03 : FIFA Best Team Award",
    functionName: "bestTeam",
    tests: [
      {
        input: [
          {
            name: "Brazil",
            foul: 3,
            cardY: 1,
            cardR: 2,
          },
          {
            name: "Germany",
            foul: 5,
            cardY: 0,
            cardR: 4,
          },
        ],
        expected: "Brazil",
        description: "expected = Brazil",
      },
      {
        input: [
          {
            name: "Bangladesh",
            foul: 6,
            cardY: 0,
            cardR: 0,
          },
          {
            name: "India",
            foul: 15,
            cardY: 0,
            cardR: 0,
          },
        ],
        expected: "Bangladesh",
        description: "expected = Bangladesh",
      },
      {
        input: [
          {
            name: "Japan",
            foul: 10,
            cardY: 0,
            cardR: 0,
          },
          {
            name: "Korea",
            foul: 5,
            cardY: 2,
            cardR: 3,
          },
        ],
        expected: "Tie",
        description: "expected = Tie",
      },
    ],
    challenges: [
      {
        input: ["France", "Portugal"],
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: [
          {
            name: "Jordan",
            foul: 6,
            cardY: 0,
            cardR: 0,
          },
          true,
        ],
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: [
          180,
          {
            name: "Korea",
            foul: 5,
            cardY: 2,
            cardR: 3,
          },
        ],
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
          [11, 12],
          [21, 23],
        ],
        expected: false,
        description: "expected = false",
      },
      {
        input: [[99], [99]],
        expected: true,
        description: "expected = true",
      },
      {
        input: [
          [23, 45, 67, 99],
          [23, 45, 67],
        ],
        expected: false,
        description: "expected = false",
      },
      {
        input: [
          [23, 45, 67],
          ["23", 45, "67"],
        ],
        expected: false,
        description: "expected = false",
      },
    ],
    challenges: [
      {
        input: [
          {
            arr: [1, 3],
          },
          [1, 3],
        ],
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: [[1, 3], false],
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: ["1,2", "3,2"],
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
        input: [90, 87, 67],
        expected: {
          finalScore: 81,
          pass: 3,
          fail: 0,
        },
        description: "expected = {finalScore:81,pass:3,fail:0}",
      },
      {
        input: [99, 34, 56, 32],
        expected: {
          finalScore: 55,
          pass: 2,
          fail: 2,
        },
        description: "expected = {finalScore:55,pass:2,fail:2}",
      },
      {
        input: [],
        expected: {
          finalScore: 0,
          pass: 0,
          fail: 0,
        },
        description: "expected = {finalScore:0,pass:0,fail:0}",
      },
      {
        input: [30, 35, 39],
        expected: {
          finalScore: 35,
          pass: 0,
          fail: 3,
        },
        description: "expected = {finalScore:35,pass:0,fail:3}",
      },
      {
        input: [39, 40],
        expected: {
          finalScore: 40,
          pass: 1,
          fail: 1,
        },
        description: "expected = {finalScore:40,pass:1,fail:1}",
      },
    ],
    challenges: [
      {
        input: 1,
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: true,
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: "98,79,81",
        expected: "Invalid",
        description: "expected = Invalid",
      },
      {
        input: {
          result: [100, 98, 67],
        },
        expected: "Invalid",
        description: "expected = Invalid",
      },
    ],
  },
};
