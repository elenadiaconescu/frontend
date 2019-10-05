const efiDif = ["-","","+"];
const df = ["★  ●  ●", "★  ★  ●", "★  ★  ★"];
var categorias = new Array();
var cripto = new Array();

//Separando os conteúdos do banco
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

function PegarBanco2()
{
    var xmlhttp2 = new XMLHttpRequest();
    var url2 = "http://localhost:3000/Criptografia";

    xmlhttp2.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            //quando os dados retornarem da requisição serão enviados para a função ExibeDados()
            PegarCripto(this.responseText);
        }
    }
    xmlhttp2.open("GET", url2, true);

    xmlhttp2.send();
}

function PegarCatego(response) 
{
    categorias = JSON.parse(response);
}

function PegarCripto(response)
{
    cripto = JSON.parse(response);
}

//Mostrando tabelas
function relacao1()
{
    var espaco = document.getElementById("cont");
    espaco.innerHTML =  "<h4>Criptografias e suas Categorias</h4>";
    espaco.innerHTML += "<h5><table id='tabl'> <tr> <th>Criptografia</th> <th>Categoria</th> </tr>";
    espaco.innerHTML += "</h5></table>";
    espaco.innerHTML += "<br><a class='waves-effect waves-light btn' onclick='location.reload();'> Voltar </a>";

    var tabela = document.getElementById("tabl");

    for(i = 0; i < cripto.length; i++)
    {
        tabela.innerHTML += "<tr> <td>"+ cripto[i].nome +"</td> <td>"+ categorias[cripto[i].idCategoria - 1].nome; +"</td> </tr>";
    }
}

function relacao2()
{
    var espaco = document.getElementById("cont");
    espaco.innerHTML =  "<h4>Eficácia das Criptografias</h4>";
    espaco.innerHTML += "<h5><table id='tabl'> <tr> <th>Criptografia</th> <th>Nível de Eficácia</th> </tr>";
    espaco.innerHTML += "</h5></table>";
    espaco.innerHTML += "<br><a class='waves-effect waves-light btn' onclick='location.reload();'> Voltar </a>";

    var tabela = document.getElementById("tabl");

    for(i = 0; i < cripto.length; i++)
    {
        tabela.innerHTML += "<tr> <td>"+ cripto[i].nome +"</td> <td>"+ (categorias[cripto[i].idCategoria - 1].eficacia + efiDif[cripto[i].dificuldade - 1]) +"</td> </tr>";
    }
}

function relacao3()
{
    var espaco = document.getElementById("cont");
    espaco.innerHTML =  "<h4>Dificuldade das Criptografias</h4>";
    espaco.innerHTML += "<h5><table id='tabl'> <tr> <th>Criptografia</th> <th>Dificuldade dentro de sua categoria</th> </tr>";
    espaco.innerHTML += "</h5></table>";
    espaco.innerHTML += "<br><a class='waves-effect waves-light btn' onclick='location.reload();'> Voltar </a>";

    var tabela = document.getElementById("tabl");

    for(i = 0; i < cripto.length; i++)
    {
        tabela.innerHTML += "<tr> <td>"+ cripto[i].nome +"</td> <td>"+ df[cripto[i].dificuldade - 1]; +"</td> </tr>";
    }
}