require('dotenv').config()
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL

const nextConfig = {
  experimental: {
    nextScriptWorkers: true
  },
  reactStrictMode: false,
  compiler: {
    emotion: true
  },
  env: {
    spaceID: process.env.spaceID,
    accessTokenDelivery: process.env.accessTokenDelivery
  },
  trailingSlash: true,
  distDir: 'build',
  assetPrefix: isProd ? CDN_URL : undefined,
  images: {
    domains: ['localhost', '127.0.0.1', 'next-webtinhoc.vercel.app', 'tinhoc.org']
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}'
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}'
    }
  },
  rewrites: async () => [
    {
      source: '/dynamic-sitemap.xml',
      destination: '/dynamic-sitemap'
    },
    {
      source: '/article/',
      destination: '/article'
    }
  ],
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false }
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return
          one.issuer.and = [path.resolve(__dirname)]
        })
      }
    })

    return config
  }

}

const plugins = [
]

module.exports = () => {
  return plugins.reduce((acc, next) => next(acc), nextConfig)
}
