/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/signup",
  "/signup-details",
  "/otp-verification",
  "/technology",
  "/about-us",
  "/blogs",
  "/blog/[id]",
  "/contact-us",
  "/privacy-policy",
  "/how-it-works",
  "/report",
  "/terms-conditions",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth",
  "/signup",
  "/otp",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication puposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";
