import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

const texts = [
  'Explore how climate change impacts you personally and relates to your values.',
  'Stay informed on climate trends and developments to better understand the impacts of climate change.',
  'Discover climate solutions tailored to you.',
  'Start a conversation with a friend about climate change.',
]

const images =[
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
]

function TestComponent() {
  const [screen, setScreen] = useState(texts[0]);
  
  useEffect(() => {
    
  }, [])
  
  return (
    <View>
      {texts[screen]}
      <Button title="Post something" onPress={postSomething} />
    </View>
  );
}








































