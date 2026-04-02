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
  const vars = { ...defaultProps, ...props };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#1a1208", color: "#faf6f0" }}>
      <section style={{ padding: "4rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", color: "#d4a017" }}>
            Visit Us
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            maxWidth: 1200,
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {/* Map */}
          <div style={{ borderRadius: 8, overflow: "hidden", height: "100%" }}>
            {vars.embedUrl ? (
              <iframe
                src={vars.embedUrl}
                style={{ width: "100%", height: "100%", minHeight: vars.mapMinHeight, border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  minHeight: vars.mapMinHeight,
                  background: "#2a2218",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8a7e6e",
                  fontStyle: "italic",
                  border: "1px dashed #555",
                }}
              >
                Google Maps embed goes here
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: "#d4a017" }}>
                Location
              </h3>
              <p style={{ fontSize: "0.95rem", opacity: 0.75, lineHeight: 1.7 }}>
                <MultiLine text={vars.address} />
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: "#d4a017" }}>
                Hours
              </h3>
              <p style={{ fontSize: "0.95rem", opacity: 0.75, lineHeight: 1.7 }}>
                <MultiLine text={vars.hours} />
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: "#d4a017" }}>
                Contact
              </h3>
              <p style={{ fontSize: "0.95rem", opacity: 0.75, lineHeight: 1.7 }}>
                {vars.phone}
                <br />
                {vars.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
