// Every page that gets prerendered and listed in the sitemap.
import { services } from './data/services';
import { cltSalaryScenarios, CLT_VS_PJ_BASE, quantoSobraScenarios, QUANTO_SOBRA_BASE } from './data/scenarios';

export const routes = [
  '/',
  '/ferramentas',
  '/calculadora',
  '/clt-vs-pj',
  '/calculadora-fator-r',
  '/calculadora-pro-labore',
  ...services.map((s) => `/${s.slug}`),
  ...quantoSobraScenarios.map((s) => `${QUANTO_SOBRA_BASE}/${s.slug}`),
  ...cltSalaryScenarios.map((s) => `${CLT_VS_PJ_BASE}/${s.slug}`),
];
