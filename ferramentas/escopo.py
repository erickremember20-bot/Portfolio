import re

def tokenizar(css):
    """Divide o CSS em regras de topo, respeitando aninhamento de chaves."""
    itens, i, n = [], 0, len(css)
    while i < n:
        while i < n and css[i] in ' \t\r\n': i += 1
        if i >= n: break
        if css.startswith('/*', i):
            j = css.find('*/', i+2); i = (j+2) if j != -1 else n; continue
        ini = i
        while i < n and css[i] not in '{;': i += 1
        if i >= n: break
        if css[i] == ';':                      # @import, @charset...
            itens.append(('crua', css[ini:i+1])); i += 1; continue
        prelude = css[ini:i].strip()
        prof, j = 1, i+1
        while j < n and prof:
            if css[j] == '{': prof += 1
            elif css[j] == '}': prof -= 1
            j += 1
        corpo = css[i+1:j-1]
        itens.append(('regra', prelude, corpo))
        i = j
    return itens

GLOBAIS = ('@font-face', '@keyframes', '@-webkit-keyframes', '@page', '@property', '@counter-style')

def prefixar(seletores, escopo):
    saida = []
    for s in seletores.split(','):
        s = s.strip()
        if not s: continue
        if s in (':root', 'html', 'body', ':root,html', 'html,body'):
            saida.append(escopo)
        elif s.startswith(':root'):
            saida.append(escopo + s[len(':root'):])
        elif s.startswith('html ') or s.startswith('body '):
            saida.append(escopo + ' ' + s.split(' ', 1)[1])
        elif s.startswith('body'):
            saida.append(escopo + s[len('body'):])
        else:
            saida.append(escopo + ' ' + s)
    return ', '.join(saida)

def escopar(css, escopo):
    out = []
    for item in tokenizar(css):
        if item[0] == 'crua':
            out.append(item[1]); continue
        prelude, corpo = item[1], item[2]
        if prelude.startswith(GLOBAIS):
            out.append(f'{prelude}{{{corpo}}}')
        elif prelude.startswith('@media') or prelude.startswith('@supports') or prelude.startswith('@layer'):
            out.append(f'{prelude}{{{escopar(corpo, escopo)}}}')
        elif prelude.startswith('@'):
            out.append(f'{prelude}{{{corpo}}}')
        else:
            out.append(f'{prefixar(prelude, escopo)}{{{corpo}}}')
    return '\n'.join(out)
