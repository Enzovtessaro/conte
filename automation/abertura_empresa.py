"""
Automação para abertura de empresa no Empresa Fácil PR
Utiliza Playwright + hcaptcha-challenger para resolver captchas automaticamente
"""

import asyncio
import os
from dotenv import load_dotenv
from playwright.async_api import async_playwright, Page, BrowserContext

# Importa o hcaptcha-challenger
try:
    from hcaptcha_challenger import AgentV, AgentConfig, CaptchaResponse
except ImportError:
    print("AVISO: hcaptcha-challenger não instalado. Instale com: pip install hcaptcha-challenger")
    AgentV = None

# Carrega variáveis de ambiente
load_dotenv()

# Configurações
EMPRESA_FACIL_URL = "https://www.empresafacil.pr.gov.br/acoes/abertura-de-empresa"
CPF_LOGIN = "022.172.319-60"


async def solve_hcaptcha(page: Page) -> bool:
    """
    Resolve o hCaptcha usando hcaptcha-challenger

    Args:
        page: Objeto Page do Playwright

    Returns:
        bool: True se resolveu com sucesso, False caso contrário
    """
    if AgentV is None:
        print("❌ hcaptcha-challenger não está disponível")
        return False

    try:
        print("🔐 Iniciando resolução do hCaptcha...")

        # Configura o agente
        config = AgentConfig()
        agent = AgentV(page, config)

        # Aguarda o captcha ficar pronto e resolve
        response: CaptchaResponse = await agent.wait_for_challenge()

        if response and response.is_pass:
            print("✅ hCaptcha resolvido com sucesso!")
            return True
        else:
            print("❌ Falha ao resolver hCaptcha")
            return False

    except Exception as e:
        print(f"❌ Erro ao resolver hCaptcha: {e}")
        return False


async def click_abertura_matriz(page: Page) -> bool:
    """
    Clica no botão 'Abertura de Matriz' na página do Empresa Fácil

    Args:
        page: Objeto Page do Playwright

    Returns:
        bool: True se clicou com sucesso, False caso contrário
    """
    try:
        print("🔍 Procurando botão 'Abertura de Matriz'...")

        # Aguarda o botão aparecer e clica
        # O botão pode estar em um link ou button com esse texto
        button = page.get_by_role("link", name="Abertura de Matriz")

        # Tenta primeiro como link
        if await button.count() > 0:
            await button.click()
            print("✅ Clicou em 'Abertura de Matriz' (link)")
            return True

        # Tenta como botão
        button = page.get_by_role("button", name="Abertura de Matriz")
        if await button.count() > 0:
            await button.click()
            print("✅ Clicou em 'Abertura de Matriz' (button)")
            return True

        # Tenta por texto visível
        button = page.get_by_text("Abertura de Matriz", exact=True)
        if await button.count() > 0:
            await button.first.click()
            print("✅ Clicou em 'Abertura de Matriz' (texto)")
            return True

        # Última tentativa: busca por seletor genérico
        selectors = [
            "a:has-text('Abertura de Matriz')",
            "button:has-text('Abertura de Matriz')",
            "[data-action='abertura-matriz']",
            ".btn-abertura-matriz"
        ]

        for selector in selectors:
            try:
                element = page.locator(selector)
                if await element.count() > 0:
                    await element.first.click()
                    print(f"✅ Clicou em 'Abertura de Matriz' usando seletor: {selector}")
                    return True
            except:
                continue

        print("❌ Não encontrou o botão 'Abertura de Matriz'")
        return False

    except Exception as e:
        print(f"❌ Erro ao clicar em 'Abertura de Matriz': {e}")
        return False


async def wait_for_govbr(page: Page) -> bool:
    """
    Aguarda o redirecionamento e carregamento do site gov.br

    Args:
        page: Objeto Page do Playwright

    Returns:
        bool: True se carregou com sucesso, False caso contrário
    """
    try:
        print("⏳ Aguardando redirecionamento para gov.br...")

        # Aguarda até 30 segundos para a URL mudar para gov.br
        await page.wait_for_url("**/sso.acesso.gov.br/**", timeout=30000)

        print("✅ Redirecionado para gov.br")

        # Aguarda a página carregar completamente
        await page.wait_for_load_state("networkidle")
        print("✅ Página gov.br carregada")

        return True

    except Exception as e:
        print(f"❌ Erro ao aguardar gov.br: {e}")
        # Verifica se já está no gov.br mesmo com timeout
        current_url = page.url
        if "gov.br" in current_url or "acesso.gov.br" in current_url:
            print("✅ Já está no gov.br")
            return True
        return False


