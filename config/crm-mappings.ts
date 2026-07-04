import {
  LEAD_CATEGORY_MAP,
  LeadCategoryKey,
  getCrmFields,
  getCategoryKeyFromProperty as getCategoryKeyFromPropertyImpl
} from "@/lib/leads/mapping";

export const CRM_CATEGORY_MAP = LEAD_CATEGORY_MAP;
export type CrmCategoryKey = LeadCategoryKey;

export function getCrmFieldsFromCategoryKey(key: string) {
  return getCrmFields(key);
}

export const getCategoryKeyFromProperty = getCategoryKeyFromPropertyImpl;
