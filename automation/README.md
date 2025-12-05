# Automação de Abertura de Empresa

Automação para o processo de abertura de empresa no site Empresa Fácil PR.

## Requisitos

- Python 3.8+
- Playwright
- hcaptcha-challenger

## Instalação

```bash
# Instalar dependências Python
pip install -r requirements.txt

# Instalar navegadores do Playwright
playwright install chromium
```

## Uso

```bash
python abertura_empresa.py
```

## Fluxo da Automação

1. Acessa https://www.empresafacil.pr.gov.br/acoes/abertura-de-empresa
2. Clica no botão "Abertura de Matriz"
3. Aguarda redirecionamento para gov.br
4. Preenche o CPF no campo de login
5. Clica em "Continuar"
6. Resolve o hCaptcha automaticamente (2 desafios)

## Configuração

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```
