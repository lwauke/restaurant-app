import { View } from "react-native";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

interface SearchBarProps {
  onSubmit: () => void;
  onChangeText: (value: string) => void; 
  placeholder?: string;
}
export function SearchBar({ onSubmit, placeholder, onChangeText }: SearchBarProps) {
  return <View className="flex-row items-center space-x-2 px-4 my-2 py-2 bg-transparent">
    <Input
      placeholder={placeholder}
      className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-700"
      onChangeText={onChangeText}
    />
    <Button
      onPress={onSubmit}
      className="bg-blue-500 dark:bg-blue-600 rounded-lg px-4 py-2 shadow-md ml-2"
    >
      <Text className="text-white font-medium">Search</Text>
    </Button>
  </View>
}