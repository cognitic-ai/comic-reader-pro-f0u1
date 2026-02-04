import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as AC from "@bacons/apple-colors";
import ComicCard from "@/components/comic-card";
import { comics } from "@/data/comics";

export default function LibraryRoute() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Calculate number of columns based on screen width
  const padding = 16;
  const gap = 12;
  const minCardWidth = 140;
  const availableWidth = width - padding * 2;
  const numColumns = Math.max(2, Math.floor((availableWidth + gap) / (minCardWidth + gap)));
  const cardWidth = (availableWidth - gap * (numColumns - 1)) / numColumns;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: AC.secondaryLabel,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 12,
          }}
        >
          All Comics ({comics.length})
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap,
          }}
        >
          {comics.map((comic) => (
            <View key={comic.id} style={{ width: cardWidth }}>
              <ComicCard comic={comic} showProgress />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
