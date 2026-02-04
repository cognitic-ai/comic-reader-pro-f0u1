import { useState, useMemo } from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as AC from "@bacons/apple-colors";
import ComicCard from "@/components/comic-card";
import { comics } from "@/data/comics";

type SortOption = "title" | "series" | "recent";

export default function LibraryRoute() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("title");

  // Calculate number of columns based on screen width
  const padding = 16;
  const gap = 12;
  const minCardWidth = 140;
  const availableWidth = width - padding * 2;
  const numColumns = Math.max(2, Math.floor((availableWidth + gap) / (minCardWidth + gap)));
  const cardWidth = (availableWidth - gap * (numColumns - 1)) / numColumns;

  const filteredComics = useMemo(() => {
    let result = [...comics];

    // Filter by search
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (comic) =>
          comic.title.toLowerCase().includes(query) ||
          comic.series.toLowerCase().includes(query) ||
          comic.author.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "series":
        result.sort((a, b) => a.series.localeCompare(b.series) || a.issue - b.issue);
        break;
      case "recent":
        result.sort((a, b) => b.progress - a.progress);
        break;
    }

    return result;
  }, [search, sortBy]);

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {filteredComics.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.label,
              }}
            >
              No Results
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AC.secondaryLabel,
                marginTop: 4,
              }}
            >
              Try a different search term
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap,
            }}
          >
            {filteredComics.map((comic) => (
              <View key={comic.id} style={{ width: cardWidth }}>
                <ComicCard comic={comic} showProgress />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Stack.Screen.Title large>Library</Stack.Screen.Title>
      <Stack.SearchBar
        placeholder="Search comics"
        onChangeText={(e) => setSearch(e.nativeEvent.text)}
      />

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Menu icon="ellipsis.circle">
          <Stack.Toolbar.Menu inline title="Sort By">
            <Stack.Toolbar.MenuAction
              icon="textformat.abc"
              isOn={sortBy === "title"}
              onPress={() => setSortBy("title")}
            >
              Title
            </Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction
              icon="books.vertical"
              isOn={sortBy === "series"}
              onPress={() => setSortBy("series")}
            >
              Series
            </Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction
              icon="clock"
              isOn={sortBy === "recent"}
              onPress={() => setSortBy("recent")}
            >
              Recently Read
            </Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
        </Stack.Toolbar.Menu>
      </Stack.Toolbar>

      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.SearchBarSlot />
        <Stack.Toolbar.Button
          icon="plus"
          onPress={() => {}}
          separateBackground
        />
      </Stack.Toolbar>
    </>
  );
}
