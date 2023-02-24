import Controller from './controller';
import { OnReloadPage } from './types/type';

type Route = {
    path: string;
    onReloadPage: OnReloadPage;
};

export class Router {
    public readonly routes: Route[];
    public readonly routesSet: Set<string>;
    public readonly controller: Controller;

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
        let id: number|string = 0;

        if (hash !== '') {
            path = hash.substring(1).split('/')[0];
            id = hash.substring(1).split('/')[1];
        }

        if (this.routesSet.has(path)) {
            this.routes.forEach((route) => {
                if (route.path === path) {
                    if (Number.isNaN(Number(id))){
                        route.onReloadPage(id);
                    }
                    else {
                        route.onReloadPage(Number(id));
                    }
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
