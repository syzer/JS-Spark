WHAT
====
Distributed real time analytics using JAVASCRIPT.
JavaScript re imagine of fabulous Spark project.


WHY
===
Can run on multiple clients and browsers. Clients Do not need to install any Java, jar, plugins.
Hadoop is quite slow and requires maintaining cluster.


Possibilities are endless.
--------------------------
No need to setup expensive cluster. The setup takes 5 min and you are good to go. You can do it on one machine. Even on Raspberry Pi

* Use as CDN ... Today most websites runs slower with more clients use them.
But using JSpark you can totally reverse this trend. Build websites that run FASTER the more people use them

* Use as ML tool may process in real time huge streams of data... while all clients still browse their favorite websites

* Use as Big data analytics. Connect to Hadoop HDFS and process even terabytes of data.


* Free to use.


HOW
====
Proof Of Concept(POC):
>nodemon server.js
>nodemon client.js

run `npm install`
run `./build/gulp`
run `node serverExpress.js`

wait for clients to do all heavy lifting
