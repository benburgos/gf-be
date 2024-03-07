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
  position: 0,
  questions: [
    {
      position: 0,
      questionId: uuidv4(),
      questionName: 'Proper Greeting',
      questionDesc:
        'Agent utilized the propery greeting with company branding.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      position: 1,
      questionId: uuidv4(),
      questionName: 'Verification',
      questionDesc: 'Agent property verified the caller per company standards.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      position: 2,
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
  position: 1,
  questions: [
    {
      position: 0,
      questionId: uuidv4(),
      questionName: 'Process & Procedure',
      questionDesc:
        'Agent utilized the proper process for the type of customer issue, within company procedures and guidelines.',
      optionName: option2.name,
      options: option2.desc,
    },
    {
      position: 1,
      questionId: uuidv4(),
      questionName: 'Call Control',
      questionDesc:
        'Agent limits small talk to a minimum to establish a rapport, remaining focused on issue resolution.',
      optionName: option3.name,
      options: option3.desc,
    },
    {
      position: 2,
      questionId: uuidv4(),
      questionName: 'Soft Skills',
      questionDesc:
        'Agent properly used the preferred name of the customer, limited the use of "uh" and "um", and refrained from using any internal company jargon.',
      optionName: option3.name,
      options: option3.desc,
    },
  ],
};
section3 = {
  sectionId: uuidv4(),
  sectionName: 'Call Close',
  position: 2,
  questions: [
    {
      position: 0,
      questionId: uuidv4(),
      questionName: 'Issue Resolution',
      questionDesc: 'Agent was able to solve the issue during the phone call.',
      optionName: option1.name,
      options: option1.desc,
    },
    {
      position: 1,
      questionId: uuidv4(),
      questionName: 'Call Recap & Additional Assistance',
      questionDesc:
        'Agent performed a recap of the call, any applicable next steps, and provided an offer of additional assistance.',
      optionName: option3.name,
      options: option3.desc,
    },
    {
      position: 2,
      questionId: uuidv4(),
      questionName: 'Close of Call',
      questionDesc:
        'Agent thanked the customer for calling in and pitched the CSAT survey.',
      optionName: option1.name,
      options: option1.desc,
    },
  ],
};

console.log(`Pre-Option: `, newScorecard);

newScorecard.criteria.push(section1);
newScorecard.criteria.push(section2);
newScorecard.criteria.push(section3);

console.log(`Post-Option:`, newScorecard);

console.log(`Section 1:`, newScorecard.criteria[0].sectionName);
console.log(`Section 1, Question 1:`, newScorecard.criteria[0].questions[0].questionName);
console.log(`Section 1, Question 1, Desc:`, newScorecard.criteria[0].questions[0].questionDesc);
console.log(`Section 1, Question 1, Option:`, newScorecard.criteria[0].questions[0].optionName);
console.log(`Section 1, Question 1, Possible Answers:`, newScorecard.criteria[0].questions[0].options);
