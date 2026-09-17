import { ImageResponse } from "next/og";
import { person } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = `${person.name} — ${person.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Note: Satori (used by next/og) has limited support for Persian/Arabic
// script shaping. We use a clean Latin-only layout with the person's
// transliterated name + role, which renders reliably and is universally
// readable when the URL is shared on social media.
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #1b1813 0%, #2a2520 50%, #1b1813 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative gold radial glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(238,187,88,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(205,99,45,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top row: monogram + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: "2px solid #eebb58",
                background: "rgba(238,187,88,0.1)",
                color: "#eebb58",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              A
            </div>
            <div
              style={{
                color: "#a49d94",
                fontSize: 24,
                display: "flex",
              }}
            >
              {person.domain}
            </div>
          </div>
          {/* CSS-drawn diamond (no font dependency) */}
          <div
            style={{
              width: 24,
              height: 24,
              background: "#eebb58",
              transform: "rotate(45deg)",
              display: "flex",
              borderRadius: 4,
            }}
          />
        </div>

        {/* Center: name + title (English for reliable rendering) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "relative",
          }}
        >
          <div
            style={{
              color: "#f3de90",
              fontSize: 36,
              display: "flex",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            PhD Candidate in Economics
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: 800,
              color: "#fffaf0",
              display: "flex",
              lineHeight: 1.1,
            }}
          >
            Ali Zafari Moghaddam
          </div>
          <div
            style={{
              color: "#eebb58",
              fontSize: 32,
              display: "flex",
              marginTop: 8,
              maxWidth: 900,
            }}
          >
            Economist | Researcher | Sustainable Development
          </div>
        </div>

        {/* Bottom row: stats */}
        <div
          style={{
            display: "flex",
            gap: 40,
            position: "relative",
            borderTop: "1px solid rgba(238,187,88,0.3)",
            paddingTop: 28,
          }}
        >
          {[
            { v: "3+", l: "Work Experiences" },
            { v: "2", l: "Academic Degrees" },
            { v: "3", l: "Intl Institutions" },
            { v: "1", l: "PhD in Progress" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div
                style={{
                  color: "#eebb58",
                  fontSize: 56,
                  fontWeight: 700,
                  display: "flex",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  color: "#a49d94",
                  fontSize: 22,
                  display: "flex",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
