const express = require('express')
const route = express.Router()
const ExpenseRepository = require('../database/repository/expense')
const RevenueRepository = require('../database/repository/revenue')
const eRepo = new ExpenseRepository()
const revRepo = new RevenueRepository()

const ensureAuthenticated = require('../middleware/auth')
route.get('/', ensureAuthenticated,async (req, res) => {
    let revenues = await revRepo.findAll(req.user.id)
    let expenses = await  eRepo.findAll(req.user.id)
    res.render("pages/dashboard", {user: req.user, expenses: expenses, revenues: revenues})
})

route.get('/revenues/new', ensureAuthenticated,(req, res) =>{
    console.log("ss")
    let options = {
        formName:'Nova Receita',
        item: null,
        url:'/dashboard/revenues/new'
    }
    res.render("pages/itemForm", {options: options, user: req.user, error: null})
})

route.get('/expenses/new', ensureAuthenticated,(req, res) =>{
    let options = {
        formName:'Nova Dívida',
        item: null,
        url:'/dashboard/expenses/new'
    }
    res.render("pages/itemForm", {options: options, user: req.user, error: null})
})

route.get('/revenues/edit/:id', ensureAuthenticated,async (req, res) =>{
    let revenue = await revRepo.findByID(parseInt(req.params.id))
    let options = {
        formName:'Editar Receita',
        item: revenue[0],
        url:'/dashboard/revenues/edit'
    }
    res.render("pages/itemForm", {options: options,user: req.user, error: null})
})

route.get('/expenses/edit/:id', ensureAuthenticated,async (req, res) =>{
    let expense = await eRepo.findByID(parseInt(req.params.id))
    let options = {
        formName:'Editar Despesa',
        item: expense[0],
        url:'/dashboard/expenses/edit'
    }
    res.render("pages/itemForm", {options: options,user: req.user, error: null})
})

route.post('/revenues/remove/:id',ensureAuthenticated, async (req, res) =>{
    let id = parseInt(req.params.id)
    revRepo.delete(id)
    res.redirect("/dashboard")
})

route.post('/expenses/remove/:id',ensureAuthenticated, async (req, res) =>{
    let id = parseInt(req.params.id)
    eRepo.delete(id)
    res.redirect("/dashboard")
})

route.post('/revenues/edit',ensureAuthenticated ,async (req, res) =>{
    let id = parseInt(req.body.id)
    let name = req.body.name
    let value = parseFloat(req.body.value)

    let revenue = await revRepo.findByID(id)
    let options = {
        formName:'Editar Receita',
        category: revenue[0],
        url:'/dashboard/revenues/edit'
    }
    if(name){
        let rev = {name:name, value: value}
        revRepo.update(rev,id)
        res.redirect("/dashboard")
    } else{
        let error ={
            message: "O campo não pode ser vazio"
        }
        res.render("pages/itemForm", {options: options,user: req.user, error})
    }

})

route.post('/expenses/edit',ensureAuthenticated ,async (req, res) =>{
    let id = parseInt(req.body.id)
    let name = req.body.name
    let value = parseFloat(req.body.value)

    let expense = await eRepo.findByID(id)
    let options = {
        formName:'Editar Dívida',
        category: expense[0],
        url:'/dashboard/expenses/edit'
    }
    if(name){
        let exp = {name:name, value: value}
        eRepo.update(exp,id)
        res.redirect("/dashboard")
    } else{
        let error ={
            message: "O campo não pode ser vazio"
        }
        res.render("pages/itemForm", {options: options,user: req.user, error})
    }

})

route.post('/revenues/new',ensureAuthenticated ,async (req, res) =>{
    let name = req.body.name
    let value = req.body.value
    let AccountId = parseInt(req.user.id)
    let options = {
        formName:'Nova Receita',
        item: null,
        url:'/dashboard/revenues/new'
    }

    if(name&&value){
        let rev = {name:name, value: parseFloat(value), AccountId: AccountId}
        revRepo.insert(rev)
        res.redirect("/dashboard")
    } else {
        let error ={
            message: "Você precisa informar o nome e o valor"
        }
        res.render("pages/itemForm", {options: options,user: req.user, error})
    }

})

route.post('/expenses/new',ensureAuthenticated ,async (req, res) =>{
    let name = req.body.name
    let value = req.body.value
    let AccountId = parseInt(req.user.id)
    let options = {
        formName:'Nova Dívida',
        item: null,
        url:'/dashboard/expenses/new'
    }

    if(name&&value){
        let exp = {name:name, value: parseFloat(value), AccountId: AccountId}
        eRepo.insert(exp)
        res.redirect("/dashboard")
    } else {
        let error ={
            message: "Você precisa informar o nome e o valor"
        }
        res.render("pages/itemForm", {options: options,user: req.user, error})
    }

})
module.exports = route