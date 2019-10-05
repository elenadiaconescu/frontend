var carregar = 0;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mouseOverMenu(ele, txt)
{
	for(i = 0; i < txt.length; i++)
	{
		var comecoPalavra = "";

		try
		{
			comecoPalavra = txt.substring(0, i - 1);
		}
		catch{}

		var nPalavra = "";

		for(cha = 0; cha <= txt.length - i; cha++)
		{
			var carac = Math.floor(Math.random() * 6);

			switch(carac)
			{
				case 0:
					nPalavra += "c"
					break;

				case 1:
					nPalavra += "r"
					break;

				case 2:
					nPalavra += "y"
					break;

				case 3:
					nPalavra += "p"
					break;

				case 4:
					nPalavra += "t"
					break;

				case 5:
					nPalavra += "o"
					break;
			}
		}

		ele.innerHTML = comecoPalavra + nPalavra;
		await sleep(100);
	}

	ele.innerHTML = txt;
	carregar = 1;
}