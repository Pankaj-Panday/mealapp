import { NavigatorScreenParams } from '@react-navigation/native';

export enum RootRoutes {
  Auth = 'Auth',
  Main = 'Main',
}

export enum MainRoutes {
  Home = 'Home',
  Store = 'Store',
  Category = 'Category',
  Cart = 'Cart',
  Checkout = 'Checkout',
  Profile = 'Profile',
  AddAddress = 'AddAddress',
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
  [MainRoutes.Category]: { categoryId: string };
  [MainRoutes.Cart]: undefined;
  [MainRoutes.Checkout]: undefined;
  [MainRoutes.Profile]: undefined;
  [MainRoutes.AddAddress]: undefined;
};

export type RootStackParamList = {
  [RootRoutes.Auth]: NavigatorScreenParams<AuthStackParamList>;
  [RootRoutes.Main]: NavigatorScreenParams<MainStackParamList>;
};
