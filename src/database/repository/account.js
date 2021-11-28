const Account = require('../../model/account')

class AccountRepository {
    insert(account){
        return Account.create({...account})
    }

    update(account, id){
        return Account.update({...account}, { where: { id: id }})
    }

    delete(id){
        return Account.destroy({ where: { id: id }})
    }

    findByUsername(username){
        return Account.findAll({ where: { username: username }})
    }

    findByID(id){
        return Account.findAll({ where: { id: id }})
    }

    findAll(){
        return Account.findAll()
    }
}
module.exports = AccountRepository