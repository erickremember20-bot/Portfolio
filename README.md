# Portfólio — Erick Teixeira

HTML estático, sem build. Portado nó a nó do Figma `Jb6w9GH2aN7mVVCQseu3n5`.

| Página | Arquivo | Origem no Figma |
|---|---|---|
| **Home** | `index.html` | `PORTFOLIO - prototipo` · `277:6799` |
| **Nega Nagô** | `nega-nago.html` | `PORTFOLIO - prototipo` · `277:5578` |
| **CT em Campo** | `ct-em-campo.html` | `PORTFOLIO - prototipo` · `277:6139` |
| **Canaltech · Hub de links** | `canaltech-hub.html` | `PORTFOLIO - prototipo` · `277:4889` |

As quatro páginas usam a mesma linguagem: **Sora** sobre `#f1f1f1`, com o
azul-acinzentado `#778898` / `#d5dadf`. O CT em Campo, que antes vinha da página
solta `CT EM CAMPO` em Inter sobre branco, foi reportado para a versão que está
na `PORTFOLIO - prototipo`, mantendo o verde `#009721` da campanha como acento.

## O que publicar

```
docs/                              ← é isto que sobe para a hospedagem
  index.html  nega-nago.html  ct-em-campo.html  canaltech-hub.html
  assets/     imagens em .webp, CSS, JS e as fontes .woff2
  .htaccess   cache longo dos assets e compressão do HTML

portfolio-erick-teixeira.html      ← as quatro páginas em um arquivo só
```

**Hostinger:** hPanel → Gerenciador de Arquivos → entre em `public_html` →
envie o `.zip` da pasta `docs/` → botão direito → **Extrair**. O `index.html`
precisa ficar direto em `public_html`, não dentro de uma subpasta.

**GitHub Pages:** Settings → Pages → Branch `main`, pasta `/docs`.

O arquivo único não precisa de servidor: dá para abrir com dois cliques ou
mandar por e-mail. Ele carrega mais devagar (19 MB de uma vez) do que a pasta
`docs/`, onde cada imagem só baixa quando entra na tela.

## Estrutura da fonte

```
index.html            home
nega-nago.html        case 01
ct-em-campo.html      case 02
canaltech-hub.html    case 03
assets/               imagens originais (PNG/JPG/GIF) + case.css + case.js
ferramentas/          scripts que geram docs/ e o arquivo único
docs/                 saída pronta para publicar
```

`index.html` e `ct-em-campo.html` carregam o CSS embutido no próprio arquivo;
`nega-nago.html` e `canaltech-hub.html` compartilham `assets/case.css`.

Os arquivos da raiz apontam para `assets/` e para o Google Fonts — são a fonte
de edição. Os de `docs/` apontam para `.webp` e para as fontes locais.
Depois de mexer na raiz, regenere: veja [`ferramentas/LEIAME.md`](ferramentas/LEIAME.md).

## Peso

| | Antes | Depois |
|---|---|---|
| `assets/` (PNG/JPG/GIF) | 100 MB | — |
| `docs/assets/` (WebP) | — | **14 MB** |
| Arquivo único | — | 19 MB |
| Dicionário PT/EN (`assets/i18n.js`) | — | 131 KB |

Os nove GIFs viraram WebP animado; as imagens paradas viraram WebP a 2× do
tamanho de exibição. Tudo abaixo da primeira dobra usa `loading="lazy"`, então
a primeira tela baixa poucas centenas de KB.

As fontes (Sora e JetBrains Mono, subconjuntos latin e latin-ext, 167 KB no
total) são servidas do próprio domínio: a página publicada **não faz nenhuma
requisição para terceiros**.

## Português e inglês

A página abre em **inglês** e tem um botão PT/EN sempre visível — na barra do topo
no desktop, como pastilha flutuante no canto inferior direito no celular. A escolha
fica guardada no navegador.

O português é o que está escrito no HTML: se o JavaScript não carregar, a página
continua em português e legível. A tradução (859 blocos, incluindo título da aba,
textos alternativos das imagens e os cartões de compartilhamento) vive em
[`ferramentas/i18n-pt-en.json`](ferramentas/i18n-pt-en.json) — para corrigir uma
frase, edite lá e rode `python3 ferramentas/i18n.py`.

## Fidelidade ao Figma

Conferido banda a banda contra os PDFs exportados do arquivo, não a olho nu:
cor medida em pixel, largura de coluna, raio, preenchimento e quebra de linha.

Container 1160px em todas as páginas, como nos frames de origem. Cabeçalho de
seção com título em 900px e texto de apoio em 820px (`277:5023`). Escala Sora
lida dos nós: 88 / 64 / 48 / 40 / 32 / 20 / 18 / 16 / 14 / 12.

Toda imagem no Figma é `scaleMode: FILL` cobrindo o frame inteiro — as molduras
aqui usam `object-fit: cover` com o `aspect-ratio` exato de cada frame.

O navegador recua `<figure>` e `<dd>` em 40px por padrão; o reset zera os dois,
que é o que deixava a ficha técnica e as imagens fora do alinhamento do Figma.

## Responsivo

O Figma só tem o desktop 1400. Abaixo disso é adaptação, verificada sem erro de
JS, sem overflow horizontal e sem imagem quebrada em
360 · 414 · 768 · 1024 · 1280 · 1440.

| Largura | O que muda |
|---|---|
| < 1400 | a margem de 120px cede primeiro, para o container segurar 1160 |
| < 1280 | blocos de duas colunas viram proporção em vez de pixel fixo |
| < 1024 | 3, 4, 5 e 6 colunas quebram; tabelas viram lista empilhada |
| < 940 | o menu do topo vira faixa rolável na horizontal |
| < 768 | tudo em coluna única; escala tipográfica reduzida; botões em largura cheia |
| < 400 | números e ficha técnica em coluna única |

## Links

- Currículo — https://drive.google.com/file/d/1fOA2GRwlvkM8g6n0hKdpMAUngW7WzRoP/view?usp=sharing
- LinkedIn — https://www.linkedin.com/in/erick-teixeira-031b3a213/
- Nega Nagô — [protótipo](https://www.figma.com/design/DPnAXlPAlYzHfeA6hp1j0i/Nega_Nago_Portfolio?node-id=0-1) · [HTML](https://drive.google.com/drive/folders/1_pO37J2lMBUw9Kema0x5AYgqKkW54W4L?usp=sharing)
- CT em Campo — [protótipo](https://www.figma.com/design/aUh8z5QbGFmJ4k48denDDk/CT_em_Campo_Portfolio?node-id=0-1) · [HTML](https://drive.google.com/drive/folders/1pyaQZb6Cmb2Ra1Qt6ZT43MQc41mXQ5do?usp=sharing)
- CT Links — [protótipo](https://www.figma.com/design/Kvw7C8zKm7ppLMmgFErrf2/CT_Links_Portfolio?node-id=0-1) · [HTML](https://drive.google.com/drive/folders/1X7_uG_CaMZfWMl8K55ng5t3JL-Ukh39u?usp=sharing)
