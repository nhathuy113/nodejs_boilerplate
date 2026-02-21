import Link from "next/link";

type Variant = { id: string; sku: string; price: number; stock: number };
type Product = { id: string; name: string; createdAt: string; variants: Variant[] };

function formatPrice(cents: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(cents);
}

function getLowestPrice(variants: Variant[]): number | null {
  if (variants.length === 0) return null;
  return Math.min(...variants.map((v) => v.price));
}

function getTotalStock(variants: Variant[]): number {
  return variants.reduce((sum, v) => sum + v.stock, 0);
}

export default async function HomePage() {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";

  let products: Product[] = [];
  let error = "";

  try {
    const res = await fetch(`${baseUrl}/products`, { cache: "no-store" });
    if (!res.ok) {
      error = `API returned ${res.status}`;
    } else {
      products = await res.json();
    }
  } catch (e) {
    error = "Cannot connect to API. Is the backend running?";
  }

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Products</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
          {products.length} product{products.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {error && (
        <div
          style={{
            background: "var(--red-bg)",
            color: "var(--red)",
            padding: "16px 20px",
            borderRadius: "var(--radius)",
            marginBottom: 24,
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      {!error && products.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "64px 24px",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ fontSize: 18, marginBottom: 8 }}>No products yet</p>
          <p style={{ fontSize: 14 }}>Seed some data or create products via the API.</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((product) => {
          const lowestPrice = getLowestPrice(product.variants);
          const totalStock = getTotalStock(product.variants);
          const inStock = totalStock > 0;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow)",
                overflow: "hidden",
                transition: "box-shadow 0.2s, transform 0.2s",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Placeholder image area */}
              <div
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  height: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 40,
                  fontWeight: 700,
                  letterSpacing: 2,
                  opacity: 0.9,
                }}
              >
                {product.name.charAt(0).toUpperCase()}
              </div>

              <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{product.name}</h2>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Stock badge */}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 20,
                      background: inStock ? "var(--green-bg)" : "var(--red-bg)",
                      color: inStock ? "var(--green)" : "var(--red)",
                    }}
                  >
                    {inStock ? `${totalStock} in stock` : "Out of stock"}
                  </span>

                  {product.variants.length > 0 && (
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {product.variants.length} variant{product.variants.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: "auto" }}>
                  {lowestPrice !== null ? (
                    <span style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)" }}>
                      {product.variants.length > 1 ? "from " : ""}
                      {formatPrice(lowestPrice)}
                    </span>
                  ) : (
                    <span style={{ fontSize: 14, color: "var(--text-muted)", fontStyle: "italic" }}>
                      No pricing set
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
