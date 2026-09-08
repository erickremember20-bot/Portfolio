# Portfólio — Erick Teixeira

HTML estático, sem build. Portado nó a nó do Figma `Jb6w9GH2aN7mVVCQseu3n5`.

| Página | Arquivo | Origem no Figma |
|---|---|---|
| **Home** | `index.html` | `PORTFOLIO - prototipo` · `277:6799` |
| **Nega Nagô** | `nega-nago.html` | `PORTFOLIO - prototipo` · `277:5578` |
| **Canaltech · Hub de links** | `canaltech-hub.html` | `PORTFOLIO - prototipo` · `277:4889` |
| **CT em Campo** | `ct-em-campo.html` | `CT EM CAMPO` · `1:36` ⚠️ |

Abra `index.html` no navegador. Não há dependência de build — só as fontes do
Google Fonts.

## ⚠️ O CT em Campo vem de outra versão do arquivo

Três das quatro páginas saem da mesma página do Figma (`PORTFOLIO - prototipo`) e
compartilham a mesma linguagem: **Sora** sobre `#f1f1f1`, com o azul-acinzentado
`#778898` / `#d5dadf`. O CT em Campo foi portado antes, da página solta
`CT EM CAMPO`, e usa **Inter** sobre branco.

A `PORTFOLIO - prototipo` tem a sua própria versão desse case (`277:6139`, 17411px)
na linguagem das outras. **Enquanto ela não for portada, sair da home para o CT em
Campo troca de tipografia e de paleta no meio da navegação.** Os outros dois cases
já estão consistentes entre si e com a home.

## Estrutura

```
index.html            home
nega-nago.html        case 01
ct-em-campo.html      case 02   (versão antiga — ver acima)
canaltech-hub.html    case 03
assets/
  case.css            sistema compartilhado pelos cases novos
  case.js             placeholders, copiar e-mail, menu ativo
  …                   imagens
```

`index.html` e `ct-em-campo.html` carregam o CSS embutido no próprio arquivo;
`nega-nago.html` e `canaltech-hub.html` compartilham `assets/case.css`.

## Assets

**41 das 50 imagens estão na pasta.** Faltam as 9 do Nega Nagô e o PDF do
currículo — lista com nome ↔ nó de origem em [`assets/README.md`](assets/README.md).
Enquanto um arquivo não chega, a moldura mostra o nome que falta em vez de
quebrar o layout.

## Fidelidade ao Figma

Conferido automaticamente, não a olho:

| | Home | Nega Nagô | Canaltech Hub | CT em Campo |
|---|---|---|---|---|
| Blocos de texto conferidos | 90 | — | — | 222 |
| Componentes com cor/raio idênticos | 26 | — | — | 23 |
| Asserções de layout | 44 | 22 | 22 | 41 |

Container 1160px em todas, como nos frames de origem. Escala Sora lida dos nós:
88 / 64 / 48 / 40 / 32 / 20 / 18 / 16 / 14 / 12.

## Responsivo

O Figma só tem o desktop 1400. Abaixo disso é adaptação, verificada sem erro de
JS, sem overflow horizontal e sem elemento estourando o container em
360 · 390 · 600 · 768 · 900 · 940 · 1024 · 1280 · 1400.

| Largura | O que muda |
|---|---|
| < 1400 | a margem de 120px cede primeiro, para o container segurar 1160 |
| < 1280 | blocos de duas colunas viram proporção em vez de pixel fixo |
| < 1024 | 3, 4, 5 e 6 colunas quebram; tabelas viram lista empilhada |
| < 940 | o menu do topo vira faixa rolável na horizontal |
| < 768 | tudo em coluna única; escala tipográfica reduzida; botões em largura cheia |
| < 400 | números e ficha técnica em coluna única |

## ⚠️ Peso

`assets/` tem ~102 MB, quase tudo em GIF (os seis do Playground somam ~60 MB e
`motion_ct_em_campo.gif` tem 12 MB). Todas as imagens abaixo da primeira dobra
usam `loading="lazy"`, então nada disso baixa antes de entrar na tela — mas
converter os sete GIFs para MP4/WebM derrubaria o peso para 5–10% disso.
