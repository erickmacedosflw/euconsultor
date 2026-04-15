# Eu, Consultor

Landing page SaaS em Next.js para o produto Eu, Consultor, focada em conversao para consultores autonomos que realizam atendimentos em campo.

## Stack

- Next.js com App Router
- TypeScript
- ESLint
- Tailwind CSS v4
- Fontes: Manrope e Space Grotesk

## Estrutura principal

- Landing page principal em `app/page.tsx`
- Rotas provisórias para CTA e links institucionais:
	- `app/cadastro/page.tsx`
	- `app/demonstracao/page.tsx`
	- `app/politica-de-privacidade/page.tsx`
	- `app/contato/page.tsx`
	- `app/suporte/page.tsx`

## Desenvolvimento

```bash
npm run dev
```

Aplicacao local: `http://localhost:3000`

## Validacao

```bash
npm run lint
npm run build
```

## Observacoes

- O modal de pré-inscrição da landing envia os dados para um endpoint server-side em `app/api/pre-inscricao/route.ts`.
- Os CTAs estao prontos, mas ainda apontam para rotas internas provisórias.
- Se voce tiver a URL final de cadastro, demonstracao, WhatsApp ou checkout, basta substituir os destinos dos links.
- A landing foi criada seguindo a identidade visual do produto vista nas telas enviadas: base clara, roxo institucional, cards limpos e aparencia de software profissional.