async def fill_cpf(page: Page, cpf: str) -> bool:
    """
    Preenche o campo de CPF na página de login do gov.br

    Args:
        page: Objeto Page do Playwright
        cpf: CPF a ser preenchido

    Returns:
        bool: True se preencheu com sucesso, False caso contrário
    """
    try:
        print(f"📝 Preenchendo CPF: {cpf}")

        # Aguarda o campo de CPF aparecer
        # O campo pode ter diferentes identificadores dependendo da página
        cpf_selectors = [
            "input[name='accountId']",
            "input#accountId",
            "input[placeholder*='CPF']",
            "input[type='text'][maxlength='14']",
            "input[data-testid='cpf-input']",
            "#accountId"
        ]

        cpf_field = None
        for selector in cpf_selectors:
            try:
                field = page.locator(selector)
                if await field.count() > 0:
                    cpf_field = field.first
                    print(f"✅ Campo CPF encontrado com seletor: {selector}")
                    break
            except:
                continue

        if cpf_field is None:
            # Tenta por label
            cpf_field = page.get_by_label("CPF")
            if await cpf_field.count() == 0:
                cpf_field = page.get_by_placeholder("Digite seu CPF")
                if await cpf_field.count() == 0:
                    print("❌ Não encontrou o campo de CPF")
                    return False

        # Limpa o campo e preenche o CPF
        await cpf_field.clear()
        await cpf_field.fill(cpf)
        print(f"✅ CPF preenchido: {cpf}")

        # Clica no botão Continuar
        await click_continuar(page)

        return True

    except Exception as e:
        print(f"❌ Erro ao preencher CPF: {e}")
        return False


async def click_continuar(page: Page) -> bool:
    """
    Clica no botão 'Continuar' após preencher o CPF

    Args:
        page: Objeto Page do Playwright

    Returns:
        bool: True se clicou com sucesso, False caso contrário
    """
    try:
        print("🔍 Procurando botão 'Continuar'...")

        # Tenta diferentes formas de encontrar o botão
        continuar_selectors = [
            "button[type='submit']",
            "button:has-text('Continuar')",
            "input[type='submit']",
            "#enter-account-id",
            "button.btn-primary"
        ]

        for selector in continuar_selectors:
            try:
                button = page.locator(selector)
                if await button.count() > 0:
                    await button.first.click()
                    print(f"✅ Clicou em 'Continuar' usando seletor: {selector}")
                    return True
            except:
                continue

        # Tenta por texto
        button = page.get_by_role("button", name="Continuar")
        if await button.count() > 0:
            await button.click()
            print("✅ Clicou em 'Continuar'")
            return True

        print("❌ Não encontrou o botão 'Continuar'")
        return False

    except Exception as e:
        print(f"❌ Erro ao clicar em 'Continuar': {e}")
        return False


async def run_automation(headless: bool = False) -> bool:
    """
    Executa a automação completa de abertura de empresa

    Args:
        headless: Se True, executa sem interface gráfica

    Returns:
        bool: True se a automação foi concluída com sucesso
    """
    print("=" * 60)
    print("🚀 Iniciando automação de abertura de empresa")
    print("=" * 60)

    async with async_playwright() as p:
        # Inicia o navegador
        print("🌐 Iniciando navegador...")
        browser = await p.chromium.launch(
            headless=headless,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-dev-shm-usage"
            ]
        )

        # Cria contexto com configurações para evitar detecção
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )

        # Abre nova página
        page = await context.new_page()

        try:
            # Passo 1: Acessa o site do Empresa Fácil
            print(f"\n📌 Passo 1: Acessando {EMPRESA_FACIL_URL}")
            await page.goto(EMPRESA_FACIL_URL, wait_until="networkidle")
            print("✅ Site carregado")

            # Aguarda um pouco para garantir carregamento completo
            await asyncio.sleep(2)

            # Passo 2: Clica em 'Abertura de Matriz'
            print("\n📌 Passo 2: Clicando em 'Abertura de Matriz'")
            if not await click_abertura_matriz(page):
                print("⚠️ Falha ao clicar no botão. Tentando continuar...")

            # Passo 3: Aguarda redirecionamento para gov.br
            print("\n📌 Passo 3: Aguardando gov.br carregar")
            await wait_for_govbr(page)

            # Aguarda um pouco mais para garantir que a página está pronta
            await asyncio.sleep(3)

            # Passo 4: Preenche o CPF
            print("\n📌 Passo 4: Preenchendo CPF")
            if not await fill_cpf(page, CPF_LOGIN):
                print("❌ Falha ao preencher CPF")
                return False

            # Aguarda o hCaptcha aparecer
            print("\n📌 Passo 5: Aguardando hCaptcha...")
            await asyncio.sleep(3)

            # Passo 5: Resolve o hCaptcha (2 desafios)
            print("\n📌 Passo 6: Resolvendo hCaptcha (desafio 1/2)")
            if not await solve_hcaptcha(page):
                print("⚠️ Primeiro desafio pode ter falhado, tentando continuar...")

            await asyncio.sleep(2)

            print("\n📌 Passo 7: Resolvendo hCaptcha (desafio 2/2)")
            if not await solve_hcaptcha(page):
                print("⚠️ Segundo desafio pode ter falhado")

            print("\n" + "=" * 60)
            print("✅ Automação concluída!")
            print("=" * 60)

            # Mantém o navegador aberto para verificação manual
            print("\n⏸️ Navegador mantido aberto. Pressione Enter para fechar...")
            input()

            return True

        except Exception as e:
            print(f"\n❌ Erro durante a automação: {e}")
            import traceback
            traceback.print_exc()
            return False

        finally:
            await browser.close()
            print("🔒 Navegador fechado")


async def main():
    """Função principal"""
    # Executa com interface gráfica visível
    await run_automation(headless=False)


if __name__ == "__main__":
    asyncio.run(main())
