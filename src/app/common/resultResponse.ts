import { SearchResult } from './searchResult';

export class ResultResponse {
  result: SearchResult[];
  cld: SearchResult[];
  rbsd: SearchResult[];
  features: string[];
}
