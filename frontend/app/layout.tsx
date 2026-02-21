import "./globals.css";

export const metadata = {
  title: "Product Store",
  description: "Browse and buy products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <header
          style={{
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="/" style={{ fontWeight: 700, fontSize: 20, color: "var(--accent)" }}>
            ProductStore
          </a>
          <span style={{ fontSize: 14, color: "var(--text-muted)" }}>Dev Testing UI</span>
        </header>
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>{children}</main>
      </body>
    </html>
  );
}
