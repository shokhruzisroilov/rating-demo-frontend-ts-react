export interface College {
  id: number;
  code: string;
  name: string;
  region: string;
  type: "STATE" | "PRIVATE";
  active: boolean;
}

export interface CollegesResponse {
  content: College[];
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
  totalElements: number;
}
