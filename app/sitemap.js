export default function sitemap() {
  const base = "https://kwik2travels.example.com";
  const routes = ["", "/fleet", "/services", "/booking", "/contact"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
