describe("Navigation", () => {
  it("should navigate to the main page and receive all proper security headers", () => {
    // Start from the index page
    cy.request("http://127.0.0.1:3000/").as("mainPage");

    cy.get("@mainPage").should((response) => {
      expect(response.headers, "response headers").to.include({
        "x-frame-options": "SAMEORIGIN",
        "x-content-type-options": "nosniff",
        "referrer-policy": "no-referrer-when-downgrade",
        "permissions-policy":
          "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()",
        // "content-security-policy":
        //  "default-src 'none'; connect-src 'self' https://vitals.vercel-insights.com/v1/vitals; img-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'",
        "x-xss-protection": "1; mode=block",
      });
    });
  });
});
