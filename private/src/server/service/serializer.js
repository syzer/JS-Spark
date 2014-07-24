/**
 * Created by syzer on 7/24/2014.
 */
module.exports = function serializerService(serializerInj) {

    var JSON = serializerInj || JSON;
    var LAME_ERROR = 'To unserialize please give a string';

    return {

        // serializes objects
        // TODO type check
        stringify: function (object) {
            return JSON.stringify(object, functionStringify);
        },

        parse: function (string) {
            if ('string' !== typeof string) {
                throw new Error(LAME_ERROR);
            }
            return JSON.parse(string, functionCreate);
        }
    };

    // JSON serializer helpers
    function functionStringify(key, value) {
        if ('function' === typeof(value)) {
            return value.toString();
        }
        return value;
    }

    function functionCreate(key, value) {
        if (!key) {
            return value;
        }

        if (typeof value === 'string') {
            var funcRegExp = /function[^\(]*\(([^\)]*)\)[^\{]*{([^\}]*)\}/,
                match = value.match(funcRegExp);
            if (match) {
                var args = match[1]
                    .split(',')
                    .map(function (arg) {
                        return arg.replace(/\s+/, '');
                    });
                return new Function(args, match[2]);
            }
        }
        return value;
    }

};
