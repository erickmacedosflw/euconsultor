import Link from "next/link";

export default function ContatoPage() {
  return (
    <main className="content-page">
      <div className="support-shell">
        <section className="support-card">
          <span className="support-card__eyebrow">Contato</span>
          <h1>Canal de contato institucional preparado.</h1>
          <p>
            Use esta pagina para concentrar canais comerciais, e-mail, WhatsApp, telefone ou um
            formulario de contato oficial.
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