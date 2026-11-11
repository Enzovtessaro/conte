---
title: "Impostos federais, estaduais e municipais: o que a PJ de serviços paga"
seoTitle: "Impostos federais, estaduais e municipais da PJ"
description: "Quais impostos federais, estaduais e municipais a PJ de serviços paga, quanto custa cada um e como a reforma troca PIS, Cofins, ICMS e ISS por CBS e IBS."
pubDate: '2025-12-18'
updatedDate: '2026-10-27'
category: tributacao
author: solange-vaz
cover: /images/posts/diferencas-impostos-federais-estaduais-municipais-pj/contadora-planejando-impostos-pj-828.webp
coverAlt: Contadora analisando impostos federais estaduais e municipais para PJ em escritório moderno
tags: [simples-nacional, lucro-presumido, reforma-tributaria, nota-fiscal, exportacao-de-servicos]
tldr:
  - "A PJ que presta serviços paga tributos federais (IRPJ, CSLL, PIS, Cofins e INSS) e um municipal (ISS, de 2% a 5%). O ICMS, estadual, incide sobre mercadorias, transporte e comunicação, não sobre desenvolvimento de software sob encomenda."
  - "No Simples Nacional, todos esses tributos saem em uma guia só, o DAS. No Lucro Presumido, cada um tem guia e prazo próprios."
  - "A reforma tributária substitui PIS e Cofins pela CBS federal em 2027 e reduz ICMS e ISS entre 2029 e 2032, até o IBS assumir por completo em 2033. Em 2026 há só um teste, com CBS de 0,9% e IBS de 0,1%."
faq:
  - q: "Qual a diferença entre imposto federal, estadual e municipal?"
    a: "É quem cria e cobra o tributo. A União cobra IRPJ, CSLL, PIS, Cofins, IPI e INSS; os estados cobram ICMS; os municípios cobram ISS. Cada ente tem sua própria legislação, prazos e fiscalização."
  - q: "Dev PJ paga ICMS?"
    a: "Em regra, não. Desenvolvimento e licenciamento de software customizado, consultoria e suporte são serviços sujeitos ao ISS municipal. O ICMS aparece para quem vende mercadoria, presta transporte intermunicipal ou serviço de comunicação."
  - q: "Qual a alíquota do ISS para desenvolvimento de software?"
    a: "Depende do município, entre o mínimo de 2% e o máximo de 5% fixados pela LC 116/2003. No Simples Nacional, o ISS vem dentro do DAS, como parte da alíquota do anexo."
  - q: "O que muda na nota fiscal com a reforma tributária?"
    a: "Desde 2026, as notas passam a ter campos de CBS e IBS, ainda em caráter de teste. A partir de 2027, a CBS é cobrada de fato no lugar de PIS e Cofins. Para quem está no Simples, os valores continuam dentro do DAS, salvo opção pelo recolhimento fora dele."
