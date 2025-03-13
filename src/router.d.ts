import { RouterOptions, Router } from './types';

/**
 * Router类的默认导出
 */
declare class RouterClass implements Router {
  constructor(options: RouterOptions);
  
  currentRoute: any;
  $lockStatus: boolean;
  
  beforeEach(guard: any): () => void;
  afterEach(hook: any): () => void;
  beforeResolve(guard: any): () => void;
  isReady(): Promise<void>;
  push(to: any): Promise<void>;
  pushTab(to: any): Promise<void>;
  replace(to: any): Promise<void>;
  replaceAll(to: any): Promise<void>;
  back(delta?: number): Promise<void>;
  onError(callback: any): () => void;
  addRoute(route: any): void;
  removeRoute(name: string): void;
  getRoutes(): any[];
}

export default RouterClass; 