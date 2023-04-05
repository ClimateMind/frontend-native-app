import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  children: React.ReactNode
}

function PageTitle({ children }: Props) {
  return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PageTitle;
