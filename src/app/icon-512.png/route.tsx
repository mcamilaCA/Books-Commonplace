import { ImageResponse } from "next/og";

export async function GET() {
  const size = 512;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16110d",
          border: `${size * 0.045}px solid #b28a3f`,
          borderRadius: size * 0.18,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: size * 0.56,
            fontWeight: 700,
            color: "#dcb769",
          }}
        >
          C
        </span>
      </div>
    ),
    { width: size, height: size }
  );
}
