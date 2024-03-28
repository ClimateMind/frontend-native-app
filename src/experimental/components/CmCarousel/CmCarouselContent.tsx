import { Text, View, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  style: any;
}

function CmCarouselContent({ children, style, ...rest }: Props) {
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
}

export default CmCarouselContent;
