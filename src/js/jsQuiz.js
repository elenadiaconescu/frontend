var todasQuestoes = new Array();
var questoes = new Array();
const tamanho = 7;
var acertos = 0;

//Pegando informações do banco e mostrando-as
function PegarBanco() 
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/Quiz";

    xmlhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            //quando os dados retornarem da requisição serão enviados para a função ExibeDados()
            PegarQuestoes(this.responseText);
        }
    }
    	xmlhttp.open("GET", url, true);

    xmlhttp.send();
}


function PegarQuestoes(response) 
{
    var arr = JSON.parse(response);
    
    for(i = 0; i < arr.length; i++)
    {
    	todasQuestoes[i] = arr[i];
    }

    SelecionarQuestoes();

}

function SelecionarQuestoes()
{
	for(i = 0; i < tamanho; i++)
	{
		var indice = -1;
		do
		{
			indice = Math.floor(Math.random() * todasQuestoes.length);

			for(a = 0; a < questoes.length; a++)
				if(indice + 1 == questoes[a].id)
				{
					indice = -1;
				}
		}
		while(indice < 0)

		questoes[i] = todasQuestoes[indice];
	}

	MostrarQuestoes();
}

function MostrarQuestoes()
{
	for(i = 0; i < tamanho; i++)
	{
		var oId = "l" + (i + 1);
		document.getElementById(oId).innerHTML = questoes[i].questao;
	}
}

//Verificando se as respostas estão corretas
function VerificarQuestoes()
{
	for(i = 0; i < tamanho; i++)
	{
		var inputField = document.getElementById("inp"+ (i+1));
		var txt = document.getElementById("t" + (i + 1));

		if(document.getElementById("t" + (i + 1)).value.toUpperCase() != questoes[i].resposta)
		{
			inputField.style.color = "red";
		}
		else
		{
			inputField.style.color = "green";
			acertos++;
		}

		txt.disabled = true;

		var acer = document.getElementById("acer");

		acer.innerHTML = "Acertos: " + acertos + "/7";

		if(acertos > 3)
			acer.style.color = "green";
		else
			acer.style.color = "red";
	}
}