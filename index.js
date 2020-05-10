const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://www.uol.com.br";

async function fetchData(url) {
  console.log("Buscando as Últimas Notícias...");
  let res = await axios(url).catch((err) => console.log(err));
  if (res.status !== 200) {
    console.log("Erro ao baixar os arquivos");
    return;
  }
  return res;
}

fetchData(url).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  const ultimas_noticias = $(
    "#corpo > div:nth-child(1) > div > div.topo-hibrido-central.centraliza.clearfix.bloco-editorial-topo-1 > div.topo-hibrido-hardnews > div.topo-hibrido-hardnews-col1 > div"
  );

  ultimas_noticias.each(function (i) {
    let title = $(this).text().trim();
    let imagem = $(this).find("img").attr("data-src");
    console.log(`======================`);
    console.log(title + `\n`);
    console.log(imagem ? imagem : "Não contém imagem" + `\n`);
  });
});
