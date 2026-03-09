import { ImageResponse } from "next/og";

export const alt = "Eu, Consultor — Software para consultores de campo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6b3f9c 0%, #8756b5 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background circles */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -80,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />

        {/* logo text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Eu, Consultor
          </span>
        </div>

        {/* tagline */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.82)",
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Software de gestão para consultores autônomos de campo
        </div>

        {/* bottom pill */}
        <div
          style={{
            marginTop: 40,
            padding: "12px 28px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          euconsultor.com.br
        </div>
      </div>
    ),
    { ...size }
  );
}
