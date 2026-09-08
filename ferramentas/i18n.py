# -*- coding: utf-8 -*-
"""Monta assets/i18n.js a partir do dicionário e do runtime.

- i18n-pt-en.json : dicionário português → inglês (a chave é o texto que está no HTML)
- i18n-runtime.js : a lógica de troca e o botão PT/EN

Para corrigir uma tradução, edite o JSON e rode este script.
"""
import json, os

SD   = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(SD)

dic = json.load(open(os.path.join(SD, 'i18n-pt-en.json'), encoding='utf-8'))
rt  = open(os.path.join(SD, 'i18n-runtime.js'), encoding='utf-8').read()

saida = ('/* dicionário PT → EN — gerado por ferramentas/i18n.py */\n'
         'window.__DIC_EN=' + json.dumps(dic, ensure_ascii=False, separators=(',', ':')) + ';\n' + rt)
destino = os.path.join(RAIZ, 'assets', 'i18n.js')
open(destino, 'w', encoding='utf-8').write(saida)
print(f'{destino} · {len(dic)} entradas · {len(saida)//1024} KB')
