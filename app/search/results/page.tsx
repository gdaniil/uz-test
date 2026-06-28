import type { Viewport } from "next";
import { SearchResultsScreen } from "./SearchResultsScreen";

export const viewport: Viewport = {
  themeColor: "#eff1f6",
};

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchResultsPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};

  return <SearchResultsScreen params={params} />;
}
