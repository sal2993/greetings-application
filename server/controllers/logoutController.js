module.exports.home = home;

function home(req, res, next) {
    // Send User Token via Cookie
    var cookieOptions = {
        httpOnly: true
    };
    res.clearCookie('jwt', cookieOptions);
    res.redirect('/');
}