sources:
  - title: Emenda Constitucional nº 132/2023, reforma tributária (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm
  - title: Lei Complementar nº 214/2025, IBS, CBS e Imposto Seletivo (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm
  - title: Lei Complementar nº 116/2003, ISS (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm
  - title: Reforma Tributária do Consumo (Receita Federal)
    url: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo
  - title: Lei Complementar nº 123/2006 (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm
migratedFrom: https://blog.sejaconte.com.br/post/diferencas-impostos-federais-estaduais-municipais-pj
---

Toda PJ paga tributos para três níveis de governo: a União, o estado e o município. Para quem presta serviços de tecnologia, a conta se resume a cinco tributos federais e um municipal, o ISS. O ICMS estadual quase nunca entra. E a reforma tributária está trocando boa parte dessa lista até 2033.

## Por que existem impostos federais, estaduais e municipais?

A Constituição divide o poder de cobrar tributos entre União, estados e municípios. Cada ente cria seus tributos por lei, define alíquotas dentro dos limites constitucionais e fiscaliza o pagamento. Por isso o ISS de São Paulo é diferente do ISS de Florianópolis, e o ICMS de um estado não segue o do vizinho.

Para você, a consequência prática é ter três fiscos olhando a sua empresa: Receita Federal, secretaria estadual da Fazenda e prefeitura. No Simples Nacional, os três recebem pela mesma guia. Fora dele, cada um tem a sua.

## Quais impostos a PJ de serviços paga em cada esfera?

| Esfera | Tributo | Incide sobre | Dev PJ paga? |
|---|---|---|---|
| Federal | IRPJ | Lucro (real, presumido ou dentro do DAS) | Sim |
| Federal | CSLL | Lucro | Sim |
| Federal | PIS e Cofins | Faturamento | Sim (isento na exportação) |
| Federal | INSS (CPP e do sócio) | Folha e pró-labore | Sim |
| Federal | IPI | Produtos industrializados | Não |
| Estadual | ICMS | Mercadorias, transporte, comunicação | Em regra, não |
| Municipal | ISS | Serviços | Sim (isento na exportação) |

Duas observações para quem fatura do exterior. A exportação de serviços com ingresso de divisas é isenta de PIS, Cofins e ISS, tanto no Simples ([LC 123](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm), art. 18, § 14) quanto fora dele ([LC 116](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm), art. 2º). IRPJ, CSLL e INSS continuam devidos. O post sobre [tributação de serviços para o exterior](/post/tributacao-servicos-para-exterior-o-que-muda) detalha a nota e o câmbio.

## Quanto custa cada tributo? Exemplo com R$ 20 mil por mês

No Lucro Presumido, dá para enxergar cada tributo separado. Um dev PJ que fatura R$ 20 mil por mês de clientes no Brasil, em município com ISS de 2%, paga:

| Tributo | Esfera | Cálculo | Valor mensal |
|---|---|---|---|
| IRPJ | Federal | 15% × 32% × R$ 20.000 | R$ 960 |
| CSLL | Federal | 9% × 32% × R$ 20.000 | R$ 576 |
| PIS | Federal | 0,65% × R$ 20.000 | R$ 130 |
| Cofins | Federal | 3% × R$ 20.000 | R$ 600 |
| ISS | Municipal | 2% × R$ 20.000 | R$ 400 |
| **Total da empresa** | | 13,33% | **R$ 2.666** |

Do total, 85% vai para a União e 15% para o município. Somam-se o INSS patronal de 20% e o do sócio, de 11%, sobre o pró-labore.

No Simples Nacional, o mesmo dev paga uma guia só. Com Fator R de 28% ou mais e receita de R$ 240 mil em 12 meses, a alíquota efetiva do Anexo III é de 7,3%: um DAS de R$ 1.460, que a Receita reparte entre IRPJ, CSLL, PIS, Cofins, INSS patronal e ISS. A comparação completa entre os dois regimes está em [Simples Nacional ou Lucro Presumido](/post/simples-nacional-ou-lucro-presumido-para-empresas-de-tecnologia), e a conta do Fator R em [Fator R para dev PJ](/post/pj-tecnologia-pode-ser-simples-nacional-opcoes).

![Empresários analisando folhas e gráficos de impostos em um escritório](/images/posts/diferencas-impostos-federais-estaduais-municipais-pj/tributacao-empresas-brasil-251.webp)

## Como funciona o ISS para quem presta serviços de tecnologia?

O ISS é cobrado pelo município onde fica o estabelecimento do prestador, com alíquota entre 2% e 5%, conforme a LC 116/2003. O mínimo de 2% evita guerra fiscal entre prefeituras; o máximo de 5% limita a cobrança.

Cada prefeitura define a alíquota por item da lista de serviços. Desenvolvimento de programas, licenciamento de software, suporte e consultoria em TI aparecem em itens diferentes, e a alíquota pode variar entre eles. Confira o item correto na emissão da nota, porque o código errado gera ISS errado. O guia de [emissão de nota fiscal de serviço](/post/emitir-notas-fiscais-eletronicas-servicos-2025) mostra onde olhar.

## O que muda com a reforma tributária?

A reforma ([EC 132/2023](https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm) e [LC 214/2025](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm)) substitui cinco tributos sobre consumo por três: CBS federal, IBS de estados e municípios e Imposto Seletivo federal. IRPJ, CSLL e INSS não mudam. O efeito para quem é dev PJ está no guia da [reforma tributária para PJ de tecnologia](/post/reforma-tributaria-pj-tecnologia-2026-2033).

| Ano | O que acontece |
|---|---|
| 2026 | Teste: CBS de 0,9% e IBS de 0,1% destacados na nota, compensáveis com PIS e Cofins. Empresas do Simples não recolhem nada a mais |
| 2027 | CBS entra de vez e PIS e Cofins acabam. IPI vai a zero, exceto Zona Franca de Manaus. Começa o Imposto Seletivo |
| 2028 | Mantém o IBS de teste |
| 2029 a 2032 | ICMS e ISS caem 10% ao ano (para 90%, 80%, 70% e 60% das alíquotas) enquanto o IBS sobe |
| 2033 | ICMS e ISS acabam e o IBS assume por completo |

Para quem está no Simples, CBS e IBS ficam dentro do DAS. A novidade é que, a partir de 2027, a empresa pode optar por recolher os dois fora do DAS, pelo regime regular, para gerar crédito integral aos clientes empresas. Para o primeiro semestre de 2027, essa escolha vai até 30 de outubro de 2026. Quem fatura só para o exterior continua desonerado, porque exportação de serviços segue sem CBS e IBS. O impacto na escolha de regime está em [quando mudar de regime tributário](/post/regimes-tributarios-quando-mudar-e-como-saber-hora-certa).

## Como organizar os pagamentos em cada esfera?

Organize por calendário e por guia. No Simples, o DAS vence no dia 20 do mês seguinte ao faturamento e cobre as três esferas. No Lucro Presumido, os prazos se separam:

- **Federais:** PIS, Cofins e INSS mensais; IRPJ e CSLL trimestrais, podendo dividir em três quotas.
- **Municipal:** ISS mensal, no prazo da prefeitura, que costuma cair entre os dias 10 e 20.
- **Retenções:** clientes empresas podem reter IR, CSLL, PIS, Cofins ou ISS na fonte. A retenção é antecipação, então desconte esses valores na apuração.

Guarde as notas e os comprovantes por esfera, e confira se as retenções aparecem nos informes dos clientes. Para montar essa rotina, veja os [documentos essenciais para controlar a PJ de TI](/post/documentos-essenciais-para-controlar-pj-ti-sem-erros). Se preferir delegar, a [Conte](https://sejaconte.com.br) acompanha as guias das três esferas para PJ tech.
