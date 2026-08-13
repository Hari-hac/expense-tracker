const express = require('express');
const router = express.Router();

const {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense
} = require('../controllers/expenseController');

// GET    /api/expenses        → all expenses
// POST   /api/expenses        → create expense
// DELETE /api/expenses/:id    → delete by ID
// PUT    /api/expenses/:id    → update by ID

router.get('/', getExpenses);
router.post('/', createExpense);
router.delete('/:id', deleteExpense);
router.put('/:id', updateExpense);

module.exports = router;