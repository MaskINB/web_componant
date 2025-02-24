import { routes, matchRoute, normalizePath } from './routes.js';

// Handle route changes
export const urlLocationHandler = async () => {
    let path = window.location.pathname || "/";
    path = normalizePath(path);

    const route = matchRoute(path);
    const { template = '<h1>Something went wrong</h1>', title = `Error | E Cloth`, description = "An error occurred" } = route;

    try {
        const content = typeof template === 'function' ? await template() : template;
        const appElement = document.getElementById("app");
        if (appElement) {
            appElement.innerHTML = content;
            document.title = title;
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                document.head.appendChild(metaDescription);
            }
            metaDescription.content = description;
        } else {
            console.error('Element with id "app" not found.');
        }
    } catch (error) {
        console.error('Error handling route:', error);
        const appElement = document.getElementById("app");
        if (appElement) {
            appElement.innerHTML = '<h1>Something went wrong</h1>';
        }
    }
};

// Handle browser navigation (back/forward buttons)
window.onpopstate = urlLocationHandler;

// Initialize routing on page load
urlLocationHandler();

// Navigate to a new path
export function navigateTo(path) {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent('popstate'));
}
