/**
 * Created by syzer on 2/26/2015.
 */
var _ = require('lodash');

function testMe(arg) {
    return arg + " was called.";
}

var x = 7;

var scope = {
    x: x
};

var otherObj = {
    bar: function (num) {
        return function () {
            return num + 1;
        }
    }
};

var obj = {
    foo: 'bar',
    foo2: function () {
        console.log(x); // side effect
        console.log(this.z);
        return x;
    },
    foo3: otherObj.bar(1001),
    toArgs: function() {            //TODO check this
        return arguments;
    },
    toSource: function() {          //TODO check this
        return this;
    }
};

//var serialized = PClosure(obj);

//var PClosure = function(obj) {
//    return '';
//};

var PclosuereDeserialize = function (str) {
    JSON.parse(str);
    scope.forEach(function (varName) {
        eval(varName)
    })
};

var print = console.log;
var secondProperty = Object.getOwnPropertyNames(obj)[1];
var secPropString = obj[secondProperty].toString();
//x = null;
//print(eval('y=' + secPropString + ';')); //if function
//print(y());
console.log(secPropString);
function shellIEval(str) {
    var symbols = str.split(' ').map(function (el) {
        return el.replace(/\W/g, '');
    }).filter(function (el) {
        return el !== ''
    }).filter(isNotKeyword);
    console.log(symbols);
}
shellIEval(secPropString);




function isNotKeyword(word) {
    var keywords = [
        'do',
        'if',
        'in',
        'for',
        'let',
        'new',
        'try',
        'var',
        'case',
        'else',
        'enum',
        'eval',
        'null',
        'this',
        'true',
        'void',
        'with',
        'break',
        'catch',
        'class',
        'const',
        'false',
        'super',
        'throw',
        'while',
        'yield',
        'delete',
        'export',
        'import',
        'public',
        'return',
        'static',
        'switch',
        'typeof',
        'default',
        'extends',
        'finally',
        'package',
        'private',
        'continue',
        'debugger',
        'function',
        'arguments',
        'interface',
        'protected',
        'implements',
        'instanceof'
    ];
    console.log(word);
    return _.isEmpty(keywords.filter(function (el) {
        return el === word;
    }));
}
console.log('BAZ', isNotKeyword('x'));

