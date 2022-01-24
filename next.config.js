const securityHeaders = [{
  key: 'X-Frame-Options',
  value: 'SAMEORIGIN'
}
]

module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply the security headers to all routes in the application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
