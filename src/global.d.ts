export {};

declare global {
  type CountryType = {
    id: number;
    domains?: string[];
    country: string;
    alpha_two_code: string;
    "state-province"?: string | null;
    web_pages?: string[];
    name?: string;
    count?: number;
  };
  type Order = "asc" | "desc";
}
