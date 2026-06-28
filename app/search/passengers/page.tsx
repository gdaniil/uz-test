import type { Viewport } from "next";
import { PassengerDetailsScreen } from "./PassengerDetailsScreen";

export const viewport: Viewport = {
  themeColor: "#293f90",
  interactiveWidget: "resizes-content",
};

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PassengersPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};

  return <PassengerDetailsScreen params={params} />;
}
