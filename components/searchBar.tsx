import { View } from 'react-native';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Text } from './ui/text';

interface SearchBarProps {
  onSubmit: () => void;
  onChangeText: (value: string) => void;
  placeholder?: string;
}
export function SearchBar({ onSubmit, placeholder, onChangeText }: SearchBarProps) {
  return (
    <View className="my-2 flex-row items-center space-x-2 bg-transparent px-4 py-2">
      <Input
        placeholder={placeholder}
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        onChangeText={onChangeText}
      />
      <Button
        onPress={onSubmit}
        className="ml-2 rounded-lg bg-blue-500 px-4 py-2 shadow-md dark:bg-blue-600">
        <Text className="font-medium text-white">Search</Text>
      </Button>
    </View>
  );
}
