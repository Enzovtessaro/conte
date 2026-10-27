---
title: "Contrato de serviço recorrente PJ: mensalidade, horas e reajuste"
seoTitle: "Contrato de serviço recorrente PJ: modelo de cláusulas"
description: "Como montar o contrato de serviço recorrente da PJ: escopo mensal, banco de horas, SLA, reajuste anual pelo IPCA, nota fiscal, retenções e regras de saída."
pubDate: '2025-11-18'
updatedDate: '2026-10-27'
category: prestacao-de-servico
author: solange-vaz
cover: /images/posts/contrato-servicos-recorrentes-pj/contrato-servicos-recorrentes-escritorio-264.webp
coverAlt: Documento de contrato de prestação de serviços sobre mesa com laptop, caneta e mãos revisando o papel
tags: [contratos, nota-fiscal, fluxo-de-caixa, simples-nacional]
tldr:
  - "Contrato de serviço recorrente é o acordo de prestação contínua com pagamento periódico, em geral mensal. Além das cláusulas comuns, ele precisa de escopo mensal, regra para horas excedentes, SLA, reajuste e renovação."
  - "O reajuste só pode ser anual: a Lei 10.192/2001, art. 2º, § 1º, anula cláusula de correção com periodicidade menor que um ano. Fixe o índice (IPCA ou IGP-M) e a data-base."
  - "A prestação de serviço tem prazo máximo de 4 anos (Código Civil, art. 598) e, sem prazo definido, pode ser encerrada com 8 dias de aviso quando o pagamento é mensal (art. 599)."
  - "Se a sua PJ é do Simples Nacional, o cliente não retém IR nem PIS, Cofins e CSLL sobre a nota. No Lucro Presumido, a retenção pode chegar a 6,15% (1,5% de IRRF e 4,65% de PIS, Cofins e CSLL)."
faq:
  - q: "Contrato de prestação de serviço mensal pode ter renovação automática?"
    a: "Pode. Escreva que o contrato renova por igual período se nenhuma parte avisar o contrário com antecedência definida, por exemplo 30 dias antes do fim. Respeite o limite de 4 anos do art. 598 do Código Civil e assine um novo contrato ao fim desse período."
  - q: "Posso reajustar o contrato a cada seis meses?"
    a: "Não, se o reajuste for por índice de inflação. A Lei 10.192/2001 considera nula a cláusula de reajuste com periodicidade inferior a um ano. Mudança de escopo, com novo preço, pode ser feita por aditivo a qualquer momento."
  - q: "Preciso emitir uma nota fiscal por mês no contrato recorrente?"
    a: "Sim, uma nota por mês de serviço prestado, com a competência correta. A nota define o mês da receita no Simples e é o documento que o cliente usa para pagar."
  - q: "O que fazer com as horas não usadas no mês?"
    a: "Depende do contrato. As opções mais comuns são as horas expirarem no fim do mês ou acumularem por um mês. Escreva a regra: horas que acumulam sem limite viram uma dívida de trabalho difícil de controlar."
