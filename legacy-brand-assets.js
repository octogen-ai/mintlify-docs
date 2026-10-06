// Mintlify serves both custom website origins from one build. Preserve the
// legacy logo only on real Octogen hosts, including after client navigation.
(() => {
  if (!/(^|\.)octogen\.ai$/i.test(window.location.hostname.replace(/\.$/, ""))) return;

  // The standalone docs host is served by Mintlify, while /docs is proxied
  // through the website. Use one explicit asset origin for both entry points.
  const assetOrigin = "https://storerouter.ai/legacy-octogen";

  function updateBrandAssets() {
    document.querySelectorAll("img.nav-logo").forEach((image) => {
      const source = image.getAttribute("src") || "";
      if (!source.includes("storerouter-logo-")) return;
      const mode = source.includes("storerouter-logo-dark") ? "dark" : "light";
      image.removeAttribute("srcset");
      image.setAttribute("src", `${assetOrigin}/docs-logo-${mode}.svg`);
      image.setAttribute("alt", "Octogen");
    });
    document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach((icon) => {
      if (icon.getAttribute("href") === `${assetOrigin}/icon.svg`) return;
      icon.setAttribute("href", `${assetOrigin}/icon.svg`);
      icon.setAttribute("type", "image/svg+xml");
    });
  }

  updateBrandAssets();
  new MutationObserver(updateBrandAssets).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "srcset", "href"],
  });
})();
