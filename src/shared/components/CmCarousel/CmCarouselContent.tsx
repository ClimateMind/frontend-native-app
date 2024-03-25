import { Text, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

function CmCarouselContent({ children }: Props) {
  return <View>{children}</View>;
}

export default CmCarouselContent;
