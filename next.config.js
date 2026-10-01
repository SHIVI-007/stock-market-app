/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a self-contained server bundle (`.next/standalone`) which the
  // Dockerfile runs in its slim runtime stage.
  output: "standalone",

  // Where the build and dev artefacts live.
  //
  // Overridable so the end-to-end suite can run its own server without fighting
  // the one you develop against: Next allows only a single dev server per
  // project directory, and that lock lives inside this directory. Giving the
  // tests their own keeps `npm run test:e2e` working while `npm run dev` is up.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // Allows local/LAN hosts to reach dev-only resources (HMR, etc.) while
  // developing. Harmless for production builds.
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.29.99"],

  // Never advertise the framework version.
  poweredByHeader: false,

  /**
   * Baseline security headers.
   *
   * Deliberately no Content-Security-Policy: the app boots its theme with an
   * inline script before React hydrates (see `components/layout/theme-script.tsx`),
   * and a strict `script-src` would need a per-request nonce threaded through
   * every page. The headers below are the ones that need no such plumbing.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stops browsers from second-guessing a declared content type.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // The app is never meant to be framed, so clickjacking is not possible.
          { key: "X-Frame-Options", value: "DENY" },
          // Full URLs can contain a reset token; do not leak them cross-origin.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // Ignored over plain HTTP, so it is harmless in local development.
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
