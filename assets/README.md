# Assets

Coloque os arquivos **nesta pasta**, com **exatamente** estes nomes. As páginas já
apontam para eles; enquanto um arquivo não existir, a moldura mostra o nome que
falta em vez de quebrar.

Origem: Figma `Jb6w9GH2aN7mVVCQseu3n5`. Exporte cada frame `[imagem]` em **PNG/JPG 2x**.

---

## Status dos assets

**41 das 50 imagens estão na pasta e carregam.** Os arquivos enviados mantiveram
os nomes das camadas do Figma — o HTML foi religado a esses nomes, então nada
precisa ser renomeado.

| Página | Imagens | Situação |
|---|---|---|
| Home | 18 | ✅ completas |
| Canaltech · Hub de links | 10 | ✅ completas |
| CT em Campo | 13 | ✅ completas |
| Nega Nagô | 9 | ⚠️ **faltando** |

### Faltam as 9 do Nega Nagô

Página `PORTFOLIO - prototipo`, frame `Case · Nega Nagô` (`277:5578`).

| Arquivo esperado | Nó | Camada | Proporção |
|---|---|---|---|
| `01_phone_laptop.png` | `277:5592` | `01_phone_laptop 1` | 1160 × 612 |
| `02_before_after.png` | `277:5635` | `02_before_after 1` | 1160 × 630 |
| `01_tamanhos.png` | `277:5688` | `01_tamanhos 1` | 570 × 441 |
| `02_checkout.png` | `277:5690` | `02_checkout 1` | 570 × 441 |
| `03_wireframe.png` | `277:5769` | `03_wireframe 1` | 570 × 441 |
| `04_protoripo.png` | `277:5771` | `04_protoripo 1` | 615 × 476 |
| `nega_nago_design_system_02.png` | `277:5940` | `nega_nago_design_system_02 1` | 1160 × 653 |
| `07_tabela.png` | `277:5997` | `07_tabela 1` | 1160 × 348 |
| `07_tamanhos.png` | `277:6020` | `07_tamanhos 1` | 1160 × 340 |

Se enviar com outro nome, é só avisar que eu religo o caminho.

### E o currículo

`curriculo-erick-teixeira.pdf` — os botões "Ver Currículo" das quatro páginas
apontam para ele.

---

## O que está ligado onde

### Home — `index.html`

| Slot | Arquivo |
|---|---|
| Retrato do hero | `erick.png` |
| Marcas | `logo_kabum.png` · `logo_netshoes.png` · `logo_canaltech.png` · `logo_motorola.png` · `logo_magalu.png` |
| Capas dos projetos | `capa_nega_nago.jpg` · `capa_ct_em_campo.png` · `capa_canaltech_hub_links.png` |
| Playground 1–6 | `01_ilustracao_2D.gif` · `02_short_film_ai.gif` · `03_3d_animation_tyler.gif` · `04_3d_animation_gold_life.gif` · `05_ai_animation_gold_life.gif` · `06_artesanato.gif` |
| Fotos do Sobre | `foto_luiza.jpg` · `foto_grupo.jpg` · `foto_time.jpg` |

### Canaltech · Hub de links — `canaltech-hub.html`

`01_probelm_solution.png` · `07_linktree2.png` · `06_linktree1.png` ·
`02_desktop_mobile.png` · `05_cookies.png` · `board-01-foundations.png` ·
`board-02-components.png` · `03_telas.png` · e as duas capas do "Ver mais".

### CT em Campo — `ct-em-campo.html`

`Motion_before_after.gif` · `desktop_mobile.png` · `kv_arquibancada2_brasil_16x9.png` ·
`02.png` · `Components.png` · `Animacao_01.gif` · `Animacao_02.gif` · `desktop.png` ·
`app_01.png` · `app_02.png` · `motion_ct_em_campo.gif` ·
`ct_em_campo_social_media.png` · `whatsapp_mockup.png`

### Ícones: não precisa enviar

Os ícones das quatro páginas estão desenhados em **SVG inline** no HTML. Os `.svg`
enviados (`Copy.svg`, `ReadCvLogo.svg`, `LinkedIn_icon.svg`, `DownloadSimple.svg`,
`figma-icon.svg`) ficam na pasta como fonte, mas nenhuma página depende deles.

---

## ⚠️ Peso: ~102 MB na pasta

Os GIFs do Playground somam ~60 MB (8 a 12 MB cada) e `motion_ct_em_campo.gif`
tem 12 MB. As páginas usam `loading="lazy"`, então nada disso baixa antes de
entrar na tela — mas quem rolar até o Playground no celular vai puxar ~60 MB.

Vale converter os sete GIFs para **MP4/WebM** (`<video autoplay muted loop
playsinline>`) ou **WebP animado**: o mesmo movimento costuma cair para 5–10% do
peso. Me avisa que eu troco.
