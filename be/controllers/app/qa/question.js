const { Question } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createQuestion(req, res) {}

async function getQuestion(req, res) {}

async function getAllQuestions(req, res) {}

async function editQuestion(req, res) {}

async function deleteQuestion(req, res) {}

module.exports = {
  createQuestion,
  getQuestion,
  getAllQuestions,
  editQuestion,
  deleteQuestion,
};
