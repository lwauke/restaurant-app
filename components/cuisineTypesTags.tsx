import { getCuisineTypes } from "@/api/cuisineType";
import { CuisineType } from "@/interfaces/cuisineType.interface";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Button } from "./ui/button";

interface CuisineTypeTagsProps {
  onPress: (cuisines: CuisineType) => void;
  selectedCuisinesIds: string[];
  cuisines: CuisineType[];
}

export function CuisineTypeTags({
  onPress,
  selectedCuisinesIds,
  cuisines
}: CuisineTypeTagsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4"
    >
      {cuisines.map((cuisine) => {
        const isSelected = selectedCuisinesIds.includes(cuisine.id)
        return (
          <Button
            key={cuisine.id}
            onPress={() => onPress(cuisine)}
            className={
              clsx(
                "px-4 py-2 rounded-lg mr-3",
                isSelected
                  ? "dark:bg-gray-200 bg-gray-700"
                  : "bg-gray-200 dark:bg-gray-700"
              )
            }
          >
            <Text
              className={
                clsx(
                  "text-sm font-medium",
                  isSelected
                    ? "dark:text-gray-900 text-gray-100"
                    : "text-gray-900 dark:text-gray-100"
                  
                )
              }
            >
              {cuisine.description}
            </Text>
          </Button>
        )
    })}
    </ScrollView>
  );
}

