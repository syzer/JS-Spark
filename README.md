What is JS-Spark
====
Distributed real time computation/job/work que using JavaScript.
JavaScript re imagine of fabulous Apache Spark and Storm projects.

If you know `underscore.js` or [`lodash.js`](https://lodash.com/) you may use of JS-Spark
as distributed version of them.

If you know Distributed-RPC systems like [storm](https://storm.incubator.apache.org/documentation/Distributed-RPC.html)
you will feel like home.

If you ever worked with distributed work que such as Celery, 
you will find JS-Spark easy to use.

![main page](https://raw.github.com/syzer/JS-Spark/master/public/docs/JS-Spark-main-page.png)
![computing que](https://raw.github.com/syzer/JS-Spark/master/public/docs/JS-Spark-computing-que-view.png)



Why
===
There are no JS tools that can offload your processing to 1000+ CPU.
Furthermore exiting tools in other languages, such as Seti@Home, Gearman, requires time expensive setup of server and later setting up/supervising on clients machines. 

**We want to do better** on JS-Spark your clients need just to click on a **URL**, and on a server side has one line installation (less than 5 min).

Hadoop is quite slow and requires maintaining cluster - **we can to do better**. Imagine that there's no need to setup expansive cluster/cloud solutions. 
Use webrowsers! Easily scale to multiple clients. Clients do not need to install anything like Java or other plugins.

Setup in mater of minutes and you are good to go.

Possibilities are endless:
--------------------------
No need to setup expensive cluster. The setup takes 5 min and you are good to go. You can do it on one machine. Even on Raspberry Pi

* Use as ML tool may process in real time huge streams of data... while all clients still browse their favorite websites

* Use as Big data analytics. Connect to Hadoop HDFS and process even terabytes of data.

* Use to safely transfer huge amount of data to remote computers.

* Use as CDN ... Today most websites runs slower with more clients use them.
But using JSpark you can totally reverse this trend. Build websites that run FASTER the more people use them

* Synchronize data between multiple smart phones.. even in Africa

* No expensive cluster setup required!

* Free to use.

How(Getting started with npm)
=============================
To add a distributed job cue to anny node app simply:

        npm i --save js-spark

Look for **Usage with npm**.

How(Getting started)
====================
Prerequisites: install `Node.js`, then:
install grunt and bower,

```bash
sudo npm install -g bower
sudo npm install -g grunt
```

Install js-spark
----------------
```bash
git clone git@github.com:syzer/JS-Spark.git && cd $_
npm install
```
        
Then run:
     
        node index & 
        node client
        
Or:
 
        npm start        
        
After that you may see how the clients do all calculation, and all heavy lifting.


Example running multicore jobs in js:
====================================
[example-js-spark-usage](https://github.com/syzer/example-js-spark-usage)

```bash
git clone git@github.com:syzer/example-js-spark-usage.git && cd $_
npm install
```


Running with UI
---------------
        git clone git@github.com:syzer/JS-Spark.git && cd $_
        npm install
        grunt build
        grunt serve

To spam more light-weight clients:        
        
        node client

        
Usage with npm
==============

```js
var core = require('jsSpark')({workers:8});
var jsSpark = core.jsSpark;

jsSpark([20, 30, 40, 50])
    // this is executed on client side
    .map(function addOne(num) {
        return num + 1;
    })
    .reduce(function sumUp(sum, num) {
        return sum + num;
    })
    .thru(function addString(num){
        return "It was a number but I will convert it to " + num; 
    })
    .run()
    .then(function(data) {
        // this is executed on back on server
        console.log(data);
    })
```        

Example NLP
===========
This example shows how to use one of the Natural Language Processing tools called N-Gram
in distributed manner using jsSpark:


[Distributed-N-Gram](https://github.com/syzer/distributedNgram)


To if you like to know more about the N-grams please read: 

[http://en.wikipedia.org/wiki/N-gram](http://en.wikipedia.org/wiki/N-gram) 


Usage(Examples)
===============
Client side heavy CPU computation(MapReduce)
--------------------------------------------

```JavaScript
task = jsSpark([20, 30, 40, 50])
    // this is executed on client side
    .map(function addOne(num) {
        return num + 1;
    })
    .reduce(function sumUp(sum, num) {
        return sum + num;
    })
    .run();
```


Distributed version of lodash/underscore 
----------------------------------------

```JavaScript
jsSpark(_.range(10))
     // https://lodash.com/docs#sortBy
    .add('sortBy', function _sortBy(el) {
        return Math.sin(el);
    })
    .map(function multiplyBy2(el) {
        return el * 2;
    })
    .filter(function remove5and10(el) {
        return el % 5 !== 0;
    })
    // sum of  [ 2, 4, 6, 8, 12, 14, 16, 18 ] => 80
    .reduce(function sumUp(arr, el) {
        return arr + el;
    })
    .run();
```


Multiple retry and clients elections
------------------------------------
If you run calculations via unknown clients is better to recalculate 
same tasks on different clients:


```JavaScript
jsSpark(_.range(10))
    .reduce(function sumUp(sum, num) {
        return sum + num;
    })
    // how many times repeat calculations
    .run({times: 6})
    .then(function whenClientsFinished(data) {
        // may also get 2 most relevant answers
        console.log('Most clients believe that:');
        console.log('Total sum of numbers from 1 to 10 is:', data);
    })
    .catch(function whenClientsArgue(reason) {
        console.log('Most clients could not agree, ', + reason.toString());
    });
```


Combined usage with server side processing
------------------------------------------

```JavaScript
task3 = task
    .then(function serverSideComputingOfData(data) {
        var basesNumber = data + 21;
        // All your 101 base are belong to us
        console.log('All your ' + basesNumber + ' base are belong to us');
        return basesNumber;
    })
    .catch(function (reason) {
        console.log('Task could not compute ' + reason.toString());
    });
```



More references
===============
This project is about to reimplemented some nice things from the world of big data, so there are of course some nice
resources you can use to dive into the topic:

* [Map-Reduce revisited](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.5859&rep=rep1&type=pdf)
* [Awesome BigData - A curated list of awesome frameworks, resources and other things.](https://github.com/onurakpolat/awesome-bigdata)


Required to run UI
==================
* mongoDB
default connection parameters:

* mongodb://localhost/jssparkui-dev user: 'js-spark', pass: 'js-spark1'
install mongo, make sure mongod(mongo service) is running
run mongo shell with command:

```js
mongo
use jssparkui-dev
db.createUser({ 
  user: "js-spark",
  pwd: "js-spark1",
  roles: [
    { role: "readWrite", db: "jssparkui-dev" }
  ]
})
```
* old mongodb engines can use `db.addUser()` with same API
* to run without UI db code is not required!

* on first run need to seed the db: change option `seedDB: false` => `seedDB: true`
on `./private/srv/server/config/environment/development.js`

Tests
=====
`npm test`


TODO
====
- [ ] remove
- [ ] service/file
- [ ] di -> separate module
- [ ] bower for js-spark client
- [ ] config-> merge diferent config files
- [ ] server/auth -> do we need that?
- [ ] server/api/jobs -> separate module?
- [ ] split ui
- [X] more examples
- [X] example with cli usage (not daemon)
- [X] example with using thu
- [ ] add is broken... maybe fix or remove
