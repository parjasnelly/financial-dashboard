const Revenue = require('../../model/revenue')

class RevenueRepository {
    insert(revenue){
        return Revenue.create({...revenue})
    }

    update(revenue, id){
        return Revenue.update({...revenue}, { where: { id: id }})
    }

    delete(id){
        return Revenue.destroy({ where: { id: id }})
    }


    findByID(id){
        return Revenue.findAll({ where: { id: id }})
    }

    findAll(id){
        return Revenue.findAll({ where: { AccountId: id }})
    }
}
module.exports = RevenueRepository