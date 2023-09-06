import { ScrollView, ScrollViewProps, View, ViewStyle } from "react-native";
import Colors from "../../assets/colors";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  props?: ScrollViewProps | ScrollViewProps[];
  ref?: React.Ref<ScrollView>;
  view?: 'View' | 'ScrollView';
}

function Screen({ children, style = {} , props = {}, ref, view='ScrollView'}: Props) {
  if (view === 'View') {
    return (
      <View style={{ flexGrow: 1, backgroundColor: Colors.themeBright, ...style }} {...props} {...ref}>
        {children}
      </View>
    );
  }
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.themeBright, ...style }} {...props} {...ref}>
      {children}
    </ScrollView>
  );
}

export default Screen;
