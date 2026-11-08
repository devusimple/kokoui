import * as React from "react";
import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle, type TextStyle } from "react-native";

export type ButtonProps = PressableProps & {
  children?: React.ReactNode;
  // TODO: variant, size, asChild/Slot pattern (shadcn-style)
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

// WIP: unfinished scaffold
export function Button({ children, style, textStyle, ...props }: ButtonProps) {
  return (
    <Pressable {...props} style={style}>
      {typeof children === "string" ? <Text style={textStyle}>{children}</Text> : children}
    </Pressable>
  );
}
