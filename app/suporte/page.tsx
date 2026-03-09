import Link from "next/link";

export default function SuportePage() {
  return (
    <main className="content-page">
      <div className="support-shell">
        <section className="support-card">
          <span className="support-card__eyebrow">Suporte</span>
          <h1>Area de suporte inicial criada para nao deixar links quebrados.</h1>
          <p>
            Aqui voce pode adicionar base de ajuda, FAQ operacional, canais de atendimento ou link
            para o suporte real do produto.
          </p>
          <div className="support-card__actions">
            <Link className="button button--primary" href="/">
              Voltar para a landing
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}