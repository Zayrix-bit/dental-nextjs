export default function sitemap() {
  const baseUrl = 'https://dentalclinic.com';

  // In a real app, dynamic routes (like blog posts) would be fetched here
  // and added to the routes array.
  
  const routes = [
    '',
    '/services',
    '/about',
    '/testimonials',
    '/gallery',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
