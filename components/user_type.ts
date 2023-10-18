export type UserWithId = {
    id: number;
  } & {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };