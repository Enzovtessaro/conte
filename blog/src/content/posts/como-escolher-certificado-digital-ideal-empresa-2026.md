---
title: "Certificado digital para empresa: A1 ou A3, qual escolher em 2026"
seoTitle: "Certificado digital A1 ou A3: qual a PJ precisa em 2026"
description: "A1 vale 1 ano e fica no computador; A3 vale de 1 a 5 anos em token, cartão ou nuvem. Veja quando a PJ tech precisa de e-CNPJ e qual tipo escolher."
pubDate: '2025-11-11'
updatedDate: '2026-10-27'
category: certificacao
tags: [certificado-digital, cnpj]
author: solange-vaz
cover: /images/posts/como-escolher-certificado-digital-ideal-empresa-2026/certificado-digital-empresarial-866.webp
coverAlt: Computador moderno exibindo tela com certificado digital em área de trabalho organizada
tldr:
  - "Certificado digital é uma identidade eletrônica emitida dentro da ICP-Brasil, com validade jurídica de assinatura (MP 2.200-2/2001)."
  - "Segundo o ITI, o A1 fica no computador ou no celular e vale 1 ano; o A3 fica em cartão, token ou nuvem e vale de 1 a 5 anos."
  - "Para a PJ tech de um sócio no Simples Nacional, a conta gov.br prata ou ouro já resolve boa parte dos acessos à Receita. O e-CNPJ passa a ser necessário para ECD e ECF, para várias prefeituras e para automatizar emissão de notas."
  - "Quem usa sistema de emissão ou contador com acesso automatizado costuma precisar do A1; quem só assina eventualmente pode ficar com o A3 em nuvem."
faq:
  - q: "Qual a diferença entre certificado A1 e A3?"
    a: "O A1 é um arquivo instalado no computador ou no celular e vale 1 ano. O A3 fica em cartão, token ou em um servidor seguro na nuvem e pode valer de 1 a 5 anos. Os dois têm a mesma validade jurídica dentro da ICP-Brasil."
  - q: "Empresa do Simples Nacional é obrigada a ter certificado digital?"
    a: "Não há obrigação geral para toda empresa do Simples. Muitos serviços da Receita aceitam a conta gov.br do responsável legal ou o código de acesso do Simples. Mas algumas prefeituras, sistemas de emissão e declarações como ECD e ECF exigem o e-CNPJ."
  - q: "Qual a diferença entre e-CPF e e-CNPJ?"
    a: "O e-CPF identifica a pessoa física e o e-CNPJ identifica a empresa, vinculado ao seu responsável legal. Para assinar declarações da empresa e emitir notas por sistema, use o e-CNPJ."
  - q: "Onde comprar certificado digital?"
    a: "Em uma Autoridade Certificadora credenciada na ICP-Brasil, cuja lista o ITI publica. A AC define preço, forma de pagamento e documentos, e a validação da identidade pode ser presencial ou por videoconferência."
  - q: "Contrato com cliente precisa ser assinado com certificado digital?"
    a: "Entre empresas privadas, não necessariamente. Plataformas de assinatura eletrônica valem quando as partes aceitam o método. O certificado ICP-Brasil dá a assinatura qualificada, exigida em alguns atos perante órgãos públicos."
