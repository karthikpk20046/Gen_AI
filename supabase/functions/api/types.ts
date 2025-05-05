export interface Assessment {
  id: string;
  name: string;
  url: string;
  remoteTestingSupport: boolean;
  adaptiveSupport: boolean;
  duration: string;
  testType: string;
  description?: string;
  suitability?: number;
}