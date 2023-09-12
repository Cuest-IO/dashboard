import { Route as RouteData } from './Modules';
import modules from './Modules';

const routes: Record<string, RouteData> = {
  ...modules.reduce((acc, module) => ({
    ...acc,
    ...module.routes
  }), {}),
};

export default routes;
