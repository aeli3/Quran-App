import React from 'react';
import { Text, TextProps } from 'react-native';

interface MyTextProps extends TextProps {
  children: React.ReactNode;
}

export default function MyText({ children, ...props }: MyTextProps) {
  return (
    <Text style={[{ fontFamily: "Poppins" }, props.style]} {...props}>
      {children}
    </Text>
  );
}