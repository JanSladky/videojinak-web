import { useRouter } from "next/router";

export default function DynamicPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Stránka: {slug}</h1>
      <p>Tato stránka je připravená pro budoucí dynamický obsah.</p>
    </div>
  );
}