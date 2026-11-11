---
title: 'Imposto ao prestar serviço para o exterior: guia do PJ tech em 2026'
seoTitle: 'Imposto sobre serviço para o exterior: guia PJ 2026'
description: No Simples, a exportação de serviço fica livre de PIS, Cofins e ISS. Veja o que ainda paga, o limite extra de R$ 4,8 mi e um exemplo com cliente em dólar.
pubDate: '2025-11-05'
updatedDate: '2026-10-27'
category: tributacao
tags: [exportacao-de-servicos, simples-nacional, fator-r, nota-fiscal]
author: solange-vaz
cover: /images/posts/tributacao-servicos-para-exterior-o-que-muda/contador-estrategia-tributaria-servicos-exterior-634.webp
coverAlt: Contador analisando documentos fiscais com mapas globais e gráficos de impostos ao fundo
tldr:
  - "Serviço prestado do Brasil para cliente no exterior, com pagamento que entra no país, é exportação: no Simples Nacional você deixa de pagar a parte de PIS, Cofins e ISS do DAS (LC 123, art. 18, §14, e LC 116, art. 2º)."
  - "IRPJ, CSLL e a contribuição previdenciária (CPP) continuam no DAS. No Anexo III, isso derruba a alíquota efetiva da 1ª faixa de 6% para cerca de 3,05%."
  - "A ME e a EPP podem faturar até R$ 4,8 milhões por ano em exportação além do limite de R$ 4,8 milhões do mercado interno (LC 123, art. 3º, §14)."
  - "A isenção não vale se o resultado do serviço acontece no Brasil, mesmo que quem paga esteja lá fora (LC 116, art. 2º, parágrafo único)."
faq:
  - q: "MEI pode prestar serviço para empresa no exterior?"
    a: "Pode, desde que a ocupação dele esteja na lista de atividades permitidas ao MEI. O problema para quem é dev é outro: as atividades de desenvolvimento de software não são permitidas no MEI. Além disso, o limite de R$ 81 mil por ano vale para toda a receita, sem a faixa extra de exportação que a LC 123 dá à ME e à EPP."
  - q: "Preciso pagar ISS em nota para cliente de fora?"
    a: "Não, quando o serviço é exportado de fato: o ISS não incide sobre exportação de serviços (LC 116, art. 2º, I). Se o resultado do trabalho se verifica no Brasil, por exemplo uma manutenção em sistema de empresa brasileira paga pela matriz lá fora, o ISS é devido."
  - q: "Quanto imposto paga um dev PJ que recebe em dólar?"
    a: "No Simples Nacional, com Fator R de 28% ou mais (Anexo III) e faturamento de até R$ 180 mil em 12 meses, a alíquota efetiva cai para cerca de 3,05% sobre a receita de exportação. Some o INSS de 11% sobre o pró-labore. Com faturamento maior, a alíquota sobe por faixa."
  - q: "Vou pagar imposto nos EUA e no Brasil?"
    a: "Em regra, não. Serviço feito daqui por empresa brasileira costuma ser tributado só aqui, e o cliente americano normalmente pede o formulário W-8BEN-E para não reter imposto. O Brasil não tem acordo para evitar dupla tributação com os EUA, então, se houver retenção, guarde o comprovante e fale com seu contador."
  - q: "Tem IOF para receber pagamento do exterior?"
    a: "O IOF-Câmbio é zero no ingresso de receitas de exportação de serviços (Decreto 6.306/2007, art. 15-B, I). A Receita entende que, se você deixar o dinheiro no exterior e trouxer depois, pode incidir 0,38%."
