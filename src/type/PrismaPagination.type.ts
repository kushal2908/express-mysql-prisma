import { Prisma } from "@prisma/client";

// Define a union type of all model names available in Prisma
export type ModelNames = (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName];

// Define a type for Prisma operations specific to a given model
type PrismaOperation<ModelName extends ModelNames> = Prisma.TypeMap["model"][ModelName]["operations"];

// Define a type for Prisma findMany arguments specific to a given model
type PrismaFindManyArgs<ModelName extends ModelNames> = PrismaOperation<ModelName>["findMany"]["args"];

// Define a type for pagination options, including model name, query filters, and pagination parameters
export type PaginationOptions<ModelName extends ModelNames> = {
  modelName: ModelName;
  where?: PrismaFindManyArgs<ModelName>["where"];
  orderBy?: PrismaFindManyArgs<ModelName>["orderBy"];
  inlcude?: PrismaFindManyArgs<ModelName>["include"];
  omit?: PrismaFindManyArgs<ModelName>["omit"];
  page?: string;
  pageSize?: string;
};
