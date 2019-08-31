    var ws = require("ws");

    var client = new ws('ws://localhost:3000');
    var result;

    client.send("GetForm");
    client.onmessage = function (e) {
        result = BSON.deserialize(e.data);
        console.log(result);
    }