sources:
  - title: Lei Complementar nº 123/2006, arts. 3º §14 e 18 §14 (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm
  - title: Lei Complementar nº 116/2003, art. 2º (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm
  - title: Lei Complementar nº 155/2016, Anexo III do Simples Nacional (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp155.htm
  - title: Medida Provisória nº 2.158-35/2001, art. 14 (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/mpv/2158-35.htm
  - title: Cotações e boletins do Banco Central (PTAX)
    url: https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes
  - title: Portal do Simples Nacional (Receita Federal)
    url: https://www8.receita.fazenda.gov.br/SimplesNacional/
migratedFrom: https://blog.sejaconte.com.br/post/tributacao-servicos-para-exterior-o-que-muda
---

Se você é dev, designer ou analista de dados e fatura para uma empresa de fora com o CNPJ da sua PJ, a lei trata esse trabalho como exportação de serviço. Isso tira três tributos da conta: PIS, Cofins e ISS. O resto continua, e alguns detalhes (onde o resultado acontece, como entra o dinheiro, como sai a nota) decidem se a isenção vale.

## O que conta como exportação de serviço?

Exportação de serviço é o trabalho que você presta do Brasil para alguém residente ou domiciliado no exterior, com pagamento que entra no país em moeda estrangeira. Para o ISS, a [LC 116/2003](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm) acrescenta uma condição: o resultado do serviço precisa se verificar fora do Brasil.

Na prática, um dev que constrói features para o produto de uma startup americana, usado por clientes de lá, exporta serviço. O caso muda quando o resultado fica aqui. A LC 116 diz, no parágrafo único do art. 2º, que não é exportação o serviço desenvolvido no Brasil cujo resultado aqui se verifique, ainda que o pagamento venha de residente no exterior. Exemplo: você dá suporte ao ERP da filial brasileira de uma multinacional e a matriz paga a fatura. O dinheiro vem de fora, mas o resultado acontece no Brasil, então o ISS é devido.

Três perguntas resolvem a maioria dos casos:

1. O contratante está no exterior (empresa ou pessoa física)?
2. O pagamento entra no Brasil por contrato de câmbio, em conta da PJ?
3. O benefício do trabalho fica fora do Brasil?

Com três "sim", você tem exportação para PIS, Cofins e ISS.

## Quais impostos somem e quais continuam no Simples Nacional?

No Simples, a receita de exportação deixa de pagar a parcela de PIS, Cofins e ISS do DAS. IRPJ, CSLL e a CPP (a contribuição previdenciária patronal embutida no DAS) continuam.

A regra está no art. 18, §14, da [LC 123/2006](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm): a receita de exportação é segregada na apuração (PGDAS-D), e o sistema desconta as alíquotas efetivas de PIS, Cofins e ISS. No Anexo III, essas três parcelas somam 49,1% do DAS nas quatro primeiras faixas (pela tabela de repartição da [LC 155/2016](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp155.htm)). Você paga os outros 50,9%.

| Tributo no DAS (Anexo III) | Venda no Brasil | Exportação de serviço |
|---|---|---|
| IRPJ | Paga | Paga |
| CSLL | Paga | Paga |
| CPP (INSS patronal) | Paga | Paga |
| PIS | Paga | Isento |
| Cofins | Paga | Isento |
| ISS | Paga | Não incide |

Para ficar no Anexo III você precisa do Fator R: a folha de salários dos últimos 12 meses, incluindo o pró-labore, deve ser igual ou maior que 28% da receita bruta no mesmo período. Sem isso, a atividade de desenvolvimento cai no Anexo V, que começa em 15,5% de alíquota nominal. A receita de exportação entra no cálculo do Fator R como qualquer outra. Os detalhes estão no guia sobre [como a PJ de tecnologia se enquadra no Simples Nacional](/post/pj-tecnologia-pode-ser-simples-nacional-opcoes).

## Quanto um dev PJ paga com cliente em dólar? (exemplo 2026)

Com faturamento de até R$ 180 mil em 12 meses e Fator R em dia, a alíquota efetiva sobre a exportação fica perto de 3,05%. Veja a conta.

Premissas: você fatura US$ 2.500 por mês para uma empresa nos EUA. Para o exemplo, use uma cotação de R$ 5,40 por dólar (confira a PTAX do dia no site do Banco Central). Faturamento mensal: R$ 13.500. Receita dos últimos 12 meses (RBT12): R$ 162.000, na 1ª faixa do Anexo III.

1. Alíquota nominal da 1ª faixa do Anexo III: 6%, sem parcela a deduzir.
2. Parcela que sai na exportação (PIS 2,78% + Cofins 12,82% + ISS 33,5% da repartição): 49,1%.
3. Alíquota efetiva na exportação: 6% × (1 − 0,491) = 3,054%.
4. DAS do mês: R$ 13.500 × 3,054% = **R$ 412,29**. Se o cliente fosse brasileiro, seriam R$ 810,00.
5. Pró-labore mínimo para o Fator R: 28% × R$ 162.000 = R$ 45.360 por ano, ou R$ 3.780 por mês.
6. INSS de 11% sobre o pró-labore: R$ 415,80 por mês. O IRPF na fonte fica zerado, porque a Lei 15.270/2025 isentou rendimentos de até R$ 5 mil por mês a partir de 2026.

Imposto total do mês: cerca de R$ 828, ou 6,1% do faturamento, contando o INSS do pró-labore. Para testar seus números, use esta [calculadora de impostos para PJ](https://sejaconte.com.br/calculadora).

A alíquota sobe com o faturamento. Na mesma lógica:

| RBT12 | Faixa do Anexo III | Alíquota efetiva (mercado interno) | Alíquota efetiva (exportação) |
|---|---|---|---|
| R$ 162 mil | 1ª | 6,00% | 3,05% |
| R$ 500 mil | 3ª | 9,97% | 5,08% |
| R$ 1 milhão | 4ª | 12,44% | 6,33% |

## Existe limite de faturamento para exportar no Simples?

Sim, e ele é dobrado. A ME e a EPP podem faturar até R$ 4,8 milhões por ano no mercado interno e mais R$ 4,8 milhões em exportação de mercadorias ou serviços, sem sair do Simples (LC 123, art. 3º, §14). Uma PJ que fatura R$ 3 milhões para clientes de fora e R$ 1 milhão no Brasil continua dentro do regime.

A alíquota, porém, considera a receita total para definir a faixa. Faturar mais em dólar empurra você para faixas mais caras, mesmo com o desconto da exportação.

## MEI pode exportar serviços?

Pode, se a ocupação estiver na lista de atividades permitidas ao MEI. Não existe proibição de exportar no MEI. A restrição que pega o público tech é outra: o desenvolvimento de software e a maior parte das atividades de TI não estão entre as ocupações permitidas ao MEI. Além disso, o teto do MEI é R$ 81 mil por ano para toda a receita, e a faixa extra de R$ 4,8 milhões vale só para ME e EPP.

Se você é dev e está no MEI com um CNAE que não descreve o que faz, o risco é de desenquadramento com cobrança retroativa. O caminho é migrar para ME no Simples, com o [checklist de saída do MEI](/post/migrar-mei-para-ltda-checklist-prazos).

## E se a PJ estiver no Lucro Presumido?

No Lucro Presumido a exportação também fica livre de PIS, Cofins (MP 2.158-35/2001, art. 14, III, quando o pagamento representa ingresso de divisas) e ISS. Sobram IRPJ e CSLL sobre a margem presumida de 32% para serviços: 4,8% de IRPJ e 2,88% de CSLL, ou 7,68% da receita, mais o adicional de 10% de IRPJ sobre o lucro presumido acima de R$ 20 mil por mês. A empresa ainda paga 20% de INSS patronal sobre o pró-labore, fora da nota.

Para a maioria dos devs com faturamento até R$ 1 milhão por ano e Fator R em dia, o Simples sai mais barato na exportação. Acima disso, vale simular os dois. A comparação completa está em [Simples Nacional ou Lucro Presumido para empresas de tecnologia](/post/simples-nacional-ou-lucro-presumido-para-empresas-de-tecnologia).

## Como funciona o câmbio para receber do exterior?

O cliente paga em dólar ou euro, e um banco ou instituição autorizada pelo Banco Central converte para reais por meio de um contrato de câmbio em nome da PJ. Esse contrato é a prova de que houve ingresso de divisas, condição para a isenção de PIS e Cofins.

Pontos práticos:

- **Receba na conta da PJ.** Dinheiro do trabalho da empresa caindo na conta pessoal confunde receita da PJ com renda de pessoa física e enfraquece a prova da exportação.
- **Use a natureza de câmbio de serviços.** Ao fechar o câmbio, a instituição classifica a operação. Confira se ela aparece como prestação de serviço, e não como transferência pessoal.
- **IOF zero no ingresso.** O IOF-Câmbio é zero na entrada de receitas de exportação (Decreto 6.306/2007, art. 15-B, I). A Receita entende que pode haver 0,38% se o dinheiro ficar no exterior e for trazido depois.
- **Guarde o contrato de câmbio** junto com a nota fiscal e o contrato com o cliente. Os três juntos sustentam a isenção numa fiscalização.

A nota fiscal sai em reais. Use a PTAX de compra publicada pelo Banco Central e mantenha o mesmo critério todo mês. A diferença entre a taxa da nota e a taxa do fechamento do câmbio vira variação cambial, que o contador registra à parte.

## Como emitir a nota fiscal de exportação?

Você emite uma NFS-e normal, com o tomador identificado como residente no exterior e a tributação do ISS marcada como exportação de serviço. A partir de 1º de novembro de 2026, as ME e EPP do Simples emitem NFS-e pelo padrão nacional, conforme a Resolução CGSN nº 191/2026.

O passo a passo, com os campos e os erros que mais travam a emissão, está em [nota fiscal de exportação de serviço: erros comuns e como corrigir](/post/nota-fiscal-internacional-erros-comuns-e-como-corrigir-rapido). No PGDAS-D, informe essa receita no campo de exportação. Se você lançar como receita comum, o sistema cobra PIS, Cofins e ISS, e o erro só aparece quando alguém revisa a apuração.

## Vou pagar imposto duas vezes, aqui e no país do cliente?

Na maioria dos casos, não. Serviço prestado daqui por empresa brasileira costuma ser tributado só no Brasil. Empresas americanas normalmente pedem o formulário W-8BEN-E para documentar que a sua PJ é estrangeira e dispensar retenção nos EUA.

O Brasil não tem acordo para evitar dupla tributação com os Estados Unidos. Com outros países, como Portugal, há acordo, e a regra para serviços depende do texto de cada tratado. Se o cliente reter imposto lá fora, peça o comprovante e leve ao contador antes de fechar a apuração do mês.

## O que muda com a reforma tributária?

Para o exportador de serviço, o principal benefício continua: a Emenda Constitucional 132 e a LC 214/2025 mantêm as exportações livres de CBS e IBS, os tributos que vão substituir PIS, Cofins e ISS. Em 2026 o Simples segue com as regras atuais, e as informações de CBS e IBS passam a valer para as empresas do regime a partir de 1º de janeiro de 2027. Veja o que muda ano a ano na [reforma tributária para PJ de tecnologia](/post/reforma-tributaria-pj-tecnologia-2026-2033).

A nota fiscal ganha campos novos para esses tributos, e o enquadramento do serviço como exportação ficará ainda mais visível para o fisco. Contrato, câmbio e nota coerentes entre si são a melhor defesa.

Quem quer ajuda para montar essa rotina desde o primeiro cliente de fora pode conhecer o acompanhamento da [Conte](https://sejaconte.com.br).
