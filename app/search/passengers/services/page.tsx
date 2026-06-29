import type { Viewport } from "next";
import { AdditionalServicesScreen } from "./AdditionalServicesScreen";

export const viewport: Viewport = {
  themeColor: "#293f90",
  interactiveWidget: "resizes-content",
};

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PassengerServicesPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};

  return <AdditionalServicesScreen params={params} />;
}
