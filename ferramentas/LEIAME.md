# ferramentas

Scripts que geram a versão publicável do portfólio a partir dos arquivos da raiz.
Precisam de Python 3 com Pillow (`pip install pillow`).

Rode nesta ordem, de dentro desta pasta:

```bash
python3 build.py     # converte assets/ para WebP em docs/assets (100 MB -> 14 MB)
python3 paginas.py   # copia as 4 páginas para docs/ apontando para os .webp
python3 unico.py     # gera portfolio-erick-teixeira.html (arquivo único) na raiz
```

- `docs/` é o que sobe para a Hostinger (ou para o GitHub Pages).
- `fontes-web/` guarda os arquivos .woff2 da Sora e da JetBrains Mono, servidos
  do próprio domínio — a página não faz nenhuma requisição para terceiros.
- `mapa.json` é gerado pelo `build.py` e diz qual arquivo original virou qual
  `.webp`; o `paginas.py` usa isso para trocar os `src`.
