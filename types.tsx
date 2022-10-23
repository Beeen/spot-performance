/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Home Stack Types
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

// Home Tabs Stack Types
export type RootTabParamList = {
  BookTab: undefined;
  PurchaseTab: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// Onboarding Navigation Types
export type OnboardingStackParamList = {
    AppLoading: undefined;
    Login: undefined;
    SignupNickname: undefined;
};

export type OnboardingStackScreenProps<Screen extends keyof OnboardingStackParamList> = NativeStackScreenProps<
  OnboardingStackParamList,
  Screen
>;

export type AuthUserContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  isProfileLoaded: boolean;
  userId: string;
  onLoadingFinished: () => void;
  onSignOut: () => void;
  setUserId: (userId: string) => void;
};

export type Booking = {
  reference: string
  time: string
  user: string
}