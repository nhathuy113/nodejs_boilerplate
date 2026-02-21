import Link from "next/link";

type Variant = { id: string; sku: string; price: number; stock: number };
type Product = { id: string; name: string; createdAt: string; variants: Variant[] };

function formatPrice(cents: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(cents);
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";

  let product: Product | null = null;
  let error = "";
  let notFound = false;

  try {
    const res = await fetch(`${baseUrl}/products/${params.id}`, { cache: "no-store" });
    if (res.status === 404) {
      notFound = true;
    } else if (!res.ok) {
      error = `API returned ${res.status}`;
    } else {
      product = await res.json();
    }
  } catch {
    error = "Cannot connect to API. Is the backend running?";
  }

  if (notFound) {
    return (
      <>
        <Link href="/" style={{ color: "var(--accent)", fontSize: 14, fontWeight: 500 }}>
          ← Back to products
        </Link>
        <div style={{ textAlign: "center", padding: "64px 0", color: "var(--text-muted)" }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>Product not found</h1>
          <p>This product may have been removed.</p>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Link href="/" style={{ color: "var(--accent)", fontSize: 14, fontWeight: 500 }}>
          ← Back to products
        </Link>
        <div
          style={{
            background: "var(--red-bg)",
            color: "var(--red)",
            padding: "16px 20px",
            borderRadius: "var(--radius)",
            marginTop: 16,
            fontSize: 14,
          }}
        >
          {error || "Unknown error"}
        </div>
      </>
    );
  }

  const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
  const inStock = totalStock > 0;

  return (
    <>
      <Link href="/" style={{ color: "var(--accent)", fontSize: 14, fontWeight: 500 }}>
        ← Back to products
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          marginTop: 24,
        }}
      >
        {/* Image placeholder */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "var(--radius)",
            height: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          {product.name.charAt(0).toUpperCase()}
        </div>

        {/* Product info */}
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{product.name}</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
            ID: {product.id}
          </p>

          <span
            style={{
              display: "inline-block",
              fontSize: 13,
              fontWeight: 600,
              padding: "4px 14px",
              borderRadius: 20,
              background: inStock ? "var(--green-bg)" : "var(--red-bg)",
              color: inStock ? "var(--green)" : "var(--red)",
              marginBottom: 24,
            }}
          >
            {inStock ? `${totalStock} in stock` : "Out of stock"}
          </span>

          {/* Variants table */}
          {product.variants.length > 0 ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  fontWeight: 600,
                  fontSize: 14,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Variants ({product.variants.length})
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "var(--bg)" }}>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600 }}>SKU</th>
                    <th style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600 }}>Price</th>
                    <th style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600 }}>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v) => (
                    <tr key={v.id} style={{ borderTop: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 16px", fontFamily: "monospace", fontSize: 13 }}>
                        {v.sku}
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600 }}>
                        {formatPrice(v.price)}
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "right" }}>
                        <span
                          style={{
                            color: v.stock > 0 ? "var(--green)" : "var(--red)",
                            fontWeight: 600,
                          }}
                        >
                          {v.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: 14 }}>
              No variants configured for this product.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
