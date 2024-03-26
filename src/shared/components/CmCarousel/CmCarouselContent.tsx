import { Text, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

function CmCarouselContent({ children, ...rest }: Props) {
  return <View {...rest}>{children}</View>;
}

export default CmCarouselContent;
