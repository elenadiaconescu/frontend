/* Alfabeto */
let alf = []
for (let i = 'A'.charCodeAt(0); i < 'z'.charCodeAt(0); i++) {
    alf.push(String.fromCharCode(i)
}


function criptografar(mensagem, idCripto, c)
{
    //Declarando o modal
    var modal = document.getElementById("mTxt");

    mensagem = mensagem;
    var nMensagem = "";
    var chave = parseInt(document.getElementById('txtChave').value);
    
    switch(idCripto)
    {
        case "1":
            nMensagem = cA1Z26(mensagem);
            break;

        case "2":
            if(chave + "" != "NaN")
                nMensagem = caesar(mensagem, chave);
            else
            {
                modal.innerHTML = "Por favor, insira uma chave válida!";
                $('.modal').modal('open');
            }
            break;

        case "3":
            nMensagem = cBinario(mensagem);
            break;
            
        default:
            nMensagem = mensagem;
            break;
    }
    
    return nMensagem;
}

function descriptografar(mensagem, idCripto, c)
{
    //Declarando o modal
    var modal = document.getElementById("mTxt");

    mensagem = mensagem.toUpperCase();
    var nMensagem = "";
    var chave = parseInt(document.getElementById('txtChave').value);
    
    switch(idCripto)
    {
        case "1":
            nMensagem = DEScA1Z26(mensagem);
            break;

        case "2":
            if(chave + "" != "NaN")
                nMensagem = DEScaesar(mensagem, chave);
            else
            {
                modal.innerHTML = "Por favor, insira uma chave válida!";
                $('.modal').modal('open');
            }
            break;

        case "3":
            nMensagem = DESbinario(mensagem);
            break;
            
        default:
            nMensagem = mensagem;
            break;
    }
    
    return nMensagem;
}

/*Criptografa*/
function caesar(mensagem, chave)
{
    //Declarando o modal
    var modal = document.getElementById("mTxt");

    var outText = "";
    var sinal = 1;

    var tamanho = mensagem.length;
    outText = "";
    var i = 0;
    
    //TURISTADAAAAAAAAAAAAAAA OUT
    chave = chave % 26
    while (i < tamanho) {
        let letra = mensagem.substring(i, i + 1)
        if (alf.includes(letra)) {
            if(letra === " ") {
                outText += letra;
                i++;
                continue;
            }

            outText += String.fromCharCode(letra.charCodeAt(0) - 65 + chave) % 26)
            i++;
        } else {
            modal.innerHTML = "Não inclua acentos/Caracteres especiais nas letras!"; //Se o caractere não estiver no vetor 'alfabeto' ele dispara um modal apontando o erro
            $('.modal').modal('open');
            outText = "";
            break;
        }
    }

    return outText;
}

function cA1Z26 (mensagem)
{
    //Declarando o modal
    let modal = document.getElementById("mTxt");

    let result = "";
    for(var i = 0; i < mensagem.length; i++) {
        var letra = mensagem.charAt(i);

        if (letra === ' ') {
            result = result.substring(0, result.length - 1);
            result += " ";
        } else if (alf.includes(letra)) {
            result += (letra.charCodeAt(0) - 64).toString()
            resul += "-";
        } else {
            modal.innerHTML = "Por favor, não insira caractares que não sejam letras ou espaços!";
            $('.modal').modal('open');
            return " ";
        }
    }

    return result.substring(0, result.length - 1);
}

function cBinario(mensagem)
{
    var resto = "";
    if(isNaN(parseInt(mensagem)) == false)
    {
        var numero = parseInt(mensagem);
        while(numero >= 1)
        {
            resto = "" + (numero % 2) + resto;
            numero = parseInt(numero / 2);
        }
    }
    else
    {
        var caracters = mensagem;
        var tam       = caracters.length;
        var numLetra  = 0; 
        var numAtual  = "";

        for(var i = 0; i < tam; i++)
        {
            numLetra = parseInt(caracters.charCodeAt(i));
            resto = "";
            do
            {
                resto = "" + (numLetra % 2) + resto;
                numLetra = parseInt(numLetra / 2);

                if(numLetra == 0)
                {
                    resto = "" + (numLetra % 2) + resto;
                    break;
                }
            }
            while(numLetra >= 0);

            numAtual = numAtual + " " + resto;
        }
        resto = numAtual;
    }

    return resto.trim();
}

