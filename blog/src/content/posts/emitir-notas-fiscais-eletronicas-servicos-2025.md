---
title: 'Como emitir nota fiscal de serviço (NFS-e) em 2026: padrão nacional'
seoTitle: 'Como emitir NFS-e em 2026: guia do padrão nacional'
description: Em 2026 a NFS-e migra para o padrão nacional. Veja quem já é obrigado, o passo a passo no Emissor Nacional e as retenções que o cliente PJ pode fazer.
pubDate: '2025-09-29'
updatedDate: '2026-10-27'
category: contabilidade
tags: [nota-fiscal, simples-nacional, certificado-digital, cnpj]
author: solange-vaz
cover: /images/posts/emitir-notas-fiscais-eletronicas-servicos-2025/emissao-nota-fiscal-servicos-2025-250.webp
coverAlt: Pessoa usando computador para emitir nota fiscal eletrônica de serviços, com documentos e calculadora ao lado
tldr:
  - "Desde 1º de janeiro de 2026, todo município precisa permitir a emissão da NFS-e de padrão nacional ou compartilhar as notas do sistema próprio com o ambiente nacional (LC 214/2025, art. 62)."
  - "Para ME e EPP do Simples Nacional, o Emissor Nacional passa a ser obrigatório em 1º de novembro de 2026 (Resolução CGSN nº 191/2026). O MEI já emite por ele desde 2023."
  - "Para emitir, você entra no Emissor Nacional com gov.br ou certificado digital, informa tomador, código do serviço, valor e tributação do ISS, e baixa o XML e o PDF."
  - "Empresas do Lucro Presumido devem confirmar com a prefeitura se emitem no Emissor Nacional ou no sistema municipal integrado."
faq:
  - q: "Quem é obrigado a usar o Emissor Nacional da NFS-e?"
    a: "O MEI desde setembro de 2023 e as ME e EPP do Simples Nacional a partir de 1º de novembro de 2026. Para as demais empresas, depende do município: a LC 214/2025 obriga a prefeitura a aderir ao padrão nacional, mas ela pode manter sistema próprio desde que compartilhe as notas com o ambiente nacional."
  - q: "Preciso de certificado digital para emitir NFS-e?"
    a: "No Emissor Nacional, dá para acessar com a conta gov.br vinculada ao CNPJ ou com certificado digital. Integrações por API e alguns sistemas municipais exigem o e-CNPJ. Confira a regra da sua prefeitura antes de comprar."
  - q: "Emitir NFS-e no Emissor Nacional custa alguma coisa?"
    a: "O Emissor Nacional é gratuito. Os custos possíveis são o certificado digital, se você optar por ele, e os tributos sobre o serviço, que você paga no DAS ou nas guias do seu regime."
  - q: "Como emitir nota fiscal para cliente no exterior?"
    a: "É a mesma NFS-e, com o tomador identificado como residente no exterior, a tributação do ISS marcada como exportação de serviço e os dados da moeda estrangeira. No Simples, a receita também precisa ir para o campo de exportação do PGDAS-D."
  - q: "Posso cancelar uma NFS-e emitida errada?"
    a: "Pode, por cancelamento ou substituição, no prazo que o município define. A NFS-e não tem carta de correção. Fora do prazo, o pedido passa por análise fiscal da prefeitura."
