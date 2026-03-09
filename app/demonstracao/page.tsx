import Link from "next/link";

export default function DemonstracaoPage() {
  return (
    <main className="content-page">
      <div className="support-shell">
        <section className="support-card">
          <span className="support-card__eyebrow">Demonstracao</span>
          <h1>Destino pronto para sua apresentacao comercial.</h1>
          <p>
            Esta pagina serve como placeholder para a demonstracao do produto. Ela pode ser ligada a
            um video, um calendario de agendamento ou uma conversa direta com o time comercial.
          </p>
          <ul className="support-card__list">
            <li>Inserir video demonstrativo</li>
            <li>Integrar com agenda de reunioes</li>
            <li>Direcionar para WhatsApp ou formulario</li>
          </ul>
          <div className="support-card__actions">
            <Link className="button button--primary" href="/">
              Voltar para a landing
            </Link>
            <Link className="button button--secondary" href="/cadastro">
              Ir para cadastro
            </Link>
          </div>
        </section>
        <aside className="support-shell__side">
          <span className="support-card__eyebrow">Uso recomendado</span>
          <strong>Use esta rota como CTA secundario enquanto a demo final nao estiver publicada.</strong>
          <p>
            Assim a navegacao continua consistente e voce pode evoluir a experiencia comercial sem
            quebrar a landing.
          </p>
        </aside>
      </div>
    </main>
  );
}