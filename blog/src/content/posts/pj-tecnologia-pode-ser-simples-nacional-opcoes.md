---
title: "Fator R: como o dev PJ paga 6% no Simples Nacional em 2026"
seoTitle: "Fator R 2026: como o dev PJ paga 6% no Simples"
description: "Fator R de 28% leva o dev PJ do Anexo V (15,5%) ao Anexo III (6%) do Simples Nacional. Veja o pró-labore necessário e um cálculo com números de 2026."
pubDate: '2025-10-15'
updatedDate: '2026-10-27'
category: planejamento-fiscal
author: solange-vaz
cover: /images/posts/pj-tecnologia-pode-ser-simples-nacional-opcoes/empresa-tecnologia-escritorio-286.webp
coverAlt: Escritório moderno de empresa de tecnologia com profissionais usando computadores e discutindo estratégias fiscais
tags: [fator-r, simples-nacional, pro-labore, exportacao-de-servicos, cnpj]
tldr:
  - "Empresa de desenvolvimento de software pode optar pelo Simples Nacional, mas a alíquota depende do Fator R: folha de salários (incluindo pró-labore) dividida pela receita bruta dos últimos 12 meses."
  - "Com Fator R igual ou maior que 28%, a empresa é tributada pelo Anexo III, que começa em 6%. Abaixo de 28%, cai no Anexo V, que começa em 15,5%."
  - "Para um dev que fatura R$ 15 mil por mês, o pró-labore precisa ser de pelo menos R$ 4.200. Mesmo somando o INSS desse pró-labore, a carga mensal fica em torno de R$ 1.362, contra cerca de R$ 2.503 no Anexo V."
  - "Desenvolvimento de software não pode ser MEI. O caminho é ME ou EPP no Simples, com limite de R$ 4,8 milhões de receita interna por ano mais R$ 4,8 milhões de exportação."
faq:
  - q: "Fator R vale para todo serviço de tecnologia?"
    a: "Vale para as atividades listadas no art. 18, § 5º-M, da LC 123/2006, que incluem desenvolvimento e licenciamento de software customizável, consultoria em TI, suporte, análise de sistemas e programação. A classificação sai do CNAE e da descrição da nota fiscal, então confirme o enquadramento do seu código antes de calcular."
  - q: "O pró-labore entra no cálculo do Fator R?"
    a: "Entra. A LC 123 considera folha de salários a soma de salários, pró-labore, FGTS e contribuição patronal previdenciária pagos nos 12 meses anteriores. Distribuição de lucros e aluguéis ficam fora da conta."
  - q: "O que acontece se o Fator R cair abaixo de 28% em um mês?"
    a: "O cálculo é mensal, sobre os 12 meses anteriores. No mês em que a razão ficar abaixo de 28%, a receita daquele mês é tributada pelo Anexo V. No mês seguinte, se a média voltar a 28% ou mais, a empresa volta ao Anexo III."
  - q: "Quem fatura do exterior também precisa do Fator R?"
    a: "Precisa. A receita de exportação entra na receita bruta dos 12 meses para o Fator R. A diferença é que, na exportação de serviços, a parcela de PIS, Cofins e ISS sai do DAS, o que reduz a alíquota efetiva."
  - q: "Vale a pena pagar pró-labore alto só para atingir 28%?"
    a: "Na primeira faixa do Simples, quase sempre compensa, porque a diferença entre 6% e 15,5% supera o INSS e o IR do pró-labore. Em faturamentos maiores, a vantagem diminui e vale simular os dois anexos com os seus números."
