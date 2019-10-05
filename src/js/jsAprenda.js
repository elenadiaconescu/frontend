var pegar = true;

//Pegando informações do banco e mostrando-as
function PegarBanco() 
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/CriptoCategorias";

    xmlhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            //quando os dados retornarem da requisição serão enviados para a função ExibeDados()
            PegarCatego(this.responseText);
        }
    }
        xmlhttp.open("GET", url, true);

    xmlhttp.send();
}

function PegarCatego(response) 
{
    var arr = JSON.parse(response);
    var div = document.getElementById("tipos");

    for(i = 0; i < arr.length; i++)
    {
        var d = arr[i].id;

        div.innerHTML +=   "<li onclick='PegarCriptos1(" + d + ",\"" + arr[i].descricao + "\");'>" + 
                            "<div class='collapsible-header'>" + arr[i].nome + "</div>" + 
                            "<div class='collapsible-body' id='d" + d + "'></div>" +
                            "</li>";
    }
}

function PegarCriptos1(id, descri)
{
    if(pegar)
    {
        var xmlhttp2 = new XMLHttpRequest();

        xmlhttp2.onreadystatechange=function() {
            if (this.readyState == 4 && this.status == 200) {
                //quando os dados retornarem da requisição serão enviados para a função ExibeDados()
                PegarCriptos(this.responseText, id, descri);
            }
        }

        var ur = "http://localhost:3000/Criptografia/" + id;
        xmlhttp2.open("GET", ur , true);

        xmlhttp2.send();
    }
}

function PegarCriptos(response, id, descri) 
{
    if(pegar)
    {
        var arr2 = JSON.parse(response);
        var div2 = document.getElementById("d" + id);
        div2.innerHTML = descri + "<br><br>";

        for(i = 0; i < arr2.length; i++)
        {
            div2.innerHTML += "<a class='waves-effect waves-light btn-small' onclick='pegar = false; iniciar(" + arr2[i].id + ")'>"+arr2[i].nome+"</a> <br><br>"
        }
    }
}