import type { Viewport } from "next";
import { WagonSelectScreen } from "./WagonSelectScreen";

export const viewport: Viewport = {
  themeColor: "#eff1f6",
};

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SeatsPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};

  return <WagonSelectScreen params={params} />;
}
