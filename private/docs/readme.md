internal docs like design docs
+ markups for auto generated user docs

rules
=====

codding style
=============
tab => 4 spaces

module + DI + config

DI
module pattern:

file `strategy.js` in `clients/push/strategy`
```JavaScript

module.exports = function strategyPushClients(arraySerializerService, clientQueService, when) {

    //private
    var array = [];

    return {

        // this method comment
        /** is also allowed */
        method1: function(param) {
            // code
        },

        // some comments
        push: publicFunction
    };

    // public methods
    function publicFunction(params) {

    }

    // private methods
    function privateFunction(params) {

    }
};
```

usage
=====

```JavaScript

    var clientsPushStrategy = sm.get('model.clients.push.strategy');

    clientsPushStrategy.push(tasks)
        .then(function (clients) {
            //
        });
```

instantiate
-----------

```JavaScript

    //...
    'model.strategy.push.clients': function addService(sm) {
        var model = require(ROOT + 'clients/push/strategy') (
            sm.get('service.serializer.array'),
            sm.get('service.que.client')
            sm.get('when')
        );
        return model;
    }
```

that means we try NOT to call `new` outside object/service registry
that will remove usage of singletons, also will allow easier testing
and portability

naming convention
-----------------
file `private/src/server/service/serializer/function`
module name:
camel case: `functionSerializerService`
pascal case: `FunctionSerializerService` (if to be called with `new`)

unit test file: `private/test/server/service/serializer/function`
module name: `functionSerializerServiceTest`


bower components are in /src/client/component

why `/node_modules`?
--------------------
short answer: because npm is limited.

promises:
---------
https://github.com/cujojs/when/wiki/Examples
