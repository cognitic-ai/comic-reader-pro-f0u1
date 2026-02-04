import { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  FlatList,
  ViewToken,
} from "react-native";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import * as AC from "@bacons/apple-colors";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { Comic } from "@/data/comics";

interface ComicReaderProps {
  comic: Comic;
  onClose: () => void;
}

export default function ComicReader({ comic, onClose }: ComicReaderProps) {
  const { width, height } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(comic.currentPage);
  const [showControls, setShowControls] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const controlsOpacity = useSharedValue(1);

  const toggleControls = () => {
    setShowControls((prev) => !prev);
    controlsOpacity.value = withTiming(showControls ? 0 : 1, { duration: 200 });
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentPage(viewableItems[0].index);
      }
    }
  ).current;

  const goToPage = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const controlsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        ref={flatListRef}
        data={comic.pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentPage}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <Pressable onPress={toggleControls} style={{ width, height }}>
            <Image
              source={{ uri: item }}
              style={{ width, height }}
              contentFit="contain"
              transition={100}
            />
          </Pressable>
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      {/* Top Controls */}
      {showControls && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            paddingTop: 60,
            paddingHorizontal: 16,
            paddingBottom: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Pressable
            onPress={onClose}
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <SymbolView
              name="xmark"
              size={20}
              tintColor="#fff"
            />
          </Pressable>
          <View style={{ flex: 1, marginHorizontal: 16 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
                textAlign: "center",
              }}
              numberOfLines={1}
            >
              {comic.title}
            </Text>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {comic.series} #{comic.issue}
            </Text>
          </View>
          <View style={{ width: 36 }} />
        </Animated.View>
      )}

      {/* Bottom Controls */}
      {showControls && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: 40,
            paddingHorizontal: 16,
            paddingTop: 16,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Page Navigation */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
            }}
          >
            <Pressable
              onPress={() => goToPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              style={{
                padding: 12,
                borderRadius: 24,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                opacity: currentPage === 0 ? 0.3 : 1,
              }}
            >
              <SymbolView
                name="chevron.left"
                size={24}
                tintColor="#fff"
              />
            </Pressable>

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "600",
                  fontVariant: ["tabular-nums"],
                }}
              >
                {currentPage + 1} / {comic.pages.length}
              </Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                Page
              </Text>
            </View>

            <Pressable
              onPress={() =>
                goToPage(Math.min(comic.pages.length - 1, currentPage + 1))
              }
              disabled={currentPage === comic.pages.length - 1}
              style={{
                padding: 12,
                borderRadius: 24,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                opacity: currentPage === comic.pages.length - 1 ? 0.3 : 1,
              }}
            >
              <SymbolView
                name="chevron.right"
                size={24}
                tintColor="#fff"
              />
            </Pressable>
          </View>

          {/* Page Dots */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 6,
              marginTop: 16,
            }}
          >
            {comic.pages.map((_, index) => (
              <Pressable
                key={index}
                onPress={() => goToPage(index)}
                style={{
                  width: index === currentPage ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    index === currentPage
                      ? AC.systemBlue
                      : "rgba(255, 255, 255, 0.3)",
                }}
              />
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
}
