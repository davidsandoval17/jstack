type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(column?: string): Promise<T | null>;
  run<T = unknown>(): Promise<T>;
  all<T = unknown>(): Promise<T>;
  raw<T = unknown>(): Promise<T[]>;
};

type D1Database = {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<T[]>;
  exec<T = unknown>(query: string): Promise<T>;
  dump(): Promise<ArrayBuffer>;
};

type Fetcher = {
  fetch(input: Request | string | URL, init?: RequestInit): Promise<Response>;
};

declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
  };
}
