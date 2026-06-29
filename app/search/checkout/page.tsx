import type { Viewport } from "next";
import { CheckoutScreen } from "./CheckoutScreen";

export const viewport: Viewport = {
  themeColor: "#213786",
  interactiveWidget: "resizes-content",
};

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};

  return <CheckoutScreen params={params} />;
}
