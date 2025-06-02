const favicons = require("favicons").default; // ← PONECHAT TENTO
const fs = require("fs");
const path = require("path");

const source = "public/images/logo.png"; // ← Ujisti se, že tento soubor existuje a má min. 512x512px

const configuration = {
  path: "/",
  appName: "videojinak.cz",
  appShortName: "Videojinak",
  appDescription: "Specializujeme se na promo, klipy, komerční i svatební videa. Nejraději děláme akčnější videa, a když do nich můžeme promítnout i srandu, pak jedině super.",
  developerName: "Jan Sladký",
  developerURL: "https://www.jansladky.eu",
  icons: {
    android: true,
    appleIcon: true,
    favicons: true,
    windows: false,
    yandex: false,
  },
};

const callback = (error, response) => {
  if (error) {
    console.log("Chyba:", error.message);
    return;
  }

  response.images.forEach((image) => {
    fs.writeFileSync(path.join("public", image.name), image.contents);
  });

  response.files.forEach((file) => {
    fs.writeFileSync(path.join("public", file.name), file.contents);
  });

  console.log("Zkopíruj tyto tagy do <head>:");
  console.log(response.html.join("\n"));
};

favicons(source, configuration, callback);