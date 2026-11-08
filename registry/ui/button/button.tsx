import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<PressableProps, 'style'> {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    rounded?: boolean | number;
    // Style overrides
    style?: ViewStyle;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

const theme = {
    primary: '#111827',
    primaryText: '#FFFFFF',
    secondary: '#F3F4F6',
    secondaryText: '#111827',
    outlineBorder: '#E5E7EB',
    danger: '#EF4444',
    disabled: '#9CA3AF',
};

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    rounded,
    style,
    textStyle,
    containerStyle,
    ...pressableProps
}) => {
    const isDisabled = disabled || loading;

    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'secondary': return { backgroundColor: theme.secondary };
            case 'outline': return { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.outlineBorder };
            case 'ghost': return { backgroundColor: 'transparent' };
            case 'danger': return { backgroundColor: theme.danger };
            default: return { backgroundColor: theme.primary };
        }
    };

    const getTextColor = (): string => {
        if (variant === 'secondary' || variant === 'outline' || variant === 'ghost') {
            return variant === 'danger' ? theme.danger : theme.secondaryText;
        }
        return variant === 'danger' ? '#fff' : theme.primaryText;
    };

    const getSizeStyle = (): { container: ViewStyle; text: TextStyle } => {
        switch (size) {
            case 'sm': return { container: { paddingVertical: 8, paddingHorizontal: 12 }, text: { fontSize: 14 } };
            case 'lg': return { container: { paddingVertical: 14, paddingHorizontal: 24 }, text: { fontSize: 18 } };
            case 'xl': return { container: { paddingVertical: 18, paddingHorizontal: 32 }, text: { fontSize: 20 } };
            default: return { container: { paddingVertical: 12, paddingHorizontal: 20 }, text: { fontSize: 16 } };
        }
    };

    const sizeStyle = getSizeStyle();

    return (
        <View style={[fullWidth && { width: '100%' }, containerStyle]}>
            <Pressable
                disabled={isDisabled}
                style={({ pressed }) => [
                    styles.base,
                    getVariantStyle(),
                    sizeStyle.container,
                    typeof rounded === 'number' ? { borderRadius: rounded } : rounded ? styles.roundedFull : styles.rounded,
                    fullWidth && { width: '100%' },
                    isDisabled && styles.disabled,
                    pressed && !isDisabled && styles.pressed,
                    style,
                ]}
                {...pressableProps}
            >
                {loading ? (
                    <ActivityIndicator color={getTextColor()} />
                ) : (
                    <View style={styles.content}>
                        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
                        <Text style={[styles.text, { color: getTextColor() }, sizeStyle.text, textStyle]}>{title}</Text>
                        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
                    </View>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    base: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
    rounded: { borderRadius: 12 },
    roundedFull: { borderRadius: 999 },
    disabled: { opacity: 0.5 },
    pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
    content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    text: { fontWeight: '600', textAlign: 'center' },
    iconLeft: { marginRight: 8 },
    iconRight: { marginLeft: 8 },
});