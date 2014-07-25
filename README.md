WHAT
====
Distributed real time analytics using JavaScript.
JavaScript re imagine of fabulous Apache Spark project.

WHY
===
Can run on multiple clients, e.g. browsers. Clients do not need to install anything like Java or other plugins.
Hadoop is quite slow and requires maintaining cluster - we want to do better.

Possibilities are endless.
--------------------------
No need to setup expensive cluster. The setup takes 5 min and you are good to go. You can do it on one machine. Even on Raspberry Pi

* Use as CDN ... Today most websites runs slower with more clients use them.
But using JSpark you can totally reverse this trend. Build websites that run FASTER the more people use them

* Use as ML tool may process in real time huge streams of data... while all clients still browse their favorite websites

* Use as Big data analytics. Connect to Hadoop HDFS and process even terabytes of data.

* Use to safely transfer huge ammount of data to remote computers.

* Synchronize data between multiple smartphones.. even in Africa

* Free to use.


HOW
====
Prerequisites

    run `npm install`
    run `./build/gulp`

Proof Of Concept(POC):

        nodemon server.js
        nodemon client.js

For the Webapplication:

    run `node serverExpress.js`


wait for clients to do all heavy lifting


Get Started
===========
This project is about to reimplement some nice things from the world of big data, so there are of course some nice
resources you can use to dive into the topic:

* [Map-Reduce revisited](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.104.5859&rep=rep1&type=pdf)
* [Awesome BigData - A curated list of awesome frameworks, ressources and other things.](https://github.com/onurakpolat/awesome-bigdata)
