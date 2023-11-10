import { forwardRef, ReactNode } from 'react';
import { ScrollView, ScrollViewProps, View, ViewStyle } from 'react-native';

import Colors from 'src/assets/colors';

interface Props {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  props?: ScrollViewProps | ScrollViewProps[];
  view?: 'View' | 'ScrollView';
}

const Screen = forwardRef<ScrollView, Props>(({ children, style = {}, props = {}, view = 'ScrollView' }, ref) => {
    if (view === 'View') {
      return (
        <View
          style={{ flexGrow: 1, backgroundColor: Colors.themeBright, ...style }}
          {...props}
        >
          {children}
        </View>
      );
    }

    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.themeBright,
          ...style,
        }}
        {...props}
        ref={ref}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }
);

export default Screen;