sources:
  - title: Lei nº 10.192/2001, art. 2º, periodicidade do reajuste (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10192.htm
  - title: Código Civil, Lei nº 10.406/2002, arts. 593 a 609 (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm
  - title: Lei nº 10.833/2003, arts. 30 a 32, retenção de PIS, Cofins e CSLL (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/2003/l10.833.htm
migratedFrom: https://blog.sejaconte.com.br/post/contrato-servicos-recorrentes-pj
---

Contrato de serviço recorrente é o acordo em que a sua PJ presta um serviço contínuo e recebe uma mensalidade: manutenção de sistema, sustentação de produto, consultoria mensal, alocação parcial em um time. Ele segue as regras gerais do contrato de prestação de serviço, mas precisa resolver questões que um contrato de projeto não tem: o que cabe na mensalidade, o que acontece com hora extra, como o preço sobe a cada ano e como as partes saem.

## O que diferencia um contrato recorrente de um contrato de projeto?

O contrato de projeto termina na entrega. O recorrente continua até alguém encerrar, então precisa de regras para o mês a mês. As cláusulas gerais (partes, propriedade intelectual, confidencialidade, foro) estão no [guia de contratos para PJ tech](/post/guia-contratos-prestadores-servico-pj-tech). Aqui ficam as específicas da recorrência.

| Tema | Contrato de projeto | Contrato recorrente |
|---|---|---|
| Preço | Valor fechado ou por etapa | Mensalidade fixa ou banco de horas |
| Escopo | Entregáveis definidos | Atividades do mês e limite de volume |
| Prazo | Até a entrega | Determinado com renovação, ou indeterminado |
| Reajuste | Raro | Anual, por índice |
| Saída | Na entrega ou por rescisão | Aviso prévio |
| Nota fiscal | Por etapa ou na entrega | Mensal |

## Quais cláusulas um contrato recorrente precisa ter?

Cinco cláusulas fazem a diferença: escopo mensal, horas excedentes, nível de serviço, reajuste e saída. Sem elas, a mensalidade vira um cheque em branco para o cliente pedir qualquer coisa.

1. **Escopo mensal.** Liste as atividades incluídas (correções, deploy, monitoramento, reuniões) e o limite de volume, em horas ou em tickets.
2. **Horas excedentes.** Defina o preço da hora extra, se ela precisa de aprovação prévia por escrito e como é faturada.
3. **Nível de serviço (SLA).** Janela de atendimento, prazo de resposta por gravidade e o que não é coberto (fim de semana, incidente causado por terceiros).
4. **Reajuste.** Índice, data-base e fórmula. Detalhes na próxima seção.
5. **Prazo, renovação e saída.** Prazo inicial, renovação automática e aviso prévio.

### Exemplo de banco de horas

Contrato de R$ 12.000 por mês com 80 horas incluídas:

- Valor da hora incluída: R$ 12.000 / 80 = R$ 150.
- Hora excedente: R$ 180, mediante aprovação por e-mail.
- Mês em que o cliente pede 92 horas: R$ 12.000 + 12 x R$ 180 = R$ 14.160.
- Horas não usadas: acumulam por um mês e depois expiram.

Escreva também o que conta como hora: reunião, deslocamento e tempo de espera por acesso entram ou não? Esse detalhe gera mais discussão do que o preço.

![Pessoa assinando contrato de prestação de serviços em mesa de escritório moderna](/images/posts/contrato-servicos-recorrentes-pj/assinatura-contrato-servicos-pj-551.webp)

## Como funciona o reajuste anual do contrato?

O reajuste por índice só pode acontecer uma vez por ano. A [Lei 10.192/2001](https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10192.htm), art. 2º, permite a correção em contratos de um ano ou mais e diz, no § 1º, que é nula a cláusula de reajuste com periodicidade inferior a um ano.

Escreva três coisas:

- **Índice.** IPCA, calculado pelo IBGE, é o mais usado. O IGP-M, da FGV, oscila mais. Escolha um e indique um substituto caso ele deixe de existir.
- **Data-base.** Aniversário do contrato, por exemplo todo 1º de março.
- **Fórmula.** Valor novo = valor atual x (1 + variação acumulada do índice nos 12 meses anteriores à data-base).

Exemplo com um IPCA hipotético de 4,5% em 12 meses: R$ 8.000 x 1,045 = R$ 8.360 a partir da data-base. Se o índice for negativo, defina se o valor fica igual ou cai.

Reajuste não impede renegociação. Se o escopo cresceu, proponha um aditivo com novo preço. O post sobre [negociar honorários sem perder contratos](/post/negociar-honorarios-servicos-pj-sem-perder-contratos) ajuda a preparar essa conversa.

## Como funcionam nota fiscal e retenções no contrato mensal?

Emita uma nota fiscal por mês, com a competência do mês em que o serviço foi prestado. A nota define em que mês a receita entra no cálculo do Simples, e o DAS dessa receita vence no dia 20 do mês seguinte. O post sobre [emitir notas fiscais de serviço](/post/emitir-notas-fiscais-eletronicas-servicos-2025) mostra o passo a passo.

O cliente pode ser obrigado a reter impostos na fonte, dependendo do regime da sua PJ:

| Regime da sua PJ | IRRF (1,5%) | PIS, Cofins e CSLL (4,65%) | ISS |
|---|---|---|---|
| Simples Nacional | Dispensado | Dispensado (Lei 10.833/2003, art. 32) | Depende do município |
| Lucro Presumido | Retido pelo cliente PJ | Retido pelo cliente PJ (art. 30) | Depende do município |

No Lucro Presumido, uma nota de R$ 10.000 pode chegar com R$ 615 a menos (R$ 150 de IRRF e R$ 465 de PIS, Cofins e CSLL). Os valores retidos são compensados nos impostos da sua empresa, mas o dinheiro só entra no caixa depois. Retenção abaixo de R$ 10 é dispensada. Se você é do Simples, informe na nota que é optante, para o cliente não reter por engano.

## Como encerrar ou renovar um contrato recorrente?

Pelo que estiver escrito. O Código Civil limita a prestação de serviço a 4 anos (art. 598) e, quando o contrato não tem prazo, permite que qualquer parte saia com 8 dias de aviso se o pagamento é mensal (art. 599). Para quem vive da mensalidade, 8 dias é pouco tempo para achar outro cliente.

Uma cláusula de saída equilibrada tem:

- **Aviso prévio de 30 a 60 dias** para as duas partes, com serviço e pagamento normais nesse período.
- **Renovação automática** por 12 meses, salvo aviso contrário com 30 dias de antecedência.
- **Transição.** Entrega de acessos, documentação e repasse do conhecimento, com horas de transição pagas à parte se passarem do escopo.
- **Rescisão por inadimplência.** Direito de suspender o serviço após um número de dias de atraso, depois de notificação por escrito.

Em contrato com prazo determinado, se o cliente encerra sem justa causa antes do fim, o art. 603 do Código Civil garante ao prestador o valor vencido e metade do que receberia até o termo. Muitos contratos substituem essa regra por uma multa fixa, como uma mensalidade. Escolha a regra e escreva.

## Que erros aparecem com frequência em contratos recorrentes?

Os mais comuns são escopo aberto, falta de reajuste e ausência de aviso prévio:

- "Suporte e manutenção do sistema", sem limite de horas ou de tickets.
- Preço igual há três anos porque ninguém escreveu o índice.
- Contrato sem prazo e sem aviso prévio, que pode acabar em 8 dias.
- Alterações combinadas por mensagem e nunca formalizadas em aditivo.
- Nota fiscal emitida com a data errada, deslocando a receita de mês.

![Profissionais negociando detalhes de contrato de serviços em escritório](/images/posts/contrato-servicos-recorrentes-pj/negociacao-contrato-servicos-pj-901.webp)

Contrato recorrente bem escrito deixa a receita previsível, e receita previsível facilita planejar impostos e reserva. O post sobre [fluxo de caixa da PJ em planilha](/post/organizar-fluxo-caixa-pj-planilhas) mostra como projetar os 12 meses a partir dos contratos. Se quiser calcular quanto da mensalidade fica com você depois dos impostos, use a [calculadora da Conte](https://sejaconte.com.br/calculadora).
