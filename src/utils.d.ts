/**
 * 工具函数类型声明
 */

/**
 * 解析URL参数
 */
export function parseQuery(query: string): Record<string, string>;

/**
 * 将对象转换为URL参数字符串
 */
export function stringifyQuery(obj: Record<string, any>): string;

/**
 * 解析路由路径
 */
export function parsePath(path: string): {
  path: string;
  query: Record<string, string>;
  hash: string;
};

/**
 * 标准化路由路径
 */
export function normalizePath(path: string): string;

/**
 * 解析路由位置
 */
export function parseLocation(to: any): {
  path: string;
  query: Record<string, any>;
  hash: string;
};

/**
 * 创建路由位置
 */
export function createLocation(to: any): {
  path: string;
  fullPath: string;
  query: Record<string, any>;
  hash: string;
  params: Record<string, any>;
  name: string | null;
  meta: Record<string, any>;
  matched: any[];
}; 