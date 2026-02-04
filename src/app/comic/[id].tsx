import { ScrollView, View, Text, Pressable, useWindowDimensions } from "react-native";
import { useLocalSearchParams, Link, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as AC from "@bacons/apple-colors";
import { getComicById } from "@/data/comics";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";

const AppleStackPreset: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : isLiquidGlassAvailable()
    ? {
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          color: AC.label as any,
        },
        headerBlurEffect: "none",
        headerBackButtonDisplayMode: "minimal",
      }
    : {
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "default",
      };

export default function ComicDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const comic = getComicById(id);

  if (!comic) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: AC.label }}>Comic not found</Text>
      </View>
    );
  }

  const coverWidth = Math.min(width * 0.5, 200);
  const coverHeight = coverWidth * 1.5;

  return (
    <>
      <Stack.Screen
        options={{
          ...AppleStackPreset,
          title: comic.title,
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 16,
        }}
      >
        {/* Hero Section */}
        <View
          style={{
            alignItems: "center",
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              borderRadius: 12,
              borderCurve: "continuous",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Image
              source={{ uri: comic.coverUrl }}
              style={{
                width: coverWidth,
                height: coverHeight,
              }}
              contentFit="cover"
              transition={200}
            />
          </View>

          <Text
            selectable
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: AC.label,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {comic.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: AC.secondaryLabel,
              marginTop: 4,
            }}
          >
            {comic.series} #{comic.issue}
          </Text>
        </View>

        {/* Read Button */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <Link href={`/read/${comic.id}`} asChild>
            <Pressable
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                backgroundColor: AC.systemBlue,
                paddingVertical: 14,
                borderRadius: 12,
                borderCurve: "continuous",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <SymbolView name="book.fill" size={20} tintColor="#fff" />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                {comic.progress > 0 ? "Continue Reading" : "Start Reading"}
              </Text>
            </Pressable>
          </Link>
        </View>

        {/* Progress */}
        {comic.progress > 0 && (
          <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <View
              style={{
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 14, color: AC.secondaryLabel }}>
                  Reading Progress
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: AC.systemBlue,
                    fontWeight: "600",
                    fontVariant: ["tabular-nums"],
                  }}
                >
                  {comic.progress}%
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  backgroundColor: AC.systemGray5,
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${comic.progress}%`,
                    backgroundColor: AC.systemBlue,
                    borderRadius: 3,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: AC.tertiaryLabel,
                  marginTop: 8,
                }}
              >
                Page {comic.currentPage + 1} of {comic.totalPages}
              </Text>
            </View>
          </View>
        )}

        {/* Description */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: AC.secondaryLabel,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            About
          </Text>
          <Text
            selectable
            style={{
              fontSize: 15,
              color: AC.label,
              lineHeight: 22,
            }}
          >
            {comic.description}
          </Text>
        </View>

        {/* Details */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
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
            Details
          </Text>
          <View
            style={{
              backgroundColor: AC.secondarySystemGroupedBackground,
              borderRadius: 12,
              borderCurve: "continuous",
              overflow: "hidden",
            }}
          >
            <DetailRow label="Author" value={comic.author} />
            <DetailRow label="Artist" value={comic.artist} showDivider />
            <DetailRow label="Release Year" value={comic.releaseDate} showDivider />
            <DetailRow label="Pages" value={`${comic.totalPages}`} showDivider />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function DetailRow({
  label,
  value,
  showDivider = false,
}: {
  label: string;
  value: string;
  showDivider?: boolean;
}) {
  return (
    <View>
      {showDivider && (
        <View
          style={{
            height: 0.5,
            backgroundColor: AC.separator,
            marginLeft: 16,
          }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 15, color: AC.label }}>{label}</Text>
        <Text selectable style={{ fontSize: 15, color: AC.secondaryLabel }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
