// next.config.js (as an ES module)
import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public",
  // Disable PWA (service worker generation) in development mode
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  // other Next.js configuration options
};

export default withPWA(nextConfig);
