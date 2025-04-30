import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  variant = 'primary',
  isLoading = false,
  icon,
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  // Get styles based on variant
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'danger' && styles.dangerButton,
    isLoading && styles.disabledButton,
    style
  ];

  const textStyleArray = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'danger' && styles.dangerText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={isLoading}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#fff' : '#3B5B92'} 
          size="small" 
        />
      ) : (
        <>
          {icon && (
            <Feather 
              name={icon} 
              size={16} 
              color={variant === 'primary' ? '#fff' : '#3B5B92'}
              style={styles.icon} 
            />
          )}
          <Text style={textStyleArray}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#3B5B92',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B5B92',
  },
  dangerButton: {
    backgroundColor: '#E53935',
  },
  disabledButton: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#3B5B92',
  },
  dangerText: {
    color: '#fff',
  },
  icon: {
    marginRight: 8,
  },
});