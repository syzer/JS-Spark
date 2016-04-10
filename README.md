What is JS-Spark
====
Distributed real time computation/job/work queue using JavaScript.
A JavaScript reimagining of the fabulous Apache Spark and Storm projects.

If you know `underscore.js` or [`lodash.js`](https://lodash.com/) you may use JS-Spark
as a distributed version of them.

If you know Distributed-RPC systems like [storm](https://storm.incubator.apache.org/documentation/Distributed-RPC.html)
you will feel at home.

If you've ever worked with distributed work queues such as Celery, 
you will find JS-Spark easy to use.

![main page](https://raw.github.com/syzer/JS-Spark/master/public/docs/JS-Spark-main-page.png)
![computing que](https://raw.github.com/syzer/JS-Spark/master/public/docs/JS-Spark-computing-que-view.png)



Why
===
There are no JS tools that can offload your processing to 1000+ CPUs.
Furthermore, existing tools in other languages, such as Seti@Home,
Gearman, require time, expensive setup of server, and later setting up/supervising clients machines. 

**We want to do better.**
On JS-Spark your clients need just to click on a **URL**, and the server side has one line installation (less than 5 min).

Hadoop is quite slow and requires maintaining a cluster - **we can to do better**.
Imagine that there's no need to set up expansive cluster/cloud solutions. 
Use web browsers! Easily scale to multiple clients. Clients do not need to install anything like Java or other plugins.

Setup in a matter of minutes and you are good to go.

The possibilities are endless:
--------------------------
No need to setup expensive clusters. 
The setup takes 5 min and you are good to go.
You can do it on one machine. Even on a Raspberry Pi.

* Use as ML tool to process in real time huge streams of data... while all clients still browse their favorite websites

* Use for big data analytics. Connect to Hadoop HDFS and process even terabytes of data.

* Use to safely transfer huge amount of data to remote computers.

* Use as CDN... Today most websites runs slower when more clients use them.
But using JS-Spark you can totally reverse this trend. Build websites that run FASTER the more people use them

* Synchronize data between multiple smartphones.. even in Africa

* No expensive cluster setup required!

* Free to use.

How (Getting started with npm)
=============================
To add a distributed job queue to any node app run:

        npm i --save js-spark

Look for **Usage with npm**.

Example: running multicore jobs in JS:
====================================
### Simple example with node multicore jobs
[example-js-spark-usage](https://github.com/syzer/example-js-spark-usage)

```bash
git clone git@github.com:syzer/example-js-spark-usage.git && cd $_
npm install
```

### Game of life example
[distributed-game-of-life](https://github.com/syzer/distributed-game-of-life.git)

```bash
git clone https://github.com/syzer/distributed-game-of-life.git && cd $_
npm install
```


### Example: NLP
This example shows how to use one of the Natural Language Processing tools called N-Gram
in a distributed manner using JS-Spark:

[Distributed-N-Gram](https://github.com/syzer/distributedNgram)


If you'd like to know more about N-grams please read: 

[http://en.wikipedia.org/wiki/N-gram](http://en.wikipedia.org/wiki/N-gram) 


How (Getting started)
====================
Prerequisites: install `Node.js`, then:
install grunt and bower,

```bash
sudo npm install -g bower
sudo npm install -g grunt
```

Install `js-spark`
----------------
```bash
npm i --save js-spark
#or use:
git clone git@github.com:syzer/JS-Spark.git && cd $_
npm install
```
        
Then run:
     
        node index & 
        node client
        
Or:
 
        npm start        
        
After that you may see how the clients do the heavy lifting.

        
Usage with npm
==============

```JavaScript
var core = require('jsSpark')({workers:8});
var jsSpark = core.jsSpark;

jsSpark([20, 30, 40, 50])
    // this is executed on the client
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
        // this is executed on back on the server
        console.log(data);
    })
```        

Usage (Examples)
===============
Client side heavy CPU computation (MapReduce)
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
    // how many times to repeat calculations
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
This project involves reimplementing some nice things from the world of big data, so there are of course some nice
resources you can use to dive into the topic:

* [Map-Reduce revisited](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.5859&rep=rep1&type=pdf)
* [Awesome BigData - A curated list of awesome frameworks, resources and other things.](https://github.com/onurakpolat/awesome-bigdata)


Running with UI
===============

        git clone git@github.com:syzer/JS-Spark.git && cd $_
        npm install
        grunt build
        grunt serve

To spam more light-weight (headless) clients:        
        
        node client



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

* on first run you need to seed the db: change option `seedDB: false` => `seedDB: true`
on `./private/srv/server/config/environment/development.js`

Tests
=====
`npm test`


TODO
====
- [X] service/file -> removed for other module
- [ ] di -> separate module
- [!] bower for js-spark client
- [ ] config-> merge different config files
- [!] server/auth -> split to js-spark-ui module
- [!] server/api/jobs -> split to js-spark-ui module
- [ ] split ui
- [X] more examples
- [X] example with cli usage (not daemon)
- [X] example with using thu
- [?] .add() is might be broken... maybe fix or remove
