/**
 * Created by syzer on 7/24/2014.
 */
module.exports = function indexController() {

    return {

        defaultRoute: function (req, res, next) {
            console.log('\n');
            return next();
        }


    };
};
