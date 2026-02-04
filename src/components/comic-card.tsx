import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import type { Comic } from "@/data/comics";

interface ComicCardProps {
  comic: Comic;
  showProgress?: boolean;
}

export default function ComicCard({ comic, showProgress = false }: ComicCardProps) {
  return (
    <Link href={`/comic/${comic.id}`} asChild>
      <Link.Trigger>
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <View
            style={{
              borderRadius: 12,
              borderCurve: "continuous",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Image
              source={{ uri: comic.coverUrl }}
              style={{
                width: "100%",
                aspectRatio: 2 / 3,
              }}
              contentFit="cover"
              transition={200}
            />
            {showProgress && comic.progress > 0 && (
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${comic.progress}%`,
                    backgroundColor: AC.systemBlue,
                  }}
                />
              </View>
            )}
          </View>
          <View style={{ marginTop: 8, gap: 2 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: AC.label,
              }}
              numberOfLines={1}
            >
              {comic.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: AC.secondaryLabel,
              }}
              numberOfLines={1}
            >
              {comic.series} #{comic.issue}
            </Text>
          </View>
        </Pressable>
      </Link.Trigger>
      <Link.Preview />
      <Link.Menu>
        <Link.MenuAction
          title="Read Now"
          icon="book.fill"
          onPress={() => {}}
        />
        <Link.MenuAction
          title="Add to Reading List"
          icon="bookmark"
          onPress={() => {}}
        />
        <Link.MenuAction
          title="Share"
          icon="square.and.arrow.up"
          onPress={() => {}}
        />
      </Link.Menu>
    </Link>
  );
}
