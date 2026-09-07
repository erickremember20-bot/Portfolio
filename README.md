# Portfólio — Erick Teixeira

Case **CT em Campo · Canaltech × Netshoes**, em HTML estático.
Portado nó a nó do Figma `Jb6w9GH2aN7mVVCQseu3n5`, página **CT EM CAMPO**.

| | |
|---|---|
| **Entregável** | `index.html` (arquivo único, sem build) |
| **Fontes** | Inter e JetBrains Mono via Google Fonts |
| **Responsivo** | 360 → 1400+ |
| **Assets** | 13 imagens em `assets/` — ver [`assets/README.md`](assets/README.md) |

Abra `index.html` no navegador. Não há dependência de build.

## Faltam as imagens

O ambiente onde a página foi gerada tem os hosts de asset do Figma bloqueados
por política de rede, então as 13 imagens do case não puderam ser exportadas.
**A página não quebra sem elas**: cada moldura mostra o nome exato do arquivo que
falta. Assim que os arquivos entrarem em `assets/` com os nomes da tabela, as
imagens aparecem sozinhas, sem mexer no código.

## Fidelidade ao Figma

Conferido automaticamente, não a olho:

- **222 blocos de texto** do Figma — todos presentes, sem divergência
- **23 componentes** com `fill`, `stroke` e `border-radius` idênticos aos nós de origem
- Container 1160px, padding de seção 80px, gap de bloco 40px — como no frame `1:36`
- Escala tipográfica lida dos nós: h1 48/106%/-3.2%, h2 40/110%/-2.8%,
  nbox 40/100%/-3.5%, corpo 15.5/155%, mono JetBrains 11.5/150%
- 4 rampas × 10 amostras com os hexadecimais reais da campanha

## Responsivo

O Figma tem só o desktop 1400 — abaixo disso é adaptação, com estas decisões:

| Largura | O que muda |
|---|---|
| < 1400 | a margem de 120px cede primeiro, para o container segurar 1160 |
| < 1280 | hero em proporção (592:520) em vez de pixel fixo |
| < 1024 | 4 e 5 colunas quebram em 2 e 3; hero em coluna única |
| < 940 | nome e menu empilham; menu vira faixa rolável na horizontal |
| < 768 | tudo em coluna única; escala tipográfica reduzida; rampas de cor com scroll horizontal para o hexadecimal continuar legível |
| < 400 | ficha técnica e nbox em coluna única |

Verificado em 360 · 390 · 600 · 768 · 900 · 940 · 1024 · 1280 · 1400:
sem erro de JS, sem overflow horizontal, nenhum elemento estourando o container.
