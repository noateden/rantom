export interface ICachingService {
  name: string;
  getCachingData: (name: string) => Promise<any>;
  setCachingData: (name: string, data: any) => Promise<void>;
}
