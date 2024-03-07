const option = require('./options/optionIndex');
const qa = require('./qaIndex');
const { v4: uuidv4 } = require('uuid');

let newScorecard = {}
let section1 = {}
let section2 = {}
let section3 = {}

newScorecard = {
    _id: uuidv4(),
    brandId: uuidv4(),
    teamId: uuidv4(),
    type: "Native",
    criteria: [],
    isActive: true,
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
}

section1 = {
    sectionId: uuidv4(),
    sectionName: "Call Introduction",
    questions: [
        {questionId: uuidv4(),
        questionDesc: "Proper Greeting",
        optionType: option.trueFalse.options,
        optionScore: false},
    ]
}
section2 = {}
section3 = {}


console.log(section1.questions[0].optionType)