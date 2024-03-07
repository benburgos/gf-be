const qa = require('./qaIndex');
const { v4: uuidv4 } = require('uuid');

let newScorecard = {};
let section1 = {};
let section2 = {};
let section3 = {};
let option1 = {};
let option2 = {};
let option3 = {};

newScorecard = {
  _id: uuidv4(),
  brandId: uuidv4(),
  teamId: uuidv4(),
  type: 'Native',
  criteria: [],
  isActive: true,
  dateUpdated: Date.now(),
  dateCreated: Date.now(),
};

option1 = {
  _id: uuidv4(),
  name: 'True or False',
  desc: [
    { position: 0, name: 'True', value: true },
    { position: 1, name: 'False', value: false },
  ],
  dateUpdated: Date.now(),
  dateCreated: Date.now(),
};
option2 = {
  _id: uuidv4(),
  name: 'Multiple Choice',
  desc: [
    { position: 0, name: 'Always', value: 'Always' },
    { position: 1, name: 'Sometimes', value: 'Sometimes' },
    { position: 2, name: 'Never', value: 'Never' },
  ],
  dateUpdated: Date.now(),
  dateCreated: Date.now(),
};
option3 = {
  _id: uuidv4(),
  name: 'Number Scale',
  desc: [
    { position: 0, name: 'Minimum', value: 0 },
    { position: 1, name: 'Max Value', value: 5 },
  ],
  dateUpdated: Date.now(),
  dateCreated: Date.now(),
};

section1 = {
  sectionId: uuidv4(),
  sectionName: 'Call Introduction',
  questions: [
    {
      questionId: uuidv4(),
      questionName: 'Proper Greeting',
      questionDesc:
        'Agent utilized the propery greeting with company branding.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      questionId: uuidv4(),
      questionName: 'Verification',
      questionDesc:
        'Agent property verified the caller per company standards.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      questionId: uuidv4(),
      questionName: 'Probing Questions',
      questionDesc:
        'Agent asked probing questions to identify the root cause of the customer issue.',
      optionName: option3.name,
      options: option3.desc,
    },
  ],
};
section2 = {
    sectionId: uuidv4(),
  sectionName: 'Call Body',
  questions: [
    {
      questionId: uuidv4(),
      questionName: 'Proper Greeting',
      questionDesc:
        'Agent utilized the propery greeting with company branding.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      questionId: uuidv4(),
      questionName: 'Verification',
      questionDesc:
        'Agent property verified the caller per company standards.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      questionId: uuidv4(),
      questionName: 'Probing Questions',
      questionDesc:
        'Agent asked probing questions to identify the root cause of the customer issue.',
      optionName: option3.name,
      options: option3.desc,
    },
  ],
};
section3 = {
    sectionId: uuidv4(),
  sectionName: 'Call Introduction',
  questions: [
    {
      questionId: uuidv4(),
      questionName: 'Proper Greeting',
      questionDesc:
        'Agent utilized the propery greeting with company branding.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      questionId: uuidv4(),
      questionName: 'Verification',
      questionDesc:
        'Agent property verified the caller per company standards.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      questionId: uuidv4(),
      questionName: 'Probing Questions',
      questionDesc:
        'Agent asked probing questions to identify the root cause of the customer issue.',
      optionName: option3.name,
      options: option3.desc,
    },
  ],
};

console.log(section1.questions[0].optionType);
