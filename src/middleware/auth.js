module.exports = function (req, res, next) {
    if (req.isAuthenticated()) return next()

    req.flash('error', 'Não autorizado, por favor realize seu login!')
    res.redirect('/')
}
