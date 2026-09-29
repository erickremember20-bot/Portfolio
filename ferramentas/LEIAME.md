# ferramentas

Scripts que geram a versão publicável do portfólio a partir dos arquivos da raiz.
Precisam de Python 3 com Pillow (`pip install pillow`).

Rode nesta ordem, de dentro desta pasta:

```bash
python3 i18n.py      # monta assets/i18n.js (dicionário PT→EN + botão de idioma)
python3 build.py     # converte assets/ para WebP em docs/assets (100 MB -> 14 MB)
python3 paginas.py   # copia as 4 páginas para docs/ apontando para os .webp
python3 unico.py     # gera portfolio-erick-teixeira.html (arquivo único) na raiz
```

`i18n.py` só precisa rodar quando o texto mudar; os outros três, sempre.

## Arquivos

| | |
|---|---|
| `i18n-pt-en.json` | dicionário português → inglês. A chave é exatamente o texto que está no HTML. Para corrigir uma tradução, edite aqui e rode `i18n.py`. |
| `i18n-runtime.js` | a lógica que troca o idioma e desenha o botão PT/EN |
| `fontes-web/` | os `.woff2` da Sora e da JetBrains Mono, servidos do próprio domínio |
| `mapa.json` | gerado pelo `build.py`: diz qual arquivo original virou qual `.webp` |

## Como o idioma funciona

O português é o que está escrito no HTML — se o JavaScript não carregar, a página
continua em português e legível. O `i18n.js` traduz na hora que a página abre,
começando em **inglês**, e guarda a escolha da pessoa no navegador.

Para trocar o idioma padrão, mude esta linha do `i18n-runtime.js`:

```js
if (atual !== 'pt' && atual !== 'en') atual = 'en';   // 'pt' para começar em português
```

## O PDF do portfólio

`ferramentas/pdf/` gera `portfolio-erick-teixeira.pdf` a partir de `docs/`,
depois que o `paginas.py` rodou. Precisa de:

```bash
npm i playwright && npx playwright install chromium
pip install pymupdf pillow
```

Depois:

```bash
cd ferramentas/pdf
node imprime.js     # uma página do site = um PDF em paginas/
python3 junta.py    # junta os cinco, faz o sumário e recomprime as imagens
```

O `junta.py` recomprime as imagens a 150 dpi: sem isso o Chromium embute
tudo sem perda e o arquivo sai com 35 MB em vez de 6.

Duas coisas que o script faz e valem saber:

- **Os links internos viram absolutos com UTM.** No PDF, `thumbdrop.html`
  não existe — vira `erickteixeira.art/thumbdrop.html?utm_source=pdf&…`.
  Assim quem abre o site pelo anexo aparece no GA separado do resto, em
  Aquisição › Aquisição de tráfego, com origem `pdf`.
- **Figura mais alta que a página é limitada a 880px.** Sem isso o
  `break-inside:avoid` empurra a imagem inteira e deixa a página anterior
  em branco.

O CSS de impressão fica em `assets/case.css` (e repetido em `index.html` e
`ct-em-campo.html`, que não usam o case.css). É ele que tira o menu, a
pastilha de idioma e a barra de consentimento, e segura os cartões inteiros.