sources:
  - title: Certificado digital, tipos e validade (ITI, gov.br)
    url: https://www.gov.br/iti/pt-br/assuntos/certificado-digital
  - title: Medida Provisória nº 2.200-2/2001, ICP-Brasil (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/mpv/antigas_2001/2200-2.htm
  - title: Decreto nº 10.278/2020, digitalização de documentos (Planalto)
    url: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10278.htm
  - title: Portal da NFS-e Nacional (gov.br)
    url: https://www.gov.br/nfse/pt-br
migratedFrom: https://blog.sejaconte.com.br/post/como-escolher-certificado-digital-ideal-empresa-2026
---

Certificado digital é a identidade eletrônica da empresa (e-CNPJ) ou da pessoa (e-CPF), emitida por uma Autoridade Certificadora da ICP-Brasil. A [MP 2.200-2/2001](https://www.planalto.gov.br/ccivil_03/mpv/antigas_2001/2200-2.htm) dá aos documentos assinados com ele presunção de autenticidade e integridade. Na rotina da PJ tech, ele serve para assinar declarações, emitir nota fiscal por sistema e acessar portais que não aceitam login gov.br.

## Quais são os tipos de certificado digital?

Os dois mais vendidos são o A1 e o A3. Segundo o [ITI](https://www.gov.br/iti/pt-br/assuntos/certificado-digital), autarquia que mantém a ICP-Brasil, a diferença está em onde a chave fica guardada e por quanto tempo vale.

| | A1 | A3 |
|---|---|---|
| Onde fica | Arquivo no computador, celular ou servidor | Cartão, token USB ou nuvem (HSM remoto) |
| Validade | 1 ano | 1 a 5 anos |
| Uso em vários computadores | Sim, copiando o arquivo | Só com o token na mão ou com o acesso à nuvem |
| Automação (emissor de notas, ERP, contador) | Funciona bem | Limitada no token; depende do provedor na nuvem |
| Risco principal | Cópia indevida do arquivo e da senha | Perda ou dano do dispositivo |

O A3 em nuvem resolve o problema do token físico: você assina pelo celular ou pelo navegador, sem dispositivo USB. Vale perguntar à Autoridade Certificadora se o sistema que você usa aceita esse formato antes de comprar.

## A PJ tech precisa mesmo de certificado digital?

Depende do regime e de quem emite as notas. Para um dev com empresa de um sócio no Simples Nacional, a conta gov.br do responsável legal, com nível prata ou ouro, já dá acesso ao e-CAC, à DCTFWeb e ao emissor nacional de NFS-e. O Portal do Simples aceita ainda o código de acesso.

O certificado passa a ser necessário quando:

- a empresa está no Lucro Presumido e entrega ECD e ECF, que exigem assinatura com certificado ICP-Brasil;
- a prefeitura do seu município ainda exige e-CNPJ no emissor próprio de nota;
- você usa um sistema de emissão automática de NFS-e integrado ao seu financeiro;
- o contador transmite declarações em lote ou precisa de procuração eletrônica que o sistema só aceita com certificado;
- algum cliente ou órgão público exige assinatura qualificada em contrato ou documento.

Desde janeiro de 2026, a LC 214/2025 obriga os municípios a aderir ao padrão nacional da NFS-e. O [emissor nacional](https://www.gov.br/nfse/pt-br) aceita login gov.br, o que dispensa o certificado para quem emite poucas notas por mês. O post sobre [emissão de notas fiscais eletrônicas](/post/emitir-notas-fiscais-eletronicas-servicos-2025) mostra o passo a passo.

## e-CNPJ ou e-CPF: qual comprar?

Para assuntos da empresa, o e-CNPJ. Ele é emitido em nome da pessoa jurídica e vinculado ao responsável legal que consta no cadastro do CNPJ, e é com ele que sistemas de nota fiscal, ECD e ECF assinam em nome da empresa. O e-CPF identifica você como pessoa física: serve para o seu IRPF, para assinar documentos pessoais e, em alguns portais, para agir como representante da empresa depois de vinculado a ela.

Se você é o único sócio e só vai comprar um, compre o e-CNPJ. Se o cadastro do responsável legal no CNPJ estiver desatualizado, corrija antes: a Autoridade Certificadora confere esse dado na emissão e recusa o pedido quando ele não bate.

## Como escolher entre A1 e A3?

Comece pela pergunta: quem vai usar o certificado, e em quantos lugares?

| Seu cenário | Tipo indicado | Por quê |
|---|---|---|
| Sistema emite NFS-e automaticamente a cada fatura | A1 | O sistema precisa do arquivo para assinar sem você |
| Contador transmite ECD, ECF e declarações por você | A1 (compartilhado com o contador) ou procuração eletrônica | Evita depender de você com o token na mão |
| Você assina poucos documentos por ano | A3 em nuvem | Validade longa, sem arquivo para proteger |
| Trabalha em vários computadores e viaja | A3 em nuvem ou A1 com cuidado redobrado | Acesso sem hardware |

Para uma PJ tech de um sócio, a escolha prática costuma ficar entre um A1 de 1 ano, quando há automação, e nenhum certificado, quando o gov.br resolve. O A3 em token físico faz menos sentido para quem trabalha remoto.

## Como tirar o certificado digital passo a passo?

1. **Escolha o tipo** (A1 ou A3) e o titular (e-CNPJ da empresa ou e-CPF do sócio).
2. **Escolha uma Autoridade Certificadora** credenciada na ICP-Brasil. O ITI publica a lista. A AC define preço, pagamento e documentos.
3. **Separe os documentos**: contrato social e alterações, documento de identidade do responsável legal e comprovantes pedidos pela AC.
4. **Faça a validação de identidade**, presencial ou por videoconferência, conforme a AC.
5. **Instale e teste**: o A1 no computador ou no sistema de emissão; o A3 no token, no cartão ou no app da nuvem.
6. **Anote o vencimento** e marque a renovação para 30 dias antes. Certificado vencido trava emissão de nota e entrega de declaração.

## Quanto custa e quando renovar o certificado?

O preço é definido por cada Autoridade Certificadora, não pelo governo, e muda com o tipo, a validade, a mídia (arquivo, token, cartão ou nuvem) e a forma de validação. Por isso compare pelo custo anual: divida o preço pela quantidade de anos de validade. Um A3 de três anos pode sair mais barato por ano do que três A1 seguidos, mas só compensa se você não precisar de automação.

Renove antes do vencimento. Com o certificado ainda válido, muitas ACs permitem a renovação online, sem nova validação presencial ou por vídeo. Depois que ele vence, você refaz o processo inteiro.

## Como dar acesso ao contador sem entregar o certificado?

Use a procuração eletrônica do e-CAC. Nela, a empresa autoriza o contador a acessar serviços específicos da Receita com o certificado dele, por prazo definido. Você mantém o controle e pode revogar a qualquer momento. É mais seguro do que enviar o arquivo A1 e a senha por e-mail, e evita que um vazamento do lado do escritório comprometa a assinatura da sua empresa. Algumas prefeituras têm cadastro próprio de procurador para o emissor municipal de notas; confira no portal do seu município.

## Quais cuidados evitam problema com o certificado?

- **Não compartilhe a senha** por mensagem. Se o contador precisa transmitir declarações, prefira procuração eletrônica no e-CAC.
- **Guarde cópia de segurança do A1** em local criptografado. Perdeu o arquivo, compra outro.
- **Revogue imediatamente** um certificado comprometido, pelo site da Autoridade Certificadora.
- **Confira o titular**: e-CNPJ emitido com o responsável legal desatualizado pode ser recusado. Atualize o cadastro do CNPJ antes de comprar.
- **Desconfie de preço muito abaixo do mercado** fora de uma AC credenciada.

Certificado vencido ou ausente no dia de entregar uma declaração gera atraso, e atraso gera multa. A lista das obrigações com prazo está no guia sobre [como evitar autuação fiscal](/post/evitar-autuacoes-fiscais-8-cuidados-pj-tech).

## Contrato com cliente precisa de certificado ICP-Brasil?

Nem sempre. Entre empresas privadas, a assinatura eletrônica por plataforma vale quando as partes aceitam o método. O [Decreto 10.278/2020](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10278.htm) segue a mesma lógica para documentos digitalizados: entre particulares vale o método combinado; perante órgão público, exige-se assinatura com certificado ICP-Brasil. Para contratos de prestação de serviço com clientes, veja o [guia de contratos para prestadores PJ tech](/post/guia-contratos-prestadores-servico-pj-tech).

Se você está abrindo a empresa e quer saber se vai precisar de certificado no seu município, a [Conte](https://sejaconte.com.br) verifica isso na abertura do CNPJ.
