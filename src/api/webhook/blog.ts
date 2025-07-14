import { Request, Response } from 'express';
import { supabase } from '../../lib/supabase';

// Token de segurança do AutomArticles (deve ser configurado nas variáveis de ambiente)
const WEBHOOK_SECRET = process.env.AUTOMARTICLES_WEBHOOK_SECRET;

// Interface para o payload do webhook
interface WebhookPayload {
  event: 'post.created' | 'post.updated' | 'post.deleted';
  data: {
    id: string;
    title: string;
    slug: string;
    content: string;
    summary: string;
    cover_image: string;
    author: string;
    date_published: string;
    tags?: string[];
  };
}

// Função para validar o token do webhook
function validateWebhookToken(req: Request): boolean {
  const token = req.headers['x-automarticles-token'];
  return token === WEBHOOK_SECRET;
}

// Função para processar tags
async function processTags(tags: string[], postId: string) {
  // Primeiro, garantir que todas as tags existam
  for (const tagName of tags) {
    const { data: existingTag } = await supabase
      .from('blog_tags')
      .select('id')
      .eq('name', tagName)
      .single();

    if (!existingTag) {
      // Criar nova tag se não existir
      await supabase
        .from('blog_tags')
        .insert([{ name: tagName }]);
    }
  }

  // Buscar IDs de todas as tags
  const { data: tagIds } = await supabase
    .from('blog_tags')
    .select('id')
    .in('name', tags);

  // Remover todas as tags antigas do post
  await supabase
    .from('blog_post_tags')
    .delete()
    .eq('post_id', postId);

  // Adicionar novas tags
  if (tagIds && tagIds.length > 0) {
    const postTags = tagIds.map(tag => ({
      post_id: postId,
      tag_id: tag.id
    }));

    await supabase
      .from('blog_post_tags')
      .insert(postTags);
  }
}

// Handler principal do webhook
export async function handleWebhook(req: Request, res: Response) {
  try {
    // Validar token
    if (!validateWebhookToken(req)) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const payload = req.body as WebhookPayload;
    const { event, data } = payload;

    switch (event) {
      case 'post.created':
      case 'post.updated': {
        // Criar ou atualizar o post
        const { data: post, error } = await supabase
          .from('blog_posts')
          .upsert({
            slug: data.slug,
            title: data.title,
            content: data.content,
            summary: data.summary,
            cover_image: data.cover_image,
            author: data.author,
            date_published: data.date_published
          })
          .select()
          .single();

        if (error) throw error;

        // Processar tags se existirem
        if (data.tags && data.tags.length > 0) {
          await processTags(data.tags, post.id);
        }

        return res.status(200).json({ message: 'Post processado com sucesso', post });
      }

      case 'post.deleted': {
        // Deletar o post
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('slug', data.slug);

        if (error) throw error;

        return res.status(200).json({ message: 'Post deletado com sucesso' });
      }

      default:
        return res.status(400).json({ error: 'Evento não suportado' });
    }
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
} 