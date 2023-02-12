import Controller from './controller';
import { OnReloadPage } from './types/type';

type Route = {
    path: string;
    onReloadPage: OnReloadPage;
};

export class Router {
    public routes: Route[];
    public routesSet: Set<string>;
    public controller: Controller;

    constructor() {
        this.routes = [];
        this.routesSet = new Set<string>();
        this.controller = new Controller();
    }

    public updateUrl(path: string): void {
        window.event?.stopPropagation();
        window.history.pushState({ page: path }, '', `${window.location.origin}${path}`);
        this.handleLocation();
    }

    public handleLocation(): void {
        let path = window.location.pathname;
        const hash = window.location.hash;
        let id = 0;

        if (hash !== '') {
            path = hash.substring(1).split('/')[0];
            id = Number(hash.substring(1).split('/')[1]);
        }

        if (this.routesSet.has(path)) {
            this.routes.forEach((route) => {
                if (route.path === path) {
                    route.onReloadPage(Number(id));
                }
            });
        }
    }

    public addRoute(path: string, onReloadPage: OnReloadPage): void {
        this.routesSet.add(path);
        const route: Route = { path, onReloadPage };
        this.routes.push(route);
    }
}
