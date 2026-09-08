# Assets

Coloque os arquivos **nesta pasta**, com **exatamente** estes nomes. As páginas já
apontam para eles; enquanto um arquivo não existir, a moldura mostra o nome que
falta em vez de quebrar.

Origem: Figma `Jb6w9GH2aN7mVVCQseu3n5`. Exporte cada frame `[imagem]` em **PNG/JPG 2x**.

---

## Home — `index.html`

Página **PORTFOLIO - prototipo**, frame `Home · desktop 1400` (`277:6799`).
**18 arquivos.**

### Retrato e capas dos cases

| Arquivo | Nó | Camada | Proporção |
|---|---|---|---|
| `home-retrato.jpg` | `277:6810` | `Rectangle 1` | 480 × 360 |
| `home-capa-nega-nago.jpg` | `277:6852` | `capa_nega_nago 1` + `2` | 1160 × 520 |
| `home-capa-ct-em-campo.jpg` | `277:6878` | `capa_bh 1` | 1160 × 520 |
| `home-capa-canaltech-hub.jpg` | `277:6903` | `laptop_iphone 1` | 1160 × 520 |

> A capa da Nega Nagô tem **duas imagens empilhadas** no mesmo frame. Exporte o
> **frame** (`277:6852`), não as camadas soltas — sai um arquivo só.

### Logos das marcas — SVG, fundo transparente

| Arquivo | Nó | Proporção |
|---|---|---|
| `home-logo-kabum.svg` | `277:6828` | 162 × 43 |
| `home-logo-netshoes.svg` | `277:6829` | 162 × 25 |
| `home-logo-canaltech.svg` | `277:6830` | 162 × 34 |
| `home-logo-motorola.svg` | `277:6831` | 162 × 37 |
| `home-logo-magalu.svg` | `277:6832` | 162 × 36 |

> A página aplica `grayscale` e 72% de opacidade nos logos, como no Figma.

### Playground — 6 capas, 570 × 400

| Arquivo | Nó | Camada |
|---|---|---|
| `home-play-ilustracao.jpg` | `277:6953` | `ilustração 1` |
| `home-play-short-film.jpg` | `277:6959` | `AVDC 1` |
| `home-play-3d-tyler.jpg` | `277:6967` | `3d_animation_tyler 1` |
| `home-play-3d-gold-life.jpg` | `277:6973` | `3d_animation_gold_life 1` |
| `home-play-ia-gold-life.jpg` | `277:6981` | `ai_animation_gold_life 1` |
| `home-play-artesanato.jpg` | `277:6987` | `artesanato 1` |

### Sobre — 3 fotos, 373 × 280

| Arquivo | Nó | Camada |
|---|---|---|
| `home-foto-processo.jpg` | `277:7001` | `foto_luiza 1` |
| `home-foto-trabalhando.jpg` | `277:7003` | `foto_grupo 1` |
| `home-foto-retrato.jpg` | `277:7005` | `foto_time 1` |

### Currículo

`curriculo-erick-teixeira.pdf` — os dois botões "Ver Currículo" apontam para ele.

### Ícones: não precisa enviar

Os três ícones da home (copiar, currículo, LinkedIn) estão **desenhados em SVG
inline** no HTML. Nada a exportar.

---

## Case CT em Campo — `ct-em-campo.html`

Página **CT EM CAMPO**, frame `1:36`. **13 arquivos**, todos com prefixo `case-`.

| # | Arquivo | Nó | Camada |
|---|---|---|---|
| 1 | `case-capa-ct-em-campo.png` | `1:55` | `Motion_before_after 1` |
| 2 | `case-antes-depois-desktop-mobile.png` | `1:237` | `desktop_mobile 1` |
| 3 | `case-key-visual-arquibancada.png` | `1:256` | `kv_arquibancada2_brasil_16x9 1` |
| 4 | `case-direcao-fluxo-geracao.png` | `1:447` | `02 1` |
| 5 | `case-sistema-componentes-estados.png` | `1:510` | `Components 1` |
| 6 | `case-sistema-animacao-01.png` | `1:516` | `Animação_01 1` |
| 7 | `case-sistema-animacao-02.png` | `1:518` | `Animação_02 1` |
| 8 | `case-sistema-template-vs-dedicada.png` | `1:522` | `desktop 1` |
| 9 | `case-sistema-mobile-01.png` | `1:528` | `app_01 1` |
| 10 | `case-sistema-mobile-02.png` | `1:530` | `app_02 1` |
| 11 | `case-alcance-motion-formatos.png` | `1:568` | `motion_ct_em_campo_02 1` |
| 12 | `case-alcance-social-grade.png` | `1:573` | `social_media 1` |
| 13 | `case-alcance-whatsapp-mockup.png` | `1:577` | `whatsapp_mockup 1` |

> ⚠️ Este case foi portado da página **CT EM CAMPO** (`1:36`, 18027px de altura).
> A página **PORTFOLIO - prototipo** tem uma versão mais recente do mesmo case
> (`277:6139`, 17411px), com a tipografia e a paleta da Home. Ver o README da raiz.

---

## Peso

Se algum arquivo passar de ~1 MB, exporte em JPG q82. O conjunto todo deveria
ficar abaixo de 10 MB para a página abrir rápido no celular.
