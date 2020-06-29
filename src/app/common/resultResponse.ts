import { SearchResult } from './searchResult';

export class ResultResponse {
  result: SearchResult[];
  cld: SearchResult[];
  rbsd: SearchResult[];
  segmentation: SearchResult[];
  local: SearchResult[];
  features: string[];
  endpoints: string[];
}
