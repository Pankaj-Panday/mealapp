import { NavigatorScreenParams } from '@react-navigation/native';

export enum RootRoutes {
  Auth = 'Auth',
  Main = 'Main',
}

export enum MainRoutes {
  Home = 'Home',
  Store = 'Store',
  Category = 'Category',
}

export enum AuthRoutes {
  Login = 'Login',
  SignUp = 'SignUp',
}

export type AuthStackParamList = {
  [AuthRoutes.Login]: undefined;
  [AuthRoutes.SignUp]: undefined;
};

export type MainTabParamList = {
  [MainRoutes.Home]: undefined;
  [MainRoutes.Store]: undefined;
};

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  [MainRoutes.Home]: undefined;
  [MainRoutes.Store]: undefined;
  [MainRoutes.Category]: { categoryId: string };
};

export type RootStackParamList = {
  [RootRoutes.Auth]: NavigatorScreenParams<AuthStackParamList>;
  [RootRoutes.Main]: NavigatorScreenParams<MainStackParamList>;
};
