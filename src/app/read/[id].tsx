import { View, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { getComicById } from "@/data/comics";
import ComicReader from "@/components/comic-reader";

export default function ReadComicRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const comic = getComicById(id);

  if (!comic) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <ComicReader
          comic={comic}
          onClose={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
        />
      </View>
    </>
  );
}
