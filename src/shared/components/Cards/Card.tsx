import { StyleSheet, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;
}

function Card({ children, ...rest }: Props) {
  return <View {...rest} style={[styles.card, rest.style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
  },
});

export default Card;
