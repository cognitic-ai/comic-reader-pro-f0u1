import { ScrollView, View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import * as AC from "@bacons/apple-colors";
import { getReadingComics } from "@/data/comics";
import type { Comic } from "@/data/comics";

function ContinueReadingCard({ comic }: { comic: Comic }) {
  return (
    <Link href={`/read/${comic.id}`} asChild>
      <Link.Trigger>
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: AC.secondarySystemGroupedBackground,
              borderRadius: 16,
              borderCurve: "continuous",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              source={{ uri: comic.coverUrl }}
              style={{
                width: 80,
                height: 120,
              }}
              contentFit="cover"
              transition={200}
            />
            <View
              style={{
                flex: 1,
                padding: 12,
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: AC.label,
                    marginBottom: 4,
                  }}
                  numberOfLines={1}
                >
                  {comic.title}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: AC.secondaryLabel,
                  }}
                >
                  {comic.series} #{comic.issue}
                </Text>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: AC.tertiaryLabel,
                    }}
                  >
                    Page {comic.currentPage + 1} of {comic.totalPages}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
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
                    height: 4,
                    backgroundColor: AC.systemGray5,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: `${comic.progress}%`,
                      backgroundColor: AC.systemBlue,
                      borderRadius: 2,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                paddingRight: 16,
              }}
            >
              <SymbolView
                name="play.circle.fill"
                size={32}
                tintColor={AC.systemBlue as unknown as string}
              />
            </View>
          </View>
        </Pressable>
      </Link.Trigger>
      <Link.Preview />
    </Link>
  );
}

export default function ReadingRoute() {
  const insets = useSafeAreaInsets();
  const readingComics = getReadingComics();

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {readingComics.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
            }}
          >
            <SymbolView
              name="book.closed"
              size={48}
              tintColor={AC.tertiaryLabel as unknown as string}
            />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.label,
                marginTop: 16,
              }}
            >
              No Comics in Progress
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AC.secondaryLabel,
                textAlign: "center",
                marginTop: 8,
                maxWidth: 280,
              }}
            >
              Start reading a comic from your library to see it here
            </Text>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {readingComics.map((comic) => (
              <ContinueReadingCard key={comic.id} comic={comic} />
            ))}
          </View>
        )}
      </ScrollView>

      <Stack.Screen.Title large>Reading</Stack.Screen.Title>

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button onPress={() => {}}>Edit</Stack.Toolbar.Button>
      </Stack.Toolbar>

      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.Spacer />
        <Stack.Toolbar.Button
          icon="arrow.clockwise"
          onPress={() => {}}
        />
      </Stack.Toolbar>
    </>
  );
}
