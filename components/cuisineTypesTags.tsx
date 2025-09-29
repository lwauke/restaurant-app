import { CuisineType } from "@/interfaces/cuisineType.interface";
import clsx from "clsx";
import React from "react";
import { Text, ScrollView } from "react-native";
import { Button } from "./ui/button";

interface CuisineTypeTagsProps {
  onPress: (cuisines: CuisineType) => void;
  selectedCuisinesIds: string[];
  cuisines: CuisineType[];
  error: Error | null;
  loading: boolean;
}

export function CuisineTypeTags({
  onPress,
  selectedCuisinesIds,
  cuisines,
  error,
  loading,
}: CuisineTypeTagsProps) {
  if (error) {
    return <Text>Error fetching cuisine types</Text>;
  }
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
      {cuisines.map((cuisine) => {
        const isSelected = selectedCuisinesIds.includes(cuisine.id);
        return (
          <Button
            key={cuisine.id}
            onPress={() => onPress(cuisine)}
            className={clsx(
              "mr-3 rounded-lg px-4 py-2",
              isSelected ? "bg-gray-700 dark:bg-gray-200" : "bg-gray-200 dark:bg-gray-700"
            )}>
            <Text
              className={clsx(
                "text-sm font-medium",
                isSelected ? "text-gray-100 dark:text-gray-900" : "text-gray-900 dark:text-gray-100"
              )}>
              {cuisine.description}
            </Text>
          </Button>
        );
      })}
    </ScrollView>
  );
}
