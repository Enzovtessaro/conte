---
title: 'Nota fiscal de exportação de serviço: passo a passo e erros comuns'
seoTitle: 'Nota fiscal de exportação de serviço: erros e correção'
description: Como emitir NFS-e para cliente no exterior no Emissor Nacional, os erros que fazem você pagar ISS sem dever e como cancelar ou substituir a nota errada.
pubDate: '2025-10-08'
updatedDate: '2026-10-27'
category: tributacao
tags: [nota-fiscal, exportacao-de-servicos, simples-nacional]
author: solange-vaz
cover: /images/posts/nota-fiscal-internacional-erros-comuns-e-como-corrigir-rapido/notafiscal-internacional-empresa-computador-833.webp
coverAlt: Mesa com computador, documentos fiscais internacionais e mão segurando caneta para correção de nota fiscal
tldr:
  - "Para cliente no exterior você emite uma NFS-e comum, com o tomador identificado como estrangeiro (país e, se houver, o NIF) e a tributação do ISS marcada como exportação de serviço."
  - "O ISS não incide sobre exportação de serviço, salvo quando o resultado do trabalho se verifica no Brasil (LC 116/2003, art. 2º)."
  - "A partir de 1º de novembro de 2026, ME e EPP do Simples Nacional emitem NFS-e pelo padrão nacional (Resolução CGSN nº 191/2026)."
  - "Nota errada se corrige por cancelamento ou substituição, no prazo que o seu município define; a NFS-e não tem carta de correção."
faq:
  - q: "Precisa de CFOP na nota de exportação de serviço?"
    a: "Não. CFOP é código de operações com mercadorias, usado na NF-e e no ICMS. Na NFS-e de serviço você informa o código do serviço da lista da LC 116 e o código de tributação nacional, além de marcar a operação como exportação."
  - q: "O cliente estrangeiro precisa ter CNPJ?"
    a: "Não. Você informa nome, endereço e país do cliente e, quando ele tiver, o número de identificação fiscal do país dele (NIF, como o EIN nos EUA). Se não houver NIF, o Emissor Nacional pede o motivo da ausência."
  - q: "A nota de exportação sai em dólar ou em real?"
    a: "O valor do serviço fica em reais, e a nota tem campos para a moeda e o valor na moeda estrangeira. Use a PTAX do Banco Central e o mesmo critério de data todo mês, para a nota bater com a contabilidade."
  - q: "Emiti como operação tributável e paguei ISS. Dá para recuperar?"
    a: "Dá. Substitua ou cancele a nota no prazo do município, retifique o PGDAS-D do mês informando a receita como exportação e peça a restituição ou compensação do valor pago a mais no Portal do Simples Nacional."
  - q: "Tenho prazo para cancelar NFS-e?"
    a: "Tem, e quem define é o município. Há prefeituras que aceitam cancelamento livre por poucos dias e outras que mandam o pedido para análise fiscal acima de certo valor. Fora do prazo, o pedido vira processo na prefeitura."
