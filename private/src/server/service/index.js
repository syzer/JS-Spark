
/**
 * Created by syzer on 4/16/2014.
 */
module.exports = function indexService(root) {
    'use strict';
    return {
        defaultRoute: function (req, res) {
            "use strict";
            res.contentType("text/html");
            res.sendfile("public/index.html");
        },
    };
};
