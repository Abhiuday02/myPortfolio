"use client";

import React from "react";
import Link from "next/link";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  pdf: string;
};

const certificates: Certificate[] = [
  {
    id: "paranox-grand-finalist",
    title: "Grand Finalist - Paranox 2.0",
    issuer: "Paranox",
    pdf: "/assets/certificates/paranox.pdf",
  },
  {
    id: "RIFT-semi-finalist",
    title: "Semi Finalist - RIFT 26' ",
    issuer: "RIFT-PWIOI",
    pdf: "/assets/certificates/rift.pdf",
  },
  {
    id: "Samsung-innovation-campus",
    title: "Coding & Programming",
    issuer: "Samsung Innovation Campus",
    pdf: "/assets/certificates/sic.pdf",
  },
];

const CertificatesSection = () => {
  return (
    <SectionWrapper
      id="certificates"
      className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <SectionHeader
        id="certificates"
        title="Certificates"
        desc="A few highlights from competitions and learning milestones."
        className="static mb-12"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((certificate) => (
          <article
            key={certificate.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm backdrop-blur-sm"
          >
            {/* PDF preview */}
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              <iframe
                src={`${certificate.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                title={certificate.title}
                className="h-full w-full border-0"
                loading="lazy"
              />
              {/* transparent overlay to block iframe pointer events so the card stays interactive */}
              <div className="absolute inset-0 cursor-default" aria-hidden />
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0 space-y-0.5">
                <h3 className="truncate text-base font-semibold text-foreground">
                  {certificate.title}
                </h3>
                <p className="text-sm text-muted-foreground">{certificate.issuer}</p>
              </div>
              <Link
                href={certificate.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                View PDF
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default CertificatesSection;