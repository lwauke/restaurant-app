import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Rating } from '@/components/ui/rating';
import { Textarea } from '@/components/ui/textarea';
import { submitRating } from '@/api/rating';

const SCREEN_OPTIONS = {
  light: {
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ThemeToggle />,
  },
};

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [ratingStars, setRatingStars] = useState(5);
  const [comment, setComment] = useState("");
  const { id, restaurantName } = useLocalSearchParams();

  const handlePress = () => {
    submitRating({
      stars: ratingStars,
      comment,
      restaurantId: id as string
    });
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
      <Text>How many stars does {restaurantName} deserves?</Text>
      <Rating
        max={5}
        initial={ratingStars}
        onChange={setRatingStars}
      />
      <Textarea placeholder="Comment" onChangeText={setComment}/>
      <Button onPress={handlePress}>
        <Text>Submit</Text>
      </Button>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Text>

    </Text>
  );
}
