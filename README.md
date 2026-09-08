# Portfólio — Erick Teixeira

HTML estático, sem build. Portado nó a nó do Figma `Jb6w9GH2aN7mVVCQseu3n5`.

| Página | Arquivo | Origem no Figma | Tipografia |
|---|---|---|---|
| **Home** | `index.html` | página `PORTFOLIO - prototipo`, frame `277:6799` | Sora |
| **Case CT em Campo** | `ct-em-campo.html` | página `CT EM CAMPO`, frame `1:36` | Inter |

Abra `index.html` no navegador. Não há dependência de build — só as fontes do
Google Fonts.

## ⚠️ As duas páginas vêm de versões diferentes do arquivo

O Figma tem **quatro páginas** que são versões do mesmo portfólio: `PORTFOLIO`,
`PORTFOLIO - COLORS`, `PORTFOLIO - COLORS 2` e `PORTFOLIO - prototipo`. Cada uma
tem Home + três cases.

A **Home** foi portada da `PORTFOLIO - prototipo` (a mais recente). O **case CT em
Campo** foi portado antes, da página solta `CT EM CAMPO`. São desenhos diferentes:

| | Home | Case CT em Campo |
|---|---|---|
| Tipografia | Sora | Inter |
| Fundo | `#f1f1f1` | `#ffffff` |
| Texto | `#21262a` | `#1a1a1a` |
| Fios | `#d5dadf` / `#778898` | `#e2e2e2` / `#c6c6c6` |
| Altura do frame | 7740 | 18027 |

A `PORTFOLIO - prototipo` tem a sua própria versão do case (`277:6139`, 17411px),
na mesma linguagem da Home. **Enquanto o case não for reportado a partir dela, as
duas páginas não combinam visualmente.**

## Faltam as imagens

O ambiente onde as páginas foram geradas tem os hosts de asset do Figma
bloqueados por política de rede, então nenhuma imagem pôde ser exportada. **As
páginas não quebram sem elas**: cada moldura mostra o nome exato do arquivo que
falta. Assim que os arquivos entrarem em `assets/`, as imagens aparecem sozinhas.

Lista completa com nome ↔ nó de origem: [`assets/README.md`](assets/README.md).
São **18 arquivos para a home** e **13 para o case**.

## Fidelidade ao Figma

Conferido automaticamente, não a olho:

| | Home | Case |
|---|---|---|
| Blocos de texto conferidos | **90**, sem divergência | **222**, sem divergência |
| Componentes com cor/raio idênticos | **26** | **23** |
| Asserções de layout | **42** em 8 larguras | **41** em 9 larguras |

Container 1160px em ambas, como nos frames de origem. Escalas tipográficas lidas
dos nós, não estimadas: Home em Sora 88/64/40/20/18/16/14/12; case em Inter
48/40/21/17/15.5/14.5/13 mais JetBrains Mono 11.5 nos valores tabulares.

## Responsivo

O Figma só tem o desktop 1400. Abaixo disso é adaptação:

| Largura | Home | Case |
|---|---|---|
| < 1400 | margem cede antes do container | idem |
| < 1280 | hero e projetos viram proporção | hero vira proporção 592:520 |
| < 1024 | hero em coluna; disciplinas 5→3; provas 3→1; grade 2→1 | 4 e 5 colunas viram 2 e 3 |
| < 940 | — | menu vira faixa rolável |
| < 768 | tudo em coluna; marcas com scroll horizontal; botões em largura cheia | tudo em coluna; rampas de cor com scroll horizontal |
| < 400 | números em coluna | ficha técnica e nbox em coluna |

Verificado sem erro de JS, sem overflow horizontal e sem elemento estourando o
container em 360 · 390 · 600 · 768 · 900 · 940 · 1024 · 1280 · 1400.
