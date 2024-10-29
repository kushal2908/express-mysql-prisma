import { prisma } from "@/prisma";
import { ModelNames, PaginationOptions } from "@/type/PrismaPagination.type";

export default async function paginate<ModelName extends ModelNames>({
  page,
  pageSize,
  modelName,
  where,
  orderBy,
  inlcude,
}: PaginationOptions<ModelName>) {
  try {
  } catch (error: any) {
    throw new Error("Data not found", error);
  }
}
