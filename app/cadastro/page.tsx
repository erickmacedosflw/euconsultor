import Link from "next/link";

export default function CadastroPage() {
  return (
    <main className="content-page">
      <div className="support-shell">
        <section className="support-card">
          <span className="support-card__eyebrow">Cadastro</span>
          <h1>Pagina de cadastro pronta para receber a sua jornada comercial.</h1>
          <p>
            Este espaco foi preparado como destino do CTA principal da landing. Aqui voce pode
            conectar o fluxo real de criacao de conta, checkout ou qualificacao comercial.
          </p>
          <ul className="support-card__list">
            <li>Conectar ao formulario real de cadastro</li>
            <li>Integrar com checkout ou automacao comercial</li>
            <li>Levar o lead direto para o proximo passo da conversao</li>
          </ul>
          <div className="support-card__actions">
            <Link className="button button--primary" href="/">
              Voltar para a landing
            </Link>
            <Link className="button button--secondary" href="/demonstracao">
              Ir para demonstracao
            </Link>
          </div>
        </section>
        <aside className="support-shell__side">
          <span className="support-card__eyebrow">Proximo passo</span>
          <strong>Substitua esta pagina pelo fluxo comercial definitivo.</strong>
          <p>
            Se voce ja tiver o link real de cadastro, tambem posso trocar os CTAs da landing para o
            destino final em seguida.
          </p>
        </aside>
      </div>
    </main>
  );
}