"use client";

export interface GoogleMapEmbedProps {
  embedUrl: string;
  mapMinHeight: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

const defaultProps: GoogleMapEmbedProps = {
  embedUrl: "",
  mapMinHeight: "350px",
  address: "123 Main Street\nCity, ST 00000",
  phone: "(000) 000-0000",
  email: "hello@example.com",
  hours: "Mon-Fri: 11am-10pm\nSat-Sun: 10am-11pm",
};

function MultiLine({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export default function GoogleMapEmbed(props: Partial<GoogleMapEmbedProps>) {
  const v = { ...defaultProps, ...props };

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-4xl)",
          fontWeight: 700,
          color: "var(--color-dark)",
          margin: "0 0 var(--space-2)",
          lineHeight: "var(--leading-snug)",
        }}>
          Visit Us
        </h2>
        <p style={{
          fontSize: "var(--text-xl)",
          color: "var(--color-text-light)",
          margin: 0,
        }}>
          We would love to see you
        </p>
      </div>

      {/* Kit-specific content */}
      <div style={{ maxWidth: "var(--max-w-xl)", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-12)",
            alignItems: "start",
          }}
        >
          {/* Map */}
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: "100%" }}>
            {v.embedUrl ? (
              <iframe
                src={v.embedUrl}
                style={{ width: "100%", height: "100%", minHeight: v.mapMinHeight, border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  minHeight: v.mapMinHeight,
                  background: "var(--color-cream)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-text-light)",
                  border: "1px dashed var(--color-border)",
                }}
              >
                Google Maps embed goes here
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            <div>
              <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-2)", color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
                Location
              </h3>
              <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-light)", lineHeight: "var(--leading-loose)", fontFamily: "var(--font-body)", margin: 0 }}>
                <MultiLine text={v.address} />
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-2)", color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
                Hours
              </h3>
              <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-light)", lineHeight: "var(--leading-loose)", fontFamily: "var(--font-body)", margin: 0 }}>
                <MultiLine text={v.hours} />
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-2)", color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
                Contact
              </h3>
              <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-light)", lineHeight: "var(--leading-loose)", fontFamily: "var(--font-body)", margin: 0 }}>
                {v.phone}
                <br />
                {v.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
