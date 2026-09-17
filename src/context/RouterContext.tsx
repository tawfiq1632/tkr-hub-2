import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface RouterState {
  pathname: string;
  search: string;
  params: Record<string, string>;
  navigate: (to: string, options?: { replace?: boolean }) => void;
  currentRoute: RouteInfo;
}

export type RouteType =
  | 'home'
  | 'shop'
  | 'category'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'track-order'
  | 'contact'
  | 'about'
  | 'admin'
  | 'not-found';

export interface RouteInfo {
  type: RouteType;
  param?: string;
  searchParams: URLSearchParams;
}

const RouterContext = createContext<RouterState | undefined>(undefined);

export function parseRoute(pathname: string, search: string): RouteInfo {
  const searchParams = new URLSearchParams(search);
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/' || cleanPath === '') {
    return { type: 'home', searchParams };
  }

  if (cleanPath === '/shop') {
    return { type: 'shop', searchParams };
  }

  if (cleanPath.startsWith('/category/')) {
    const slug = cleanPath.replace('/category/', '');
    return { type: 'category', param: decodeURIComponent(slug), searchParams };
  }

  if (cleanPath.startsWith('/product/')) {
    const slug = cleanPath.replace('/product/', '');
    return { type: 'product', param: decodeURIComponent(slug), searchParams };
  }

  if (cleanPath === '/cart') {
    return { type: 'cart', searchParams };
  }

  if (cleanPath === '/checkout') {
    return { type: 'checkout', searchParams };
  }

  if (cleanPath === '/order-confirmation') {
    return { type: 'order-confirmation', searchParams };
  }

  if (cleanPath === '/track-order') {
    return { type: 'track-order', searchParams };
  }

  if (cleanPath === '/contact') {
    return { type: 'contact', searchParams };
  }

  if (cleanPath === '/about') {
    return { type: 'about', searchParams };
  }

  if (cleanPath === '/admin') {
    return { type: 'admin', searchParams };
  }

  return { type: 'not-found', searchParams };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState<string>(() => window.location.pathname || '/');
  const [search, setSearch] = useState<string>(() => window.location.search || '');

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || '/');
      setSearch(window.location.search || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const url = new URL(to, window.location.origin);
    const targetPath = url.pathname || '/';
    const targetSearch = url.search || '';

    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }

    setPathname(targetPath);
    setSearch(targetSearch);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentRoute = parseRoute(pathname, search);

  return (
    <RouterContext.Provider value={{ pathname, search, params: {}, navigate, currentRoute }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({
  to,
  children,
  className = '',
  id,
  title,
  onClick
}: {
  to: string;
  children: ReactNode;
  className?: string;
  id?: string;
  title?: string;
  key?: React.Key;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    // Support cmd/ctrl click for opening in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} id={id} title={title}>
      {children}
    </a>
  );
}
