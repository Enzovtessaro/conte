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

# Instalar navegadores do Playwright (apenas para modo local)
playwright install chromium
```

## Uso

### Modo Local (padrão)
```bash
python abertura_empresa.py
```

### Modo Nuvem (Chrome remoto)
```bash
python abertura_empresa.py --cloud
```

### Modo Headless (sem interface gráfica)
```bash
python abertura_empresa.py --headless
```

## Execução na Nuvem

A automação suporta execução em browsers remotos via CDP (Chrome DevTools Protocol).

### Opções de serviços:

| Serviço | Plano Gratuito | Configuração |
|---------|----------------|--------------|
| [Browserless.io](https://browserless.io) | 6 horas/mês | `BROWSERLESS_TOKEN` |
| [Steel.dev](https://steel.dev) | Trial | `BROWSER_WS_ENDPOINT` |
| Docker (self-hosted) | Ilimitado | `BROWSER_WS_ENDPOINT` |

### Configuração para nuvem:

1. Copie o `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure o token do serviço escolhido:
```env
# Para Browserless.io
BROWSERLESS_TOKEN=seu_token_aqui

# OU para outros serviços
BROWSER_WS_ENDPOINT=wss://seu-servidor.com/chrome
```

3. Execute com a flag `--cloud`:
```bash
python abertura_empresa.py --cloud
```

### Docker (self-hosted):
```bash
# Iniciar Chrome no Docker
docker run -p 3000:3000 browserless/chrome

# No .env
BROWSER_WS_ENDPOINT=ws://localhost:3000

# Executar
python abertura_empresa.py --cloud
```

## Fluxo da Automação

1. Acessa https://www.empresafacil.pr.gov.br/acoes/abertura-de-empresa
2. Clica no botão "Abertura de Matriz"
3. Aguarda redirecionamento para gov.br
4. Preenche o CPF no campo de login
5. Clica em "Continuar"
6. Resolve o hCaptcha automaticamente (2 desafios)
