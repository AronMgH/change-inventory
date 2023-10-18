// Create a file named express-session.d.ts
import session from "express-session";

// Declare a module with the same name as the package
declare module "express-session" {
  // Export an interface with the same name as the original type
  export interface Session {
    // Add your custom properties here
    id: number;
    username: string;
  }
}
