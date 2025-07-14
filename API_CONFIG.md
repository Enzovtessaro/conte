# Configuração da API UniRateAPI

## Como configurar a chave da API

1. **Obtenha sua chave gratuita**: https://unirateapi.com/
2. **Edite o arquivo**: `src/utils/currencyUtils.ts`
3. **Substitua a linha**:
   ```typescript
   const UNIRATE_API_KEY = 'jtSjYNcxDR4AcNkUZXCpQbJpiAVXLG28oYrRHREeUuX1UNZGXWVNLlLkeOQ3yjwm';
   ```
   Pela sua chave real (já está configurada!)

## Status Atual
✅ **API configurada e funcionando**  
✅ **Taxas reais em tempo real**  
✅ **Fallback automático** se houver problemas

## Verificar funcionamento
No console do navegador deve aparecer:
```
Real exchange rate for USD to BRL: 5.XXXX
```

Se aparecer "Fallback exchange rate", verifique sua chave da API.