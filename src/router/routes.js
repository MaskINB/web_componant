import Home from '../pages/Home.js';
import Category from '../pages/Category.js';
import Product from '../pages/Product.js';

const urlPageTitle = "E Cloth";

export const routes = {
    "/": {
        template: Home,
        title: `Home | ${urlPageTitle}`,
        description: "Home",
    },
    "/category/:name": {
        template: Category,
        title: `Category | ${urlPageTitle}`,
        description: "Category Details",
    },
    "/category": {
        template: Category,
        title: `Category | ${urlPageTitle}`, 
        description: "Category Details",
    },
    "/product/:id": {
        template: Product,
        title: `Product | ${urlPageTitle}`,
        description: "Product Details",
    },
    "/product": {
        template: Product,
        title: `Product | ${urlPageTitle}`,
        description: "Product Details",
    },
    404: {
        template: '<h1>404 Not Found</h1>',
        title: `404 | ${urlPageTitle}`,
        description: "Page Not Found",
    }
};

// Normalize path to handle extra slashes
export const normalizePath = (path) => {
    return path.replace(/\/+$/, '') || '/';
};

// Function to match the route based on path
export const matchRoute = (path) => {
    path = normalizePath(path);

    if (routes[path]) {
        return routes[path];
    }

    const matchedRoute = Object.entries(routes).find(([routePath]) => {
        const routePattern = new RegExp(`^${routePath.replace(/:\w+/g, '\\w+')}$`);
        return routePattern.test(path);
    });

    return matchedRoute ? matchedRoute[1] : routes[404];
};
