# Assets

Coloque os arquivos **nesta pasta**, com **exatamente** estes nomes. As páginas já
apontam para eles; enquanto um arquivo não existir, a moldura mostra o nome que
falta em vez de quebrar.

Origem: Figma `Jb6w9GH2aN7mVVCQseu3n5`. Exporte cada frame `[imagem]` em **PNG/JPG 2x**.

---

## Status dos assets

**28 de 31 imagens já estão na pasta** e as páginas as carregam. Os arquivos
enviados mantiveram os nomes das camadas do Figma — o HTML foi religado a esses
nomes, então **nada precisa ser renomeado**.

### Faltam 3 arquivos (seção "Sobre" da home)

| Arquivo esperado | Nó | Camada | Proporção |
|---|---|---|---|
| `home-foto-processo.jpg` | `277:7001` | `foto_luiza 1` | 373 × 280 |
| `home-foto-trabalhando.jpg` | `277:7003` | `foto_grupo 1` | 373 × 280 |
| `home-foto-retrato.jpg` | `277:7005` | `foto_time 1` | 373 × 280 |

Se enviar com outro nome, é só avisar que eu religo o caminho.

### E o currículo

`curriculo-erick-teixeira.pdf` — os dois botões "Ver Currículo" apontam para ele.

---

## O que está ligado onde

### Home — `index.html`

| Slot | Arquivo |
|---|---|
| Retrato do hero | `erick.png` |
| Marcas | `logo_kabum.png` · `logo_netshoes.png` · `logo_canaltech.png` · `logo_motorola.png` · `logo_magalu.png` |
| Capa projeto 01 | `capa_nega_nago.jpg` |
| Capa projeto 02 | `capa_ct_em_campo.png` |
| Capa projeto 03 | `capa_canaltech_hub_links.png` |
| Playground 1–6 | `01_ilustracao_2D.gif` · `02_short_film_ai.gif` · `03_3d_animation_tyler.gif` · `04_3d_animation_gold_life.gif` · `05_ai_animation_gold_life.gif` · `06_artesanato.gif` |
| Fotos do Sobre | **faltando** (ver acima) |

Os três ícones (copiar, currículo, LinkedIn) estão desenhados em **SVG inline** no
HTML — os `.svg` enviados (`Copy.svg`, `ReadCvLogo.svg`, `LinkedIn_icon.svg`)
ficam na pasta como fonte, mas a página não depende deles.

### Case CT em Campo — `ct-em-campo.html`

Todas as 13 estão presentes:

`Motion_before_after.gif` · `desktop_mobile.png` · `kv_arquibancada2_brasil_16x9.png` ·
`02.png` · `Components.png` · `Animacao_01.gif` · `Animacao_02.gif` · `desktop.png` ·
`app_01.png` · `app_02.png` · `motion_ct_em_campo.gif` ·
`ct_em_campo_social_media.png` · `whatsapp_mockup.png`

---

## ⚠️ Peso: 102 MB na pasta

Os GIFs do Playground somam ~60 MB (8 a 12 MB cada) e `motion_ct_em_campo.gif`
tem 12 MB. As páginas usam `loading="lazy"`, então nada disso baixa antes de
entrar na tela — mas quem rolar até o Playground no celular vai puxar ~60 MB.

Vale converter os sete GIFs para **MP4/WebM** (`<video autoplay muted loop
playsinline>`) ou **WebP animado**: o mesmo movimento costuma cair para 5–10% do
peso. Me avisa que eu troco.

## Arquivos ainda não usados

Estes vieram no envio e são dos outros dois cases, que ainda não foram portados:
`01 · Foundations.png`, `02 · Components.png`, `01_probelm_solution.png`,
`02_desktop_mobile.png`, `03_telas.png`, `05_cookies.png`, `06_linktree1.png`,
`07_linktree2.png`, `figma-icon.svg`, `DownloadSimple.svg`.
