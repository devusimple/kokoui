// WIP: React Native's type declarations may be resolved by the consuming app/toolchain.
// This stub keeps `tsc --noEmit` working for the library scaffold.
// TODO: replace with proper RN type resolution (Metro/app tsconfig or published types strategy).

declare module "react-native" {
  import type * as React from "react";

  export interface PressableStateCallbackType {
    pressed: boolean;
  }

  export type StyleProp<T> = T | undefined | null | false | readonly StyleProp<T>[];
  export type ViewStyle = Record<string, unknown>;
  export type TextStyle = Record<string, unknown>;

  export type PressableProps = React.ComponentPropsWithoutRef<"button"> & {
    style?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
    children?: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode);
  };

  export const Pressable: React.ComponentType<PressableProps>;

  export type TextProps = { style?: StyleProp<TextStyle>; children?: React.ReactNode };
  export const Text: React.ComponentType<TextProps>;
}
