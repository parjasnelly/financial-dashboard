const Expense = require('../../model/expense')

class ExpenseRepository {
    insert(expense){
        return Expense.create({...expense})
    }

    update(expense, id){
        return Expense.update({...expense}, { where: { id: id }})
    }

    delete(id){
        return Expense.destroy({ where: { id: id }})
    }


    findByID(id){
        return Expense.findAll({ where: { id: id }})
    }

    findAll(id){
        return Expense.findAll({ where: { AccountId: id }})
    }
}
module.exports = ExpenseRepository