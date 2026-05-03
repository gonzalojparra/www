import type { Metadata } from "next";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { EmailBlock } from "@/components/email-block";
import { Channels } from "@/components/channels";

export const metadata: Metadata = {
  title: "Contact — Gonzalo Parra",
  description: "Get in touch with Gonzalo Parra.",
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <SectionHeading>contact</SectionHeading>
      <p className="m-0 mb-4 text-(--ink-2)">
        feel free to get in touch through any channel below — for project inquiries, questions, or if you just want to talk. i&apos;m always open to new opportunities and challenges ^^
      </p>
      <EmailBlock />
      <Channels />
    </PageWrapper>
  );
}
