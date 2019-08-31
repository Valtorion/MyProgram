var bd = require("mysql2");
var http = require('http');
var Static = require('node-static');
var WebSocket = require("ws");


var g_id;
server = new WebSocket.Server( {port: 1337} );


const connected = bd.createConnection(
    {
        host: "localhost",
        user: "Krait",
        database: "prakt",
        password: "MyBDSQL",
    }
);

connected.connect(function(err)
{
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    
});

server.on("connection", function(ws)
{
    console.log("соединение есть");
    
    ws.on("message", function(message)
    {
        
        result = JSON.parse(message);
            if (result[0] == "CheckForm") 
            {
                CheckForm(result, ws);
            }

            if (result[0] == "AddStudent") 
            {
                AddStudent(result, ws);
            }

            if (result[0] == "login") 
            {
                setTimeout(function(){ws.send(JSON.stringify(result))}, 100);
                
            }

            if (result[0] == "AStudent") 
            {
                setTimeout(function(){ws.send(JSON.stringify(result))}, 100);
            }

            if (result[0] == "GetForm") 
            {
                GetForm(ws, result[1], result[2]);     
            }

            if (result[0] == "AccesForm")
            {
                AccesForm(ws, result);
            }

            if (result[0] == "CreateTable")
            {
                CreateTable(ws, result);
            }

            if (result[0] == "AddDZ")
            {
                CheckDZ(ws, result);
            }

            if (result[0] == "ChancheDZ")
            {
                ChancheDZ(ws, result);
            }

            if (result[0] == "Obj") 
            {
                GetObj(ws);    
            }

            if (result[0] == "SearchDZ") 
            {
                SearchDZ(ws, result);    
            }

            if (result[0] == "DeleteDZ") 
            {
                DeleteDZ(ws, result);
            }

            if (result[0] == "Groop_id") 
            {
                ws.send(JSON.stringify(["Groop_id", g_id]));  
            }
            


        
    });
    

});

var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  
  fileServer.serve(req, res);

}).listen(8080);

console.log("Сервер запущен на портах 8080, 1337");


function AccesForm(ws, result) 
{
    delete result[0];

    g_id = result["Groop"];
}



// Функции страницы результата

function CreateTable(ws, result)
{
    var date = new Date(Date.parse(result[1]));
    var DZplan = [];
    var DZplanF = [];
    var DZ = [];
    var resR = [];

    DZ[0] = "CreateTable";

    if (date != "Invalid Date")
    {
        if (date.getDay() != 1)
        {
            date.setDate(date.getDate() - date.getDay() + 1);
        }

        var strDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        for (let i = 0; i < 2; i++) 
        {
            for (let j = 0; j < 6; j++) 
            {
                DZplan.push(strDate);

                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);

                DZplanF.push(date.toISOString());
                date.setDate(date.getDate() + 1);
                strDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            }
            
            date.setDate(date.getDate() + 1);
        }


        connected.query("SELECT * FROM DZ_study NATURAL JOIN DZ WHERE Groop_id =? AND date IN (?)", [result[2], DZplan], 
        function(err, res)
        {
            if (err) 
            {
                return console.error("Ошибка: " + err.message);
            }

            resR = res;

        });

        setTimeout(
        function()
        {
            var coinc;
            var dateISO;
            var DZarr = [];

            
            for (let i = 0; i < 12; i++) 
            {
                coinc = false;
                
                for (var g = 0; g < resR.length; g++) 
                {
                    dateISO = resR[g]["date"].toISOString();


                    if (DZplanF[i] == dateISO) 
                    {
                        DZarr.push(resR[g]);
                        coinc = true;
                    }
                        
                }

                if (coinc == false) 
                {
                    DZ.push([DZplanF[i], ""]);    
                }else
                {
                    DZ.push([DZplanF[i], DZarr]);
                    DZarr = [];
                }


            }

            ws.send(JSON.stringify(DZ));
        }, 1000);

        
        
    }
    
    ws.send(JSON.stringify(result));

    
}


function CheckDZ(ws, result) 
{
    var checkP = [];

    checkP.push(result["Groop"]);
    checkP.push(result["date"]);
    checkP.push(result["Obj"]);

    

    connected.query("SELECT EXISTS(SELECT * FROM DZ_study NATURAL JOIN DZ WHERE Groop_id=? AND date=? AND Obj=?);",checkP,
    function(err, check) 
    {
        if (err) 
        {
            return console.error("Ошибка: " + err.message);
        }

        var ch;
        for (i in check[0])
        {
            ch = check[0][i];
        }

        if (result[0] == "AddDZ") 
        {
            if (ch == 0) 
            {
                AddDZ(ws, result);
            }else
            {
                
                ws.send(JSON.stringify(["AddDZ", false]));
                
            }
        }
        
    }
    );

}




function AddDZID(result)
{
    connected.query("INSERT INTO DZ_study(Groop_id, dz_id) VALUES(?, ?)", [result["Groop"], result["dz_id"]], 
    function(err, res)
    {
        if (err) 
        {
            return console.error("Ошибка: " + err.message);
        }   
    });
}


