import { NavigatorScreenParams } from '@react-navigation/native';

export enum RootRoutes {
  AuthTabs = 'AuthTabs',
  MainTabs = 'MainTabs',
}

export enum AuthRoutes {
  Login = 'Login',
  SignUp = 'SignUp',
}

export enum MainRoutes {
  Home = 'Home',
  Store = 'Store',
  ProductDetails = 'ProductDetails',
  Checkout = 'Checkout',
  Profile = 'Profile',
  Category = 'Category',
  Cart = 'Cart',
  AddAddress = 'AddAddress',
  EditAddress = 'EditAddress',
}

export type RootStackParamsList = {
  [RootRoutes.AuthTabs]: undefined;
  [RootRoutes.MainTabs]: undefined;
};

export type AuthStackParamsList = {
  [AuthRoutes.Login]: undefined;
  [AuthRoutes.SignUp]: undefined;
};

export type MainTabParamsList = {
  [MainRoutes.Home]: undefined;
  [MainRoutes.Store]: undefined;
  [MainRoutes.Cart]: undefined;
};

export type MainStackParamsList = {
  MainTabs: NavigatorScreenParams<MainTabParamsList>;
  [MainRoutes.ProductDetails]: { productId: string };
  [MainRoutes.Checkout]: undefined;
  [MainRoutes.Profile]: undefined;
  [MainRoutes.Category]: undefined;
  [MainRoutes.AddAddress]: undefined;
  [MainRoutes.EditAddress]: { addressId: string };
};
