import type { Viewport } from "next";
import { HomeScreen } from "./HomeScreen";

export const viewport: Viewport = {
  themeColor: "#213786",
};

export default function Home() {
  return <HomeScreen />;
}
