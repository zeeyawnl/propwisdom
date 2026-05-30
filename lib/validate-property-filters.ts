import { PropertyQuerySchema, type PropertyQuery } from "@/lib/validations/property";

export function validatePropertyFilters(filters: unknown): PropertyQuery {
  const result = PropertyQuerySchema.safeParse(filters);
  if (!result.success) {
    throw new Error(`Filter validation failed: ${result.error.message}`);
  }
  return result.data as PropertyQuery;
}
