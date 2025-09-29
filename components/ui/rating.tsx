import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Star } from 'lucide-react-native';
import { Text } from '@/components/ui/text';

type RatingProps = {
  max?: number;
  initial?: number;
  onChange?: (value: number) => void;
};

export function Rating({ max = 5, initial = 0, onChange }: RatingProps) {
  const [rating, setRating] = useState(initial);

  const handlePress = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {Array.from({ length: max }).map((_, i) => {
        const value = i + 1;
        const filled = value <= rating;
        return (
          <Pressable key={value} onPress={() => handlePress(value)}>
            <Star
              size={32}
              color={filled ? 'gold' : 'gray'}
              fill={filled ? 'gold' : 'transparent'}
            />
          </Pressable>
        );
      })}
      <Text style={{ marginLeft: 8 }}>
        {rating}/{max}
      </Text>
    </View>
  );
}