sources:
  - title: Lei Complementar nº 123/2006, art. 18 e Anexos III e V (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm
  - title: Portal do Simples Nacional (Receita Federal)
    url: https://www8.receita.fazenda.gov.br/SimplesNacional/
  - title: Tabela de contribuição mensal 2026 (INSS)
    url: https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal
  - title: Tabelas do IRPF 2026 e redução mensal (Receita Federal)
    url: https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026
migratedFrom: https://blog.sejaconte.com.br/post/pj-tecnologia-pode-ser-simples-nacional-opcoes
---

Se você é dev PJ no Simples Nacional, a sua alíquota de imposto depende de uma conta chamada Fator R. Com ela acima de 28%, a primeira faixa custa 6% do faturamento. Abaixo disso, custa 15,5%. A diferença entre os dois cenários passa de R$ 1 mil por mês para quem fatura R$ 15 mil.

## Empresa de desenvolvimento de software pode ser Simples Nacional?

Pode. Desenvolvimento de software, consultoria em TI, suporte técnico e análise de sistemas são atividades permitidas no Simples Nacional, desde que a empresa seja ME ou EPP e respeite o limite de receita.

Os limites em 2026, pela [LC 123/2006](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm):

- **Microempresa (ME):** receita bruta de até R$ 360 mil por ano.
- **Empresa de pequeno porte (EPP):** até R$ 4,8 milhões por ano no mercado interno.
- **Exportação:** a LC 123 (art. 3º, § 14) permite mais R$ 4,8 milhões de receita de exportação, contados à parte.

Duas ressalvas. A primeira: dev não pode ser MEI. Os CNAEs de desenvolvimento e consultoria em TI não estão na lista de ocupações permitidas ao MEI, então quem abre como MEI para programar está irregular. A segunda: o CNAE e a descrição dos serviços na nota fiscal definem em qual anexo a sua receita entra. Escolher o código certo na abertura evita retrabalho depois.

## O que é o Fator R?

O Fator R é a razão entre a folha de salários e a receita bruta da empresa nos 12 meses anteriores ao mês de apuração. A LC 123 (art. 18, §§ 5º-J e 5º-M) manda tributar pelo Anexo III as atividades intelectuais listadas quando essa razão é igual ou maior que 28%, e pelo Anexo V quando fica abaixo.

```
Fator R = folha de salários dos últimos 12 meses ÷ receita bruta dos últimos 12 meses
```

Na folha entram salários, pró-labore, FGTS e contribuição patronal ao INSS. Distribuição de lucros e aluguéis não entram. Para o dev que trabalha sozinho, sem funcionários, a folha é o próprio pró-labore. A regra prática fica assim: **pró-labore mensal de pelo menos 28% do faturamento mensal médio**.

O cálculo é feito todo mês, com janela móvel de 12 meses. Se você reduzir o pró-labore em dezembro, o efeito aparece nas apurações seguintes.

## Qual a diferença entre o Anexo III e o Anexo V?

O Anexo III começa em 6% e o Anexo V em 15,5%. As duas tabelas têm seis faixas por receita bruta acumulada em 12 meses (RBT12), e a alíquota efetiva é calculada assim: (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12.

| Receita bruta em 12 meses | Anexo III: alíquota / dedução | Anexo V: alíquota / dedução |
|---|---|---|
| Até R$ 180 mil | 6% / R$ 0 | 15,5% / R$ 0 |
| R$ 180 mil a R$ 360 mil | 11,2% / R$ 9.360 | 18% / R$ 4.500 |
| R$ 360 mil a R$ 720 mil | 13,5% / R$ 17.640 | 19,5% / R$ 9.900 |
| R$ 720 mil a R$ 1,8 milhão | 16% / R$ 35.640 | 20,5% / R$ 17.100 |
| R$ 1,8 milhão a R$ 3,6 milhões | 21% / R$ 125.640 | 23% / R$ 62.100 |
| R$ 3,6 milhões a R$ 4,8 milhões | 33% / R$ 648.000 | 30,5% / R$ 540.000 |

Fonte: Anexos III e V da LC 123/2006, na redação da LC 155/2016.

Nos dois anexos a contribuição patronal ao INSS (CPP) já está dentro do DAS. Por isso a empresa do Simples não paga os 20% de INSS patronal sobre o pró-labore à parte, só retém os 11% do sócio.

## Quanto de pró-labore preciso para chegar a 28%? Exemplo com números de 2026

Para faturamento de R$ 15 mil por mês, o pró-labore mínimo é R$ 4.200 (28% de R$ 15 mil). Veja a conta completa de um dev que fatura R$ 15 mil por mês há 12 meses (RBT12 de R$ 180 mil, primeira faixa), com clientes no Brasil.

**Cenário A: Anexo III, com Fator R de 28%**

1. DAS: 6% × R$ 15.000 = **R$ 900**
2. Pró-labore: R$ 4.200
3. INSS do sócio: 11% × R$ 4.200 = **R$ 462**
4. IR sobre o pró-labore: **R$ 0**. Desde janeiro de 2026, a Lei 15.270/2025 zera o IR de quem tem rendimento tributável de até R$ 5 mil no mês.
5. Total de tributos: **R$ 1.362 por mês** (9,1% do faturamento)

**Cenário B: Anexo V, com pró-labore de um salário mínimo (R$ 1.621)**

1. DAS: 15,5% × R$ 15.000 = **R$ 2.325**
2. INSS do sócio: 11% × R$ 1.621 = **R$ 178,31**
3. IR sobre o pró-labore: **R$ 0**
4. Total de tributos: **R$ 2.503,31 por mês** (16,7% do faturamento)

A diferença é de R$ 1.141 por mês, cerca de R$ 13,7 mil por ano. E o pró-labore maior ainda conta para a sua aposentadoria pelo INSS.

| Faturamento mensal | Pró-labore mínimo (28%) | Anexo III: DAS + INSS + IR | Anexo V: DAS + INSS (pró-labore de R$ 1.621) |
|---|---|---|---|
| R$ 15 mil | R$ 4.200 | R$ 1.362 | R$ 2.503 |
| R$ 25 mil | R$ 7.000 | R$ 3.548 | R$ 4.303 |

Na linha de R$ 25 mil (RBT12 de R$ 300 mil, segunda faixa), o Anexo III tem alíquota efetiva de 8,08% e o V, de 16,5%. O pró-labore de R$ 7 mil já paga IR: R$ 804,52 pela tabela progressiva, menos R$ 46,61 do redutor, igual a R$ 757,91. A vantagem do Fator R cai para uns R$ 755 por mês. Ainda compensa, mas mostra por que vale refazer a conta a cada mudança de faixa. A [calculadora da Conte](https://sejaconte.com.br/calculadora) faz essa simulação com o seu faturamento.

## O Fator R muda para quem recebe do exterior?

A regra do Fator R é a mesma. A receita de exportação entra no denominador e o pró-labore precisa cobrir 28% do total. O que muda é o DAS: na exportação de serviços com ingresso de divisas, a LC 123 (art. 18, § 14) retira da alíquota a parcela de PIS, Cofins e ISS.

Na primeira faixa do Anexo III, IRPJ, CSLL e CPP somam 50,9% dos 6%. A alíquota efetiva sobre a receita de exportação fica perto de 3,05%. No Anexo V, a mesma conta dá cerca de 10,67%. Para emitir a nota certa e não perder esse benefício, veja o guia de [nota fiscal internacional](/post/nota-fiscal-internacional-erros-comuns-e-como-corrigir-rapido) e o post sobre [tributação de serviços para o exterior](/post/tributacao-servicos-para-exterior-o-que-muda).

![Profissional de tecnologia sentado em escritório com documentos sobre Simples Nacional](/images/posts/pj-tecnologia-pode-ser-simples-nacional-opcoes/tecnologia-escritorio-simples-nacional-874.webp)

## Quais erros mais tiram o dev do Anexo III?

Os erros que mais derrubam o Fator R são de calendário e de cadastro:

- **Empresa nova sem histórico de folha.** Nos primeiros meses, a LC 123 usa regras proporcionais para a receita e a folha. Comece o pró-labore no primeiro mês de faturamento.
- **Pró-labore que não acompanha o faturamento.** Fechou um contrato maior? A folha precisa subir junto, ou o Fator R cai nos meses seguintes.
- **Confundir pró-labore com distribuição de lucros.** Lucro distribuído não entra na folha. A diferença está explicada em [pró-labore, distribuição de lucros e salário](/post/diferenca-pro-labore-distribuicao-lucros-salario).
- **Pró-labore sem eSocial e DCTFWeb.** Se o pagamento não estiver declarado, a Receita não considera aquela folha.

## Quando o Simples deixa de ser a melhor opção?

O Simples com Fator R costuma ganhar até faixas intermediárias de faturamento. Acima disso, a alíquota efetiva do Anexo III sobe e o Lucro Presumido pode empatar ou passar na frente, a depender do ISS do seu município e de quanto você quer tirar de pró-labore. A comparação com números está em [Simples Nacional ou Lucro Presumido](/post/simples-nacional-ou-lucro-presumido-para-empresas-de-tecnologia).

Em 2027 entra mais uma variável: com a reforma tributária, a empresa do Simples que vende para outras empresas pode escolher recolher CBS e IBS fora do DAS para gerar crédito integral ao cliente. Se a sua dúvida é o momento de trocar de regime, o post sobre [quando mudar de regime tributário](/post/regimes-tributarios-quando-mudar-e-como-saber-hora-certa) mostra os prazos.
