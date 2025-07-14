import express from 'express';
import { handleWebhook } from './webhook/blog';

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Rota do webhook
app.post('/api/webhook/blog', handleWebhook);

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
}); 