/*Descriptografar*/
function DEScaesar(mensagem, chave)
{
    //Declarando o modal
    var modal = document.getElementById("mTxt");

    var input = mensagem;
    var outText = "";

    var tamanho = input.length;
    var indiceDaLetraAtual;
    var indiceAnterior;
    var i = 0;
    
    while(i < tamanho){ 
      if(alf.includes(input.substring(i,(i+1)))) //Verifica se o caractere esta dentro do vetor alfabeto
      {
          indiceDaLetraAtual = alf.indexOf(input.substring(i,(i+1)));
          if(indiceDaLetraAtual - chave > 0)
            outText += alf[(indiceDaLetraAtual - chave) % alf.length];
          else
          {
            indiceAnterior = indiceDaLetraAtual + alf.length;
            outText += alf[(indiceAnterior - chave) % alf.length];
          }
            
          i++;
      }
      else{
        if(input.substring(i,(i+1)) == " ")
        {
            outText += input.substring(i,(i+1));
            i++
        }
        else
        {
            modal.innerHTML = "Não inclua acentos/Caracteres especiais nas letras!"; //Se o caractere não estiver no vetor 'alfabeto' ele dispara um modal apontando o erro
            $('.modal').modal('open');
            outText = "";
            break;  
        }
      }
    }

    return outText;
}

function DEScA1Z26(mensagem)
{
    //Declarando o modal
    var modal = document.getElementById("mTxt");

    var result = "";

    while(mensagem != "")
    {
        var localIfem = mensagem.indexOf("-");
        var parteMensagem = "";
        if(localIfem < 0)
            parteMensagem = mensagem.substring(0);
        else
            parteMensagem = mensagem.substring(0, localIfem);

        if(parteMensagem.indexOf(" ") < 0)
        {
            var r = alf[parseInt(parteMensagem) - 1];

            if(r == undefined)
            {
                modal.innerHTML = "A entrada possue caractares invalidos para esse tipo de criptografia!";
                $('.modal').modal('open');
                return "";
            }

            result += r;

            if(localIfem < 0)
                mensagem = "";
            else
                mensagem = mensagem.substring(mensagem.indexOf("-") + 1);
        }
        else
        {
            parteMensagem = parteMensagem.substring(0, parteMensagem.indexOf(" "));

            var r = alf[parseInt(parteMensagem) - 1] + " ";

            if(r == undefined)
            {
                modal.innerHTML = "A entrada possue caractares invalidos para esse tipo de criptografia!";
                $('.modal').modal('open');
                return "";
            }

            result += r;

            mensagem = mensagem.substring(mensagem.indexOf(" ") + 1);
        }
    }

    return result;
}

function DESbinario(mensagem)
{
    var modal = document.getElementById("mTxt");
    var msgTrim = parseInt(mensagem.trim());
    if(!isNaN(msgTrim))
    {
        var palavraBinario  = "";
        var umNumero        = 0;
        var conv            = new Array();
        var caracterAtual   = "";
        var indPalavraAtual = 0;
        var mensagemDes     = "";
        var tamNum          = mensagem.trim().length;
        var i = 0;

        while(i < tamNum)
        {
            palavraBinario += mensagem.trim().substring(i,i+1);
            caracterAtual      = mensagem.trim().substring(i,i+1);
            if(caracterAtual != " ")
            {
                umNumero = parseInt(palavraBinario);
                conv[indPalavraAtual] = parseInt(umNumero, 2);
                i++;
            }
            else
            {
                indPalavraAtual++;
                palavraBinario = "";
                i++;
            }
        }
    
        for(var ind = 0; ind < conv.length; ind++)
            mensagemDes += String.fromCharCode(conv[ind]);

        return mensagemDes;
    }
    else
    {
        modal.innerHTML = "A entrada possue caractares invalidos para esse tipo de criptografia!";
        $('.modal').modal('open');
        return "";
    }
}

/*Funções da página*/
function TravarChave(verdade)
{
    var c = document.getElementById("txtChave");
    c.value = "";
    c.disabled = verdade;
}

function TestarChave(valor)
{
    ativarBotoes();
    switch(valor)
    {
        case "1":
            TravarChave(true);
            break;

        case "2":
            TravarChave(false);
            break;

        case "3":
            TravarChave(true);
            break;
    }
}

function ativarBotoes()
{
    document.getElementById("btnCri").disabled = false;
    document.getElementById("btnDes").disabled = false;
}