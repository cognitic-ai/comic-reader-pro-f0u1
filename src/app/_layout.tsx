import { ThemeProvider } from "@/components/theme-provider";
import { SymbolView } from "expo-symbols";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions, View } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <TabsLayout />
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="(library)"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
              <SymbolView name="books.vertical" size={size - 4} tintColor={color} />
            </View>
          ),
        }}
      />
      <WebTabs.Screen
        name="(reading)"
        options={{
          title: "Reading",
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
              <SymbolView name="book" size={size - 4} tintColor={color} />
            </View>
          ),
        }}
      />
      <WebTabs.Screen
        name="comic/[id]"
        options={{
          href: null,
        }}
      />
      <WebTabs.Screen
        name="read/[id]"
        options={{
          href: null,
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(library)">
        <NativeTabs.Trigger.Label>Library</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "books.vertical", selected: "books.vertical.fill" } },
            default: { sf: "books.vertical" },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(reading)">
        <NativeTabs.Trigger.Label>Reading</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "book", selected: "book.fill" } },
            default: { sf: "book" },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
