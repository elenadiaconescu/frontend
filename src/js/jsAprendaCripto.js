const df = ["★ ● ●", "★ ★ ●", "★ ★ ★"]

function iniciar(id)
{
	var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/QCriptografia/" + id;

    xmlhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            //quando os dados retornarem da requisição serão enviados para a função ExibeDados()
            novoConteudo(this.responseText);
        }
    }
        xmlhttp.open("GET", url, true);

    xmlhttp.send();
}

function novoConteudo(response)
{
	var arr = JSON.parse(response);
	var tela = document.getElementById("cont");

	//Limpando
	tela.innerHTML = "";

	tela.innerHTML += "<h2>" + arr[0].nome + "</h2> <br>";
	tela.innerHTML += "<h5>" + arr[0].descricao + "</h5> <br>";
    tela.innerHTML += "<h5> Dificuldade: " + df[arr[0].dificuldade - 1] + "</h5> <br>";
    tela.innerHTML += "<h5>" + arr[0].explicacao + "</h5> <br>";

    tela.innerHTML += "<a class='waves-effect waves-light btn' onclick='location.reload();'> Voltar </a>";
}