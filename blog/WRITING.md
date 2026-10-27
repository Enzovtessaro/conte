# Blog da Conte: padrão editorial

Para quem escreve posts em `blog.sejaconte.com.br`, gente ou agente. O objetivo é duplo: ranquear no Google (SEO) e ser citado por ChatGPT, Perplexity, Claude e AI Overviews do Google (GEO).

## Público

Profissionais de tecnologia que trabalham como PJ no Brasil: devs, gente de dados, produto e design. Muitos recebem de empresas no exterior. Dúvidas típicas: Simples Nacional x Lucro Presumido, Fator R e pró-labore, Anexo III x V, nota fiscal de exportação de serviço, câmbio, IRPF de sócio, sair do MEI, trocar de contador, CLT x PJ.

## Voz

Solange Vaz, contadora e fundadora da Conte, falando com um cliente que é dev. Direta, concreta, sem juridiquês e sem exagero. Explica o porquê antes do como. Usa números reais com fonte. Nunca promete "pagar zero imposto" nem resultado garantido.

## Estrutura de um post novo (o `npm run check` exige)

- **Título** (`title`): a pergunta ou a promessa, com a palavra-chave principal no começo. `seoTitle` com até 60 caracteres quando o título for longo.
- **Descrição** (`description`): 140 a 160 caracteres, responde a pergunta e convida a ler.
- **Resposta rápida** (`tldr`): 2 a 5 frases que respondem sozinhas a pergunta principal, com o número ou a regra. É o trecho que as IAs citam.
- **Corpo**: 1.200 a 2.000 palavras, pelo menos 4 seções `##` escritas como perguntas que as pessoas fazem. Cada seção começa respondendo em 1 ou 2 frases e só depois detalha. Use tabela quando comparar regimes, alíquotas ou cenários. Um exemplo numérico com cálculo passo a passo vale mais que três parágrafos.
- **Links internos**: pelo menos 2 para outros posts (`/post/<slug>`) e 1 para `https://sejaconte.com.br` (ou para as calculadoras `/calculadora` e `/clt-vs-pj`).
- **FAQ** (`faq`): 3 a 6 perguntas reais (as do "As pessoas também perguntam" do Google são ótimas), respostas de 2 a 4 frases. Não repita o corpo palavra por palavra.
- **Fontes** (`sources`): pelo menos 2, de preferência oficiais: Receita Federal (gov.br/receitafederal), Planalto (leis e LCs), Portal do Simples Nacional, Banco Central, prefeituras, CFC.
- **Capa** (`cover`, `coverAlt`): foto horizontal, 1200 px de largura, JPG ou WebP com até 600 KB, em `public/images/posts/<slug>/`. Sem texto embutido. Fontes livres: Unsplash ou Pexels. `coverAlt` descreve a cena.
- Sem H1 no corpo (o título já é o H1).

## Precisão fiscal (não negociável)

- Todo número (alíquota, limite, prazo, valor) precisa ter fonte de 2025 ou 2026 conferida no dia. Se não achar fonte oficial, não use o número.
- Atenção a regras que mudaram ou estão mudando: reforma tributária (CBS e IBS, transição a partir de 2026), limites do MEI e do Simples, tabela do IRPF, isenções.
- Nada de "dica" que seja evasão ou zona cinzenta. Na dúvida, diga que depende do caso e chame para conversar com a contadora.
- Não invente clientes, depoimentos ou estatísticas da Conte.

## Escolha de pauta

- Uma pergunta por post, com intenção de busca clara ("como", "quanto", "vale a pena", "qual a diferença").
- Antes de escrever, procure em `src/content/posts/` se já existe post sobre o tema. Se existir, escolha outro ângulo ou outra pergunta. Dois posts disputando a mesma palavra-chave se prejudicam.
- Prefira temas de cauda longa e específicos do público tech PJ ("nota fiscal para empresa nos EUA", "Fator R para dev") aos genéricos ("o que é contabilidade").

## Frontmatter de exemplo

```yaml
---
title: Fator R em 2026: como o dev PJ paga 6% em vez de 15,5%
seoTitle: "Fator R 2026: como pagar 6% de imposto como dev PJ"
description: Entenda o Fator R do Simples Nacional, quanto de pró-labore você precisa para cair no Anexo III e um exemplo com números de 2026.
pubDate: 2026-10-28
category: planejamento-fiscal
tags: [fator r, simples nacional, pró-labore]
author: solange-vaz
cover: /images/posts/fator-r-dev-pj-2026/capa.jpg
coverAlt: Desenvolvedor calculando impostos no notebook
tldr:
  - "..."
faq:
  - q: "..."
    a: "..."
sources:
  - title: Lei Complementar nº 123/2006 (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm
---
```

Tags válidas: `fator-r`, `simples-nacional`, `lucro-presumido`, `mei`, `pro-labore`, `dividendos`, `nota-fiscal`, `exportacao-de-servicos`, `reforma-tributaria`, `irpf`, `clt-vs-pj`, `contratos`, `fluxo-de-caixa`, `contador`, `cnpj`, `fiscalizacao`, `certificado-digital`.

No corpo, a primeira menção a cada lei citada em `sources` vira link para a fonte (ex.: [LC 123](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm)). Valores do frontmatter com ": " vão entre aspas.

Categorias válidas: `contabilidade`, `planejamento-fiscal`, `tributacao`, `prestacao-de-servico`, `servicos-digitais`, `burocracia`, `certificacao`, `atendimento-humano`.

## Antes de publicar

`cd blog && npm run check && npm run build` precisa passar. O check bloqueia post fora deste padrão.