sources:
  - title: Lei Complementar nº 214/2025, art. 62 (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm
  - title: Portal Nacional da NFS-e (gov.br)
    url: https://www.gov.br/nfse/pt-br
  - title: NFS-e para MEI e demais empresas (gov.br)
    url: https://www.gov.br/nfse/pt-br/mei-e-demais-empresas
  - title: CRC-SP, Resolução CGSN nº 191/2026 e a NFS-e nacional no Simples
    url: https://online.crcsp.org.br/portal/noticias/noticia.asp?c=11276
  - title: Lei Complementar nº 116/2003 (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm
migratedFrom: https://blog.sejaconte.com.br/post/emitir-notas-fiscais-eletronicas-servicos-2025
---

Até 2025, cada prefeitura tinha o próprio sistema de nota fiscal de serviço, com login, campos e regras diferentes. Em 2026 isso começou a mudar de vez: a NFS-e de padrão nacional virou regra para os municípios, e as empresas do Simples Nacional passam a emitir pelo Emissor Nacional em novembro. Este guia mostra o que já é certo, o que depende da sua cidade e como emitir a primeira nota.

## O que mudou na NFS-e em 2026?

A NFS-e passou a ter um leiaute nacional único. Desde 1º de janeiro de 2026, a [LC 214/2025](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm) (art. 62) obriga os municípios a permitir que os contribuintes emitam a NFS-e de padrão nacional no ambiente nacional ou, se mantiverem emissor próprio, a compartilhar as notas com esse ambiente. A prefeitura que não cumprir fica sem transferências voluntárias da União.

Para quem emite nota, as mudanças práticas são:

- **Um formulário só.** Os campos e códigos seguem o padrão nacional, seja qual for a cidade.
- **Emissor Nacional gratuito.** Pelo site ou por API, com acesso via gov.br ou certificado digital.
- **Prazo para o Simples.** ME e EPP do Simples Nacional passam a emitir obrigatoriamente pelo Emissor Nacional a partir de 1º de novembro de 2026. A Resolução CGSN nº 191/2026 adiou a data, que antes era 1º de setembro.
- **Campos da reforma tributária.** O leiaute já tem notas técnicas para CBS e IBS. Para empresas do Simples, essas informações passam a valer em 1º de janeiro de 2027.

## Quem precisa emitir pelo Emissor Nacional?

Depende do porte e do regime. O MEI e a empresa do Simples têm data definida. Para as demais, a regra vem da prefeitura.

| Quem | Onde emite a NFS-e em 2026 | Desde quando |
|---|---|---|
| MEI | Emissor Nacional | Setembro de 2023 |
| ME e EPP do Simples Nacional | Emissor Nacional (site ou API) | 1º de novembro de 2026 |
| Lucro Presumido ou Real | Emissor Nacional ou sistema municipal integrado, conforme decreto da prefeitura | Conforme o município |

Várias prefeituras já tornaram o Emissor Nacional exclusivo para todos os prestadores desde janeiro de 2026. Outras mantêm sistema próprio integrado ao ambiente nacional. Antes da primeira nota, consulte o site da prefeitura ou o painel de adesões no portal da NFS-e para saber a regra da sua cidade.

## Como emitir NFS-e no Emissor Nacional, passo a passo?

O processo leva poucos minutos depois do primeiro acesso. Você preenche uma declaração de prestação de serviço (DPS), e o sistema gera a NFS-e a partir dela.

1. **Acesse o Emissor Nacional** pelo portal da NFS-e, com a conta gov.br vinculada ao CNPJ ou com o certificado digital da empresa. No primeiro acesso, o sistema confere o cadastro do CNPJ no município.
2. **Cadastre o tomador.** Para cliente brasileiro, basta o CNPJ ou CPF. Para cliente no exterior, informe nome, endereço, país e o número fiscal estrangeiro (NIF).
3. **Escolha o serviço.** Selecione o item da lista da [LC 116/2003](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm) e o código de tributação nacional que descrevem o seu trabalho. Para devs, os mais comuns são 1.01 (análise e desenvolvimento de sistemas), 1.03 (processamento e hospedagem de dados) e 1.07 (suporte técnico em informática). O código precisa combinar com o CNAE da empresa.
4. **Descreva o serviço.** Escreva o que foi entregue, o período e o contrato. Descrição genérica atrapalha numa fiscalização.
5. **Informe o valor e a tributação do ISS.** Para serviço no Brasil, marque operação tributável. Para cliente no exterior, marque exportação de serviço. Se você é do Simples, o sistema identifica a opção pelo regime.
6. **Confira as retenções.** Se o tomador for obrigado a reter ISS, IR ou contribuições, preencha os campos de retenção (veja a próxima seção).
7. **Emita e guarde.** Baixe o XML e o PDF, envie ao cliente e arquive o XML por, no mínimo, cinco anos.

A nota emitida não encerra o trabalho. No fim do mês, a receita precisa entrar na apuração do seu regime (PGDAS-D no Simples), com exportações separadas da receita comum.

![Pessoa sentada ao computador digitando dados em sistema de nota fiscal eletrônica](/images/posts/emitir-notas-fiscais-eletronicas-servicos-2025/emissao-nota-servico-online-426.webp)

## Meu cliente PJ vai reter imposto da nota?

Depende do seu regime. Se a sua empresa está no Simples Nacional, o cliente não retém IR, PIS, Cofins e CSLL; a nota identifica você como optante. Se está no Lucro Presumido, o cliente PJ costuma reter 1,5% de IR e 4,65% de PIS, Cofins e CSLL sobre serviços profissionais como programação e análise de sistemas.

O ISS pode ser retido pelo tomador em casos que a LC 116 e a lei municipal definem, principalmente quando o tomador está em outra cidade e o serviço tem ISS devido no local da prestação. Para análise e desenvolvimento de sistemas (item 1.01), a regra geral é o ISS devido no município do prestador. Na dúvida, siga a orientação do contador antes de aceitar uma retenção que reduz o valor que você recebe. O post sobre [impostos federais, estaduais e municipais da PJ](/post/diferencas-impostos-federais-estaduais-municipais-pj) explica quem cobra cada tributo.

## Quais erros mais travam a emissão da NFS-e?

Os erros que mais aparecem são cadastro desatualizado do CNPJ na prefeitura, código de serviço que não combina com o CNAE e tributação do ISS errada.

- **CNPJ sem inscrição municipal ativa.** O Emissor Nacional recusa a emissão se o município não reconhecer o cadastro. Resolva com a prefeitura antes do primeiro faturamento.
- **Código de serviço incompatível com o CNAE.** A nota pode ser rejeitada ou questionada depois. Revise os dois juntos ao abrir a empresa.
- **Exportação marcada como operação tributável.** Você paga ISS que não devia. O guia de [nota fiscal de exportação de serviço](/post/nota-fiscal-internacional-erros-comuns-e-como-corrigir-rapido) detalha os campos.
- **Nota emitida no mês errado.** No Simples, o padrão é o regime de competência: a receita conta no mês em que você prestou e faturou o serviço. Nota de outubro emitida em novembro desloca o faturamento e pode mudar a faixa.

Se errar, a correção é por cancelamento ou substituição da nota, no prazo do município. O passo a passo está em [erro em nota fiscal: como regularizar](/post/erro-em-nota-fiscal-como-regularizar-e-evitar-multas).

## O que verificar antes da primeira nota pelo padrão nacional?

Confira quatro pontos antes de emitir: acesso, cadastro, código e regime.

- **Acesso:** a conta gov.br do responsável vinculada ao CNPJ, ou um certificado digital válido. O guia de [como escolher certificado digital](/post/como-escolher-certificado-digital-ideal-empresa-2026) ajuda se você for comprar um.
- **Cadastro municipal:** inscrição ativa e atividades iguais às do CNPJ.
- **Código de serviço:** o item da LC 116 que descreve o seu trabalho, alinhado ao CNAE.
- **Regime:** se você é do Simples, confirme que a opção aparece no Emissor Nacional, porque ela define as retenções.

Quem ainda emite por sistema municipal tem até 31 de outubro de 2026, no caso do Simples, para testar o Emissor Nacional. Emita uma nota de teste com o contador antes da virada, para não descobrir um bloqueio no dia de faturar.

Se quiser apoio nessa transição, a [Conte](https://sejaconte.com.br) acompanha a emissão das primeiras notas com você.