function AddDZ(ws, result)
{
    var pushOn = [];

    pushOn.push(result["date"]);
    pushOn.push(result["Obj"]);
    pushOn.push(result["DZtext"]);
    pushOn.push(" ");

    connected.query("INSERT INTO DZ(date, obj, dz, dz_id, OTime) values(?, ?, ?, ?, '')", pushOn, 
    function(err, res)
    {
        if (err) 
        {
            return console.error("Ошибка: " + err.message);
        } 
    }
    );

    connected.query("SELECT dz_id FROM DZ WHERE date=? AND obj=?", [result["date"], result["Obj"]], 
    function(err, res)
    {
        if (err) 
        {
            return console.error("Ошибка: " + err.message);
        }

        result["dz_id"] = res[0]["dz_id"];
        AddDZID(result);
    });


    ws.send(JSON.stringify(["AddDZ", true]));


}



function ChancheDZ(ws, result)
{
    connected.query("UPDATE DZ SET dz=? WHERE dz_id=?", [result[1], result[2]], 
    function(err, res)
    {
        if (err) 
        {
            return console.error("Ошибка: " + err.message);
        }

        ws.send(JSON.stringify(["ChancheDZ", true]));
    });
      
}



function DeleteDZ(ws, result)
{
    connected.query("DELETE from DZ WHERE dz_id=?", result[1],
    function(err, res)
    {
        if (err) 
        {
            return console.error("Ошибка: " + err.message);
        } 
    });

    ws.send(JSON.stringify(["DeleteDZ", true]));
}



function SearchDZ(ws, result) 
 {
    connected.query("select * from DZ WHERE obj=?", result[1],
    function(err, res) 
    {
        if (err) {
            return console.error("Ошибка: " + err.message);
        }

        var date = 0;

        if (res == "") 
        {
            ws.send(JSON.stringify(["SearchDZ", false]));
            return;     
        }

        for (let i = 0; i < res.length; i++) 
        {
            if (date < res[i]["date"]) 
            {
                date = res[i]["date"];    
            }
            
        }

        ws.send(JSON.stringify(["SearchDZ", date]));
        
    });
 }







// Функции формы

function GetForm(ws, point, lpoint)
 {
    
    if (point == "Факультет") 
    {
        var FacArr = ["GetForm"];
        FacArr[1] = ["Факультет"];

        connected.query("select * from Facultet", 
        function(err, result)
        {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }

            for (let i = 0; i < result.length; i++) 
            {
                FacArr.push(result[i]["Fac"]);
                FacArr.push(result[i]["Fac_id"]);
            }

            ws.send(JSON.stringify(FacArr));
        });
    }

    if (point == "Специальность") 
    {
        var SpecArr = ["GetForm"];
        SpecArr[1] = ["Специальность"];

        connected.query("select * from Special NATURAL JOIN Facultet WHERE Fac='" + lpoint + "'", 
        function(err, result)
        {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }

            for (let i = 0; i < result.length; i++) 
            {
                SpecArr.push(result[i]["Spec"]);
                SpecArr.push(result[i]["Spec_id"]);
            }
            ws.send(JSON.stringify(SpecArr));
        });
    }

    if (point == "Группа") 
    {
        var GroupArr = ["GetForm"];
        GroupArr[1] = ["Группа"];

        connected.query("select * from GROOP NATURAL JOIN Special WHERE Spec='" + lpoint + "'", 
        function(err, result)
        {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }

            for (let i = 0; i < result.length; i++) 
            {
                GroupArr.push(result[i]["Groop"]);
                GroupArr.push(result[i]["Group_id"]);
            }
            ws.send(JSON.stringify(GroupArr));
        });
    }


    if (point == "Предмет") 
    {
        var ObjArr = ["GetForm"];
        ObjArr[1] = ["Предмет"];

        connected.query("select * from Object_study NATURAL JOIN Object WHERE Groop_id='" + lpoint + "'", 
        function(err, result)
        {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }

            for (let i = 0; i < result.length; i++) 
            {
                ObjArr.push(result[i]["obj"]);
                ObjArr.push(result[i]["Obj_id"]);
            }

            ws.send(JSON.stringify(ObjArr));
        });
    }
    

 }

function CheckForm(result, ws)
{
    delete result[0];
    var checkP = [];
    for (var i in result) 
    {
        checkP.push(result[i]);
    }


    connected.query("SELECT EXISTS(SELECT * FROM Students d WHERE d.Fac_id=? AND d.Spec_id=? AND d.Groop_id=? AND d.Fname=? AND d.Name=?);",checkP,
    function(err, check) 
    {
        if (err) 
        {
            return console.error("Ошибка: " + err.message);
        }

        var ch;
        for (i in check[0])
        {
            ch = check[0][i];
        }

        if (ch == true) 
        {
            ws.send("Acces");  
        }
    }
    );

}

function AddStudent(result, ws)
{
    delete result[0];
    var checkP = [];
    for (var i in result) 
    {
        checkP.push(result[i]);
    }

    connected.query("INSERT INTO Students VALUES(?, ?, ?, ?, ?, '')", checkP, 
    function(err, check)
    {
        if (err) 
        {
            return console.error("Ошибка: " + err.message);
        }

        

        ws.send("Acces");
    });
}


 
 function GetObj(ws) 
 {
    connected.query("select obj from Object_study NATURAL JOIN Object WHERE Groop_id=?", g_id, 
    function (err, res) 
    {
        if (err) {
            return console.error("Ошибка: " + err.message);
        }

        var arrObj = ["GetObj"];

        for (let i = 0; i < res.length; i++) 
        {
            arrObj.push(res[i]["obj"]);
        }

        ws.send(JSON.stringify(arrObj));
    });    
 }


