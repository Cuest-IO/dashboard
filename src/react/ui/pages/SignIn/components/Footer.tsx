import { Text, useTheme, View } from '@aws-amplify/ui-react';

export default function Footer() {
  const { tokens } = useTheme();
  return (
    <View textAlign='center' padding={tokens.space.large}>
      <Text color={tokens.colors.neutral[80]}>
        &copy; All Rights Reserved
      </Text>
    </View>
  );
}
