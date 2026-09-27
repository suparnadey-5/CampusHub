// Minimal local definition to avoid depending on external type file
// Keeps the Request.user typing available for Express handlers
interface AuthenticatedUser {
  id: string;
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