sources:
  - title: Lei Complementar nº 116/2003, art. 2º e lista de serviços (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm
  - title: Portal Nacional da NFS-e (gov.br)
    url: https://www.gov.br/nfse/pt-br
  - title: Lei Complementar nº 123/2006, art. 18 §4º-A e §14 (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm
  - title: CRC-SP, Resolução CGSN nº 191/2026 e a NFS-e nacional no Simples
    url: https://online.crcsp.org.br/portal/noticias/noticia.asp?c=11276
migratedFrom: https://blog.sejaconte.com.br/post/nota-fiscal-internacional-erros-comuns-e-como-corrigir-rapido
---

"Nota fiscal internacional" é como muita gente chama a nota que a PJ emite para um cliente no exterior. Para quem presta serviço, ela não tem nada de alfândega, CFOP ou despacho aduaneiro: é uma NFS-e comum, com dois ajustes. O tomador aparece como estrangeiro e o ISS fica marcado como exportação. Errar um desses dois campos custa dinheiro todo mês.

## Que nota fiscal emitir para cliente no exterior?

Você emite a NFS-e (nota fiscal de serviço eletrônica) do seu município ou do Emissor Nacional, a mesma que usaria para um cliente brasileiro. O que muda é o preenchimento: tomador no exterior, tributação do ISS como exportação de serviço e os dados da moeda estrangeira.

A partir de 1º de novembro de 2026, as ME e EPP do Simples Nacional passam a emitir NFS-e pelo padrão nacional, pelo site do Emissor Nacional ou por API, conforme a Resolução CGSN nº 191/2026. O MEI já usa o Emissor Nacional desde 2023. Se a sua empresa está no Lucro Presumido, confira na prefeitura se o município já migrou para o padrão nacional ou mantém sistema próprio.

A base legal da isenção é a [LC 116/2003](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm): o ISS não incide sobre exportação de serviços (art. 2º, I), exceto quando o serviço é desenvolvido no Brasil e o resultado aqui se verifica (parágrafo único). No Simples, a mesma receita também fica livre de PIS e Cofins, desde que você a informe como exportação no PGDAS-D ([LC 123](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm), art. 18, §14). O guia sobre [imposto ao prestar serviço para o exterior](/post/tributacao-servicos-para-exterior-o-que-muda) mostra quanto isso reduz o DAS.

## Como emitir a NFS-e de exportação, passo a passo?

O roteiro abaixo segue o Emissor Nacional. Sistemas municipais pedem as mesmas informações com nomes de campo diferentes.

1. **Entre no Emissor Nacional** com a conta gov.br vinculada ao CNPJ ou com o certificado digital da empresa.
2. **Identifique o tomador como residente no exterior.** Informe nome da empresa, endereço completo e país. Preencha o NIF, o número fiscal do país do cliente (EIN nos EUA, VAT na Europa). Sem NIF, selecione o motivo da ausência.
3. **Escolha o código do serviço.** Use o item da lista da LC 116 que descreve o seu trabalho, como 1.01 (análise e desenvolvimento de sistemas) ou 1.07 (suporte técnico em informática), e o código de tributação nacional correspondente. O código precisa bater com o CNAE da empresa.
4. **Marque a tributação do ISS como exportação de serviço.** O campo tem as opções operação tributável, imunidade, exportação de serviço e não incidência. Com exportação marcada, a nota não leva alíquota de ISS nem retenção.
5. **Preencha os dados de comércio exterior.** Informe o modo de prestação (para quem trabalha remoto do Brasil, transfronteiriço), a moeda pelo código ISO 4217 (dólar é 840, euro é 978) e o valor na moeda estrangeira.
6. **Informe o valor em reais.** Converta pela PTAX do Banco Central, com o mesmo critério de data em todas as notas.
7. **Descreva o serviço com detalhe.** Escreva o que foi feito, o período, o número do contrato ou invoice e o valor em moeda estrangeira, por exemplo: "Desenvolvimento de software, outubro/2026, contrato 2026-03, US$ 2.500,00".
8. **Emita, baixe o XML e o PDF** e envie o PDF ao cliente junto com a invoice em inglês, se ele pedir.

No fechamento do mês, a receita dessa nota vai para o campo de exportação do PGDAS-D. Nota certa com DAS calculado como receita comum continua cobrando PIS, Cofins e ISS.

![Homem digitando atento em uma tela mostrando campos de nota fiscal](/images/posts/nota-fiscal-internacional-erros-comuns-e-como-corrigir-rapido/nota-fiscal-internacional-erros-216.webp)

## Quais são os erros mais comuns na nota de exportação de serviço?

O erro mais caro é emitir a nota como operação tributável: a prefeitura cobra ISS que você não devia. Os outros erros costumam travar a emissão ou deixar a isenção sem prova.

| Erro | O que acontece | Como evitar |
|---|---|---|
| ISS marcado como operação tributável | ISS cobrado sobre receita que deveria ser isenta | Marque "exportação de serviço" na tributação do ISSQN |
| Tomador cadastrado com endereço no Brasil | A nota vira serviço nacional, com ISS e retenções | Cadastre o país do cliente e o NIF |
| Receita lançada como comum no PGDAS-D | DAS com PIS, Cofins e ISS embutidos | Segregue a receita como exportação na apuração |
| Valor em dólar digitado no campo de reais | Faturamento subestimado e DAS errado | Converta pela PTAX e use o campo de moeda estrangeira |
| Código de serviço que não bate com o CNAE | Rejeição da nota ou questionamento da prefeitura | Revise CNAE e item da LC 116 juntos |
| Exportação marcada quando o resultado fica no Brasil | Isenção indevida, com cobrança de ISS depois | Aplique o teste do resultado (LC 116, art. 2º, parágrafo único) |
| Descrição genérica ("serviços prestados") | Fica difícil provar exportação numa fiscalização | Cite contrato, período e moeda |

Um caso merece atenção: o cliente estrangeiro que paga por trabalho feito para a filial brasileira dele. O dinheiro vem de fora, mas o resultado acontece aqui, e a LC 116 manda tributar. Nesse caso, a nota sai com ISS.

## Como corrigir uma nota de exportação emitida errada?

A NFS-e não tem carta de correção como a NF-e de mercadorias. Você corrige por cancelamento ou por substituição, dentro do prazo e das regras que o município do emissor definir.

O caminho depende do momento:

1. **Dentro do prazo de cancelamento:** cancele a nota no Emissor Nacional ou no sistema da prefeitura e emita uma nova, correta.
2. **Quando o sistema permitir substituição:** emita a nota substituta apontando a original. O sistema cancela a anterior e mantém o vínculo entre as duas, o que facilita explicar a mudança numa fiscalização.
3. **Fora do prazo ou acima do valor que a prefeitura libera:** faça o pedido de cancelamento com análise fiscal. Em Porto Alegre, por exemplo, notas acima de R$ 100 mil seguem para análise antes do cancelamento. Junte contrato, invoice e contrato de câmbio.
4. **Se o DAS já foi pago com o valor errado:** retifique o PGDAS-D do mês, informando a receita como exportação. O valor pago a mais pode ser restituído ou compensado pelo Portal do Simples Nacional.

Se o erro foi só na descrição e não mexe em valor, tomador ou tributação, pergunte ao contador se compensa substituir. Mudanças em valor, tomador ou ISS sempre pedem nota nova. Para erros em notas de clientes brasileiros, veja [erro em nota fiscal: como regularizar e evitar multas](/post/erro-em-nota-fiscal-como-regularizar-e-evitar-multas).

## Que documentos guardar junto com a nota?

Guarde, para cada nota de exportação, o contrato ou a ordem de serviço com o cliente, a invoice e o contrato de câmbio do recebimento. Esses três papéis provam que o cliente está fora, que o dinheiro entrou no Brasil e que o resultado foi lá.

Organize por mês, em uma pasta por cliente, e mantenha o XML da nota. O prazo de guarda segue o prazo de decadência dos tributos, de cinco anos, e o ideal é ter tudo acessível sem depender da plataforma de pagamento. O guia de [documentos essenciais para controlar a PJ de TI](/post/documentos-essenciais-para-controlar-pj-ti-sem-erros) traz a lista completa.

## O que muda na nota a partir de 2027?

A reforma tributária leva CBS e IBS para a nota fiscal. Para as empresas do Simples, essas informações passam a valer em 1º de janeiro de 2027, e o leiaute nacional da NFS-e já tem notas técnicas publicadas com os campos novos.

A exportação de serviço continua desonerada de CBS e IBS. Você vai continuar marcando a operação como exportação, agora com mais campos que mostram ao fisco por que ela não paga tributo. Se você emite pelo Emissor Nacional, as mudanças chegam no próprio formulário. Quem emite por API ou ERP precisa acompanhar as versões do leiaute no portal da NFS-e.

Se preferir ter alguém revisando as primeiras notas de exportação com você, a [Conte](https://sejaconte.com.br) faz esse acompanhamento.
