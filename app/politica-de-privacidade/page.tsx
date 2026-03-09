import Link from "next/link";

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="content-page">
      <div className="support-shell">
        <section className="support-card">
          <span className="support-card__eyebrow">Politica de privacidade</span>
          <h1>Pagina institucional criada como base para o texto juridico definitivo.</h1>
          <p>
            Inclua aqui as informacoes oficiais sobre coleta, uso, armazenamento e tratamento de
            dados pessoais no Eu, Consultor.
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