export const getWebUrl = (path: string = ""): string => {
  return `${window.location.origin + path}`;
};

export function checkNestedRoute(passedRoute: string): boolean {
  const currentRoute = window.location.pathname;
  if (passedRoute === currentRoute) return false;
  return currentRoute.startsWith(passedRoute);
}

export function isPathOrSubpath(currentPath: string, paths: string[]): boolean {
  return paths.some((path) => currentPath.startsWith(path));
}

export function getBasePath(url: string): string {
  const parts = url.split("/");

  const result = parts.slice(2, parts.length).join("/");
  return `/${result}`;
}
