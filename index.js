const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://www.uol.com.br";

async function fetchData(url) {
  console.log("Buscando as Últimas Notícias...");
  try {
    const res = await axios.get(url);
    if (res.status !== 200) {
      console.log("Erro ao baixar os arquivos");
      return;
    }
    return res.data;
  } catch (err) {
    console.error("Erro ao fazer a requisição:", err.message);
  }
}

fetchData(url).then((html) => {
  if (!html) {
    console.log("Nenhum dado retornado");
    return;
  }

  const $ = cheerio.load(html);
  const ultimas_noticias = $(
    ".topo-hibrido-hardnews-col1 .chamada-hardnews"
  );

  ultimas_noticias.each(function (i, element) {
    let title = $(this).find(".chamada-hardnews-title").text().trim();
    let imagem = $(this).find("img").attr("data-src") || "Não contém imagem";
    let link = $(this).find("a").attr("href") || "Não contém link";

    console.log("======================");
    console.log(`Título: ${title}\n`);
    console.log(`Imagem: ${imagem}\n`);
    console.log(`Link: ${link}\n`);
  });
});
