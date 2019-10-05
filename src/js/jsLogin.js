var users = new Array();
var redirect = 0; //Indica se é necessário redirecionar a página

function pegarUsers()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/QUsuario";

    xmlhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            //quando os dados retornarem da requisição serão enviados para a função ExibeDados()
            guardarUsers(this.responseText);
        }
    }
        xmlhttp.open("GET", url, true);

    xmlhttp.send();
}

function guardarUsers(response)
{
    var arr = JSON.parse(response);

    for(i = 0; i < arr.length; i++)
        users[i] = arr[i];
}

//Criando uma conta
function VerficarCampos()
{
    //Declarando o modal
    var modal = document.getElementById("mTxt");
    var mHeader = document.getElementById("mHeader");

    //Verificar senha
	var s1 = document.getElementById("passwordR");
	var s2 = document.getElementById("passwordRR");

    if(s1.value == "" || s2.value == "" || document.getElementById("usernameR").value == "" || document.getElementById("email").value == "")
    {
        modal.innerHTML = "Por favor, preencha os campos!";
        $('.modal').modal('open');
        return false;
    }

	if(s1.value != s2.value)
    {
		modal.innerHTML = "Senhas não são iguais!";
        $('.modal').modal('open');
        return false;
    }

    for(i = 0; i < users.length; i++)
        if(document.getElementById("email").value == users[i].email)
        {
            modal.innerHTML = "Email já usado!";
            $('.modal').modal('open');
            return false;
        }

    pegarUsers();
    
    redirect = 1;

    mHeader.innerHTML = "Parabéns!";
    modal.innerHTML = "Conta criada com sucesso!";
    $('.modal').modal('open');
}

//Fazendo login
function verificarConta()
{
    //Declarando o modal
    var modal = document.getElementById("mTxt");
    var mHeader = document.getElementById("mHeader");

    //Verificando o login
    var c1 = document.getElementById("emailS");
    var c2 = document.getElementById("password");
    var s;
    var use;
    var idd;

    if(c1.value == "" || c2.value == "")
    {
        modal.innerHTML = "Por favor, preencha os campos!";
        $('.modal').modal('open');
        return false;
    }

    var achou = false;
    for(i = 0; i < users.length; i++)
    {
        if(c1.value == users[i].email)
        {
            achou = true;
            s = users[i].senha;
            use = users[i].username;
            idd = users[i].id;
            break;
        }
    }

    if(!achou)
    {
        modal.innerHTML = "Email não registrado!";
        $('.modal').modal('open');
        return false;
    }

    if(s + "" != c2.value + "")
    {
        modal.innerHTML = "Senha inválida!";
        $('.modal').modal('open');
        return false;
    }

    document.getElementById("id").value = idd + "";

    redirect = 1;

    mHeader.innerHTML = "Nos encontramos de novo";
    modal.innerHTML = "Bem-vindo(a) " + use + "!";
    $('.modal').modal('open');
}

function mudarPagina()
{
    if(redirect == 1)
    {
        red1($('#f1'));
        window.location.href = "./principal.html";
    }
    else if(redirect == 2)
    {
        window.location.href = "./principalDeslogado.html";
    }
}

function fazerLogoff()
{
    //Declarando o modal
    var modal = document.getElementById("mTxt");
    var mHeader = document.getElementById("mHeader");

    redirect = 2;

    mHeader.innerHTML = "Adeus";
    modal.innerHTML = "Nos veremos em breve";
    $('.modal').modal('open');
}

//Redirecionando
function red1(form){
    $.post( "http://localhost:3000/Acesso", form.serialize() ).done(function(data){
        if (!data.erro) {
            form.each(function(data){
            });
        }
    });
};

function red2(form){
    $.post( "http://localhost:3000/Usuario", form.serialize() ).done(function(data){
        if (!data.erro) {
            form.each(function(data){
            });
        }
    });
};