export const metadata = {
  title: "Eu, Consultor — App",
};

export default function TestePage() {
  return (
    <iframe
      src="https://apps.powerapps.com/play/e/1f54c71f-0e2e-e9af-a25d-b153e31b08e2/a/80dd9ac2-044f-4d04-ab9e-d9fec9c734f0?tenantId=45f2e238-12dc-43a6-8e7e-a7ae314f2d95&hint=600ad3aa-4a5b-4d1c-8e67-20f320df2b3e&sourcetime=1773094074680&hidenavbar=true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
        display: "block",
        zIndex: 9999,
      }}
      allowFullScreen
      allow="camera; microphone; geolocation"
    />
  );
}
