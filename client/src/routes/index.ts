export enum PATHS {
  Root = '/',
  Welcome = '/welcome',
  MyInformation = '/my-information',
  MyFavorites = '/my-favorites',
  NotFound = '*'
}

export type PATHS_TYPE =
  | '/'
  | '/welcome'
  | '/my-information'
  | '/my-favorites'
  | '*';

interface NavigationItem {
  id: string;
  path: PATHS;
  name: keyof typeof PATHS;
  subRoute: boolean;
}

export const ROUTES: Array<NavigationItem> = [
  {
    id: '1',
    path: PATHS.Welcome,
    name: 'Welcome',
    subRoute: false
  },
  {
    id: '2',
    path: PATHS.MyInformation,
    name: 'MyInformation',
    subRoute: false
  },
  {
    id: '3',
    path: PATHS.MyFavorites,
    name: 'MyFavorites',
    subRoute: false
  }
];
