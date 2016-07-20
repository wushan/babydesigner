module.exports = function(req, res, next) {
   if (req.isAuthenticated() && req.user.group == 'admin') {
        return next();
    }
    else{
        return res.redirect('/admin/login');
    }
};