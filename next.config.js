const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer-when-downgrade'
  },
  {
    key: 'Permissions-Policy',
    value: 'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()'
  },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'none'; connect-src 'self' https://vitals.vercel-insights.com/v1/vitals; img-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'",
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
