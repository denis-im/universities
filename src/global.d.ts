export {};

declare global {
  type CountryType = {
    domains?: String[];
    country: String;
    alpha_two_code: String;
    "state-province"?: String | null;
    web_pages?: String[];
    name: String;
  };
}
