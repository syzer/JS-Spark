What is JS-Spark
====
Distributed real time analytics using JavaScript.
JavaScript re imagine of fabulous Apache Spark and Storm projects.

If you know `underscore.js` or [`lodash.js`](https://lodash.com/) you may think of JS-Spark
as distributed version of them.

If you know Distributed-RPC systems like [storm](https://storm.incubator.apache.org/documentation/Distributed-RPC.html)
you will feel like home.

Why
===
Hadoop is quite slow and requires maintaining cluster - we want to do better. Imagine that theres no need to setup expansive cluster/clud solutions. Use webrowsers! Easily scale to multiple clients. Clients do not need to install anything like Java or other plugins.

Setup in mater of minutes and you are good to go.

Possibilities are endless:
--------------------------
No need to setup expensive cluster. The setup takes 5 min and you are good to go. You can do it on one machine. Even on Raspberry Pi

* Use as CDN ... Today most websites runs slower with more clients use them.
But using JSpark you can totally reverse this trend. Build websites that run FASTER the more people use them

* Use as ML tool may process in real time huge streams of data... while all clients still browse their favorite websites

* Use as Big data analytics. Connect to Hadoop HDFS and process even terabytes of data.

* Use to safely transfer huge amount of data to remote computers.

* Synchronize data between multiple smart phones.. even in Africa

* No expensive cluster setup required!

* Free to use.


How(Getting started)
====================
Prerequisites, install any! server (ex: Node.js), then:

    run `npm install`


Proof Of Concept(POC):

        node server.js
        node client.js
        
Start on your machine and see how the clients do all calculation.

wait for clients to do all heavy lifting

Usage
=====
Client side heavy CPU computation
----------------------------------

```JavaScript
task = jsSpark([20])
    .map(function addOne(num) {
        return num + 1;
    })
    .createTask();
```

Combined usage with server side processing
------------------------------------------

```JavaScript
task3 = task
    .promise
    .then(function serverSideComputingOfData(data) {
        var basesNumber = data.split(',').map(Number)[0] + 21;
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
