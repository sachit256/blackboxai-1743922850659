import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING } from '../constants/fonts';

const Button = ({
  onPress,
  title,
  variant = 'primary', // primary, secondary, outline
  size = 'medium', // small, medium, large
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyles = () => {
    const baseStyle = [styles.button, styles[`${size}Button`]];
    
    if (variant === 'primary') {
      baseStyle.push(styles.primaryButton);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      baseStyle.push(styles.outlineButton);
    }

    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyles = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];

    if (variant === 'outline') {
      baseStyle.push(styles.outlineText);
    }

    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    if (textStyle) {
      baseStyle.push(textStyle);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyles()}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.text.disabled,
    borderColor: COLORS.text.disabled,
  },
  smallButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    minHeight: 32,
  },
  mediumButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    minHeight: 44,
  },
  largeButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    minHeight: 54,
  },
  text: {
    color: COLORS.white,
    fontWeight: FONTS.weights.medium,
    textAlign: 'center',
  },
  outlineText: {
    color: COLORS.primary,
  },
  disabledText: {
    color: COLORS.white,
  },
  smallText: {
    fontSize: FONTS.sizes.sm,
  },
  mediumText: {
    fontSize: FONTS.sizes.md,
  },
  largeText: {
    fontSize: FONTS.sizes.lg,
  },
});

export default Button;