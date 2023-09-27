/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://example.com'

module.exports = {
  siteUrl,
  sourceDir: 'build',
  exclude: ['/404'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/acp', '/api/*', '/']
      }
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/dynamic-sitemap.xml`
    ]
  }
}
