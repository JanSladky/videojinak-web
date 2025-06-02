// fetchWpPage.js
export async function fetchWpPage(slug) {
  const url = `${process.env.NEXT_PUBLIC_WORDPRESS_API}?slug=${slug}&_fields=id,title,content,acf`;

  if (process.env.NODE_ENV !== 'production') {
    console.log(`📡 Načítám z WordPressu slug '${slug}': ${url}`);
  }


  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data) || !data.length || !data[0]?.acf) {
      throw new Error('⚠️ API odpověď je prázdná nebo chybí ACF');
    }

    return data[0];
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`❌ Chyba při načítání slug '${slug}':`, error.message);
    }
    return null;
  }
}