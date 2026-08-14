const Expense = require('../models/expense');

// @desc  Get all expenses
// @route GET /api/expenses
const getExpenses = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    // Calculate total amount
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.status(200).json({ expenses, total });
  } catch (error) {
    next(error);
  }
};

// @desc  Create a new expense
// @route POST /api/expenses
const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      res.status(400);
      throw new Error('Title, amount, and category are required');
    }

    const expense = new Expense({ title, amount, category, date });
    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    next(error);
  }
};

// @desc  Update an expense
// @route PUT /api/expenses/:id
const updateExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category, date },
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404);
      throw new Error('Expense not found');
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc  Delete an expense
// @route DELETE /api/expenses/:id
const deleteExpense = async (req, res, next) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404);
      throw new Error('Expense not found');
    }

    res.status(200).json({ message: 'Expense deleted successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };