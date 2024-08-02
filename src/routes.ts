import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  TEST: 'test',
  WIN: 'win',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.TEST, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.WIN, '/win', []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
