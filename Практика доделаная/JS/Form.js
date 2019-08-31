
    var FacP = document.getElementById('Fac');
    var SpecP = document.getElementById("Spec");
    var GroupP = document.getElementById("Group");
    SpecP.options[0].selected = true;
    GroupP.options[0].selected = true;
    

    var Facs = [];
    var Specs = [];
    var Groups = [];
    

    var ws = new WebSocket("ws://localhost:1337");
    var result;
    var already = false;
    var Acces = false;
    var AnswCheck = false;
    var AccesCheck = false;

    var wsSend = function(data) {
        if(!ws.readyState){
            setTimeout(function (){
                wsSend(data);
            },100);
        }else{
            ws.send(data);
        }
    };

    wsSend(JSON.stringify(["GetForm", "Факультет", ""]));


    function IsJsonString(str) 
    {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    
    ws.onmessage = function (e) 
    {

        if (IsJsonString(e.data) == false) 
        {
            if (e.data == "Acces")
            {
                Acces = true;
                AccesCheck = true;
            }

        }else
        {
            result = JSON.parse(e.data);
            if (result[0] == "login") 
            {
                delete result[0];
                login(result);
                return;    
            }

            if (result[0] == "AStudent") 
            {
                delete result[0];
                AddStudent(result); 
                return;   
            }
            
            if (result[0] == "GetForm") 
            {
                delete result[0];
                GetForm(result[1], result); 
                return;   
            }
        }
    }

    function GetForm(point, result) 
    {   
        var NewFP;


        if (point == "Факультет") 
        {
            delete result[1];
            Facs = result;

            FacP.innerHTML = "";

            NewFP = document.createElement("option");
            FacP.appendChild(NewFP);

            NewFP.innerHTML = "Выберите факультет";
            

            for (let i = 2; i < Facs.length; i+= 2) 
            {
                NewFP = document.createElement("option");
                FacP.appendChild(NewFP);
                NewFP.setAttribute("value", Facs[i + 1]);

                NewFP.innerHTML = Facs[i]; 
                
            }
        }



        if (point == "Специальность" && result != "") 
        {
            delete result[1];
            Specs = result;

            SpecP.innerHTML = "";

            NewFP = document.createElement("option");
            SpecP.appendChild(NewFP);

            NewFP.innerHTML = "Выберите cпециальность";

            for (let i = 2; i < Specs.length; i+= 2)
            {
                NewFP = document.createElement("option");
                SpecP.appendChild(NewFP);
                NewFP.setAttribute("value", Specs[i + 1]);

                NewFP.innerHTML = Specs[i]; 
            }
        }else
        {
            if (point == "Специальность" && result == "") 
            {
                var ind = FacP.options.selectedIndex;

                if (ind != 0)
                {
                    ws.send(JSON.stringify(["GetForm", "Специальность", FacP.options[ind].text]));
                }
                
            } 
        }





        if (point == "Группа" && result != "") 
        {
            delete result[1];
            Groups = result;

            GroupP.innerHTML = "";

            NewFP = document.createElement("option");
            GroupP.appendChild(NewFP);

            NewFP.innerHTML = "Выберите группу";

            for (let i = 2; i < Groups.length; i+= 2)
            {
                NewFP = document.createElement("option");
                GroupP.appendChild(NewFP);
                NewFP.setAttribute("value", Groups[i + 1]);

                NewFP.innerHTML = Groups[i]; 
            }

        }else
        {
            if (point == "Группа" && result == "") 
            {
                var ind = SpecP.options.selectedIndex;

                if (ind != 0)
                {
                    ws.send(JSON.stringify(["GetForm", "Группа", SpecP.options[ind].text]));
                }
            }
        }


    }
    

    function GetDataForm() 
    {
        var UniValue = {};

        var ind = FacP.options.selectedIndex;
        UniValue["Fac"] = FacP.options[ind].value;

        ind = SpecP.options.selectedIndex;
        UniValue["Spec"] = SpecP.options[ind].value;

        ind = GroupP.options.selectedIndex;
        UniValue["Groop"] = GroupP.options[ind].value;

        UniValue["Fname"] = document.getElementById("fname").value;
        UniValue["Name"] = document.getElementById("name").value;

        return UniValue;
    }

    

    function CheckUser(UniValue) 
    {
        UniValue[0] = "CheckForm";

        ws.send(JSON.stringify(UniValue));

        return true;

    }

    function login(UniValue)
    {
        if (Acces == true) 
        {
            document.location.href = "result.html";
            UniValue[0] = "AccesForm";
            ws.send(JSON.stringify(UniValue));
            ws.onclose(1000);
            

        }else alert("Такого студента нет.");

    }

    function AddStudent(UniValue) 
    {

        if (Acces == true) 
        {
            alert("Такой студент уже есть.");
            Acces = false;
               
        }else{
            UniValue[0] = "AddStudent";

            ws.send(JSON.stringify(UniValue));

            alert("Студент успешно добавлен");
            
        }

    }


    function UniFunc(str)
    {
        var checkOn = false;
        var UniValue = GetDataForm();

        checkOn = CheckUser(UniValue);

        while (true)
        {
            if (checkOn == true) 
            {
                if (str == "login") 
                {
                    UniValue[0] = "login";
                    ws.send(JSON.stringify(UniValue));
                    return;       
                } 
                
                if (str == "AddStudent")
                {
                    UniValue[0] = "AStudent";
                    ws.send(JSON.stringify(UniValue));
                    return; 
                }
            }
        }



    }



