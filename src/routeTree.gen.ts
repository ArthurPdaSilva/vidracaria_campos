/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedLayoutImport } from './routes/_authenticated/_layout'

// Create Virtual Routes

const AuthenticatedLayoutServicesIndexLazyImport = createFileRoute(
  '/_authenticated/_layout/services/',
)()
const AuthenticatedLayoutProductsIndexLazyImport = createFileRoute(
  '/_authenticated/_layout/products/',
)()
const AuthenticatedLayoutGlasspriceIndexLazyImport = createFileRoute(
  '/_authenticated/_layout/glassprice/',
)()
const AuthenticatedLayoutDashboardIndexLazyImport = createFileRoute(
  '/_authenticated/_layout/dashboard/',
)()
const AuthenticatedLayoutCustomersIndexLazyImport = createFileRoute(
  '/_authenticated/_layout/customers/',
)()
const AuthenticatedLayoutServicesAddIndexLazyImport = createFileRoute(
  '/_authenticated/_layout/services/add/',
)()
const AuthenticatedLayoutProductsAddIndexLazyImport = createFileRoute(
  '/_authenticated/_layout/products/add/',
)()
const AuthenticatedLayoutCustomersAddIndexLazyImport = createFileRoute(
  '/_authenticated/_layout/customers/add/',
)()
const AuthenticatedLayoutServicesInfoIdLazyImport = createFileRoute(
  '/_authenticated/_layout/services/info/$id',
)()
const AuthenticatedLayoutServicesEditIdLazyImport = createFileRoute(
  '/_authenticated/_layout/services/edit/$id',
)()
const AuthenticatedLayoutProductsEditIdLazyImport = createFileRoute(
  '/_authenticated/_layout/products/edit/$id',
)()
const AuthenticatedLayoutCustomersEditIdLazyImport = createFileRoute(
  '/_authenticated/_layout/customers/edit/$id',
)()

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedLayoutRoute = AuthenticatedLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLayoutServicesIndexLazyRoute =
  AuthenticatedLayoutServicesIndexLazyImport.update({
    path: '/services/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/services/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutProductsIndexLazyRoute =
  AuthenticatedLayoutProductsIndexLazyImport.update({
    path: '/products/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/products/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutGlasspriceIndexLazyRoute =
  AuthenticatedLayoutGlasspriceIndexLazyImport.update({
    path: '/glassprice/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/glassprice/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutDashboardIndexLazyRoute =
  AuthenticatedLayoutDashboardIndexLazyImport.update({
    path: '/dashboard/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/dashboard/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutCustomersIndexLazyRoute =
  AuthenticatedLayoutCustomersIndexLazyImport.update({
    path: '/customers/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/customers/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutServicesAddIndexLazyRoute =
  AuthenticatedLayoutServicesAddIndexLazyImport.update({
    path: '/services/add/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/services/add/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutProductsAddIndexLazyRoute =
  AuthenticatedLayoutProductsAddIndexLazyImport.update({
    path: '/products/add/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/products/add/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutCustomersAddIndexLazyRoute =
  AuthenticatedLayoutCustomersAddIndexLazyImport.update({
    path: '/customers/add/',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/customers/add/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutServicesInfoIdLazyRoute =
  AuthenticatedLayoutServicesInfoIdLazyImport.update({
    path: '/services/info/$id',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/services/info/$id.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutServicesEditIdLazyRoute =
  AuthenticatedLayoutServicesEditIdLazyImport.update({
    path: '/services/edit/$id',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/services/edit/$id.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutProductsEditIdLazyRoute =
  AuthenticatedLayoutProductsEditIdLazyImport.update({
    path: '/products/edit/$id',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/products/edit/$id.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutCustomersEditIdLazyRoute =
  AuthenticatedLayoutCustomersEditIdLazyImport.update({
    path: '/customers/edit/$id',
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/_layout/customers/edit/$id.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_layout': {
      id: '/_authenticated/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedLayoutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_layout/customers/': {
      id: '/_authenticated/_layout/customers/'
      path: '/customers'
      fullPath: '/customers'
      preLoaderRoute: typeof AuthenticatedLayoutCustomersIndexLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/dashboard/': {
      id: '/_authenticated/_layout/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedLayoutDashboardIndexLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/glassprice/': {
      id: '/_authenticated/_layout/glassprice/'
      path: '/glassprice'
      fullPath: '/glassprice'
      preLoaderRoute: typeof AuthenticatedLayoutGlasspriceIndexLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/products/': {
      id: '/_authenticated/_layout/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof AuthenticatedLayoutProductsIndexLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/services/': {
      id: '/_authenticated/_layout/services/'
      path: '/services'
      fullPath: '/services'
      preLoaderRoute: typeof AuthenticatedLayoutServicesIndexLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/customers/edit/$id': {
      id: '/_authenticated/_layout/customers/edit/$id'
      path: '/customers/edit/$id'
      fullPath: '/customers/edit/$id'
      preLoaderRoute: typeof AuthenticatedLayoutCustomersEditIdLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/products/edit/$id': {
      id: '/_authenticated/_layout/products/edit/$id'
      path: '/products/edit/$id'
      fullPath: '/products/edit/$id'
      preLoaderRoute: typeof AuthenticatedLayoutProductsEditIdLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/services/edit/$id': {
      id: '/_authenticated/_layout/services/edit/$id'
      path: '/services/edit/$id'
      fullPath: '/services/edit/$id'
      preLoaderRoute: typeof AuthenticatedLayoutServicesEditIdLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/services/info/$id': {
      id: '/_authenticated/_layout/services/info/$id'
      path: '/services/info/$id'
      fullPath: '/services/info/$id'
      preLoaderRoute: typeof AuthenticatedLayoutServicesInfoIdLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/customers/add/': {
      id: '/_authenticated/_layout/customers/add/'
      path: '/customers/add'
      fullPath: '/customers/add'
      preLoaderRoute: typeof AuthenticatedLayoutCustomersAddIndexLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/products/add/': {
      id: '/_authenticated/_layout/products/add/'
      path: '/products/add'
      fullPath: '/products/add'
      preLoaderRoute: typeof AuthenticatedLayoutProductsAddIndexLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    '/_authenticated/_layout/services/add/': {
      id: '/_authenticated/_layout/services/add/'
      path: '/services/add'
      fullPath: '/services/add'
      preLoaderRoute: typeof AuthenticatedLayoutServicesAddIndexLazyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedLayoutRoute: AuthenticatedLayoutRoute.addChildren({
      AuthenticatedLayoutCustomersIndexLazyRoute,
      AuthenticatedLayoutDashboardIndexLazyRoute,
      AuthenticatedLayoutGlasspriceIndexLazyRoute,
      AuthenticatedLayoutProductsIndexLazyRoute,
      AuthenticatedLayoutServicesIndexLazyRoute,
      AuthenticatedLayoutCustomersEditIdLazyRoute,
      AuthenticatedLayoutProductsEditIdLazyRoute,
      AuthenticatedLayoutServicesEditIdLazyRoute,
      AuthenticatedLayoutServicesInfoIdLazyRoute,
      AuthenticatedLayoutCustomersAddIndexLazyRoute,
      AuthenticatedLayoutProductsAddIndexLazyRoute,
      AuthenticatedLayoutServicesAddIndexLazyRoute,
    }),
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/_layout"
      ]
    },
    "/_authenticated/_layout": {
      "filePath": "_authenticated/_layout.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_layout/customers/",
        "/_authenticated/_layout/dashboard/",
        "/_authenticated/_layout/glassprice/",
        "/_authenticated/_layout/products/",
        "/_authenticated/_layout/services/",
        "/_authenticated/_layout/customers/edit/$id",
        "/_authenticated/_layout/products/edit/$id",
        "/_authenticated/_layout/services/edit/$id",
        "/_authenticated/_layout/services/info/$id",
        "/_authenticated/_layout/customers/add/",
        "/_authenticated/_layout/products/add/",
        "/_authenticated/_layout/services/add/"
      ]
    },
    "/_authenticated/_layout/customers/": {
      "filePath": "_authenticated/_layout/customers/index.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/dashboard/": {
      "filePath": "_authenticated/_layout/dashboard/index.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/glassprice/": {
      "filePath": "_authenticated/_layout/glassprice/index.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/products/": {
      "filePath": "_authenticated/_layout/products/index.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/services/": {
      "filePath": "_authenticated/_layout/services/index.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/customers/edit/$id": {
      "filePath": "_authenticated/_layout/customers/edit/$id.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/products/edit/$id": {
      "filePath": "_authenticated/_layout/products/edit/$id.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/services/edit/$id": {
      "filePath": "_authenticated/_layout/services/edit/$id.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/services/info/$id": {
      "filePath": "_authenticated/_layout/services/info/$id.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/customers/add/": {
      "filePath": "_authenticated/_layout/customers/add/index.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/products/add/": {
      "filePath": "_authenticated/_layout/products/add/index.lazy.tsx",
      "parent": "/_authenticated/_layout"
    },
    "/_authenticated/_layout/services/add/": {
      "filePath": "_authenticated/_layout/services/add/index.lazy.tsx",
      "parent": "/_authenticated/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
