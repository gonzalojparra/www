import type { Metadata } from "next";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { CareerList } from "@/components/career-list";

export const metadata: Metadata = {
  title: "Career — Gonzalo Parra",
  description: "Career & Works",
};

export default function CareerPage() {
  return (
    <PageWrapper>
      <SectionHeading>career &amp; works</SectionHeading>
      <CareerList />
    </PageWrapper>
  );
}
