import type { StaticImageData } from "next/image";

/**
 * Primitive icon identifiers supported by the shared corporate components.
 * Keeping identifiers as strings makes every site configuration serializable.
 */
export type SiteIconName =
  | "building"
  | "briefcase"
  | "check"
  | "file-text"
  | "glass-water"
  | "handshake"
  | "heart"
  | "lightbulb"
  | "map-pin"
  | "megaphone"
  | "package-check"
  | "scale"
  | "shield"
  | "sparkles"
  | "store"
  | "target"
  | "trending-up"
  | "truck"
  | "users"
  | "wine";

export type SitePageKey =
  | "home"
  | "about"
  | "allies"
  | "culture"
  | "contact"
  | "careers"
  | "legal"
  | "dataPolicy"
  | "pqrs";

export interface SiteNavigationItem {
  readonly label: string;
  readonly href: string;
  readonly page: SitePageKey;
  readonly children?: readonly SiteNavigationItem[];
}

export interface SiteMetadataConfig {
  readonly title: string;
  readonly titleTemplate: string;
  readonly description: string;
  readonly keywords: readonly string[];
}

export interface SiteImageConfig {
  readonly src: string | StaticImageData;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly treatment?: "photo" | "character" | "illustration";
}

export interface SiteLogoConfig {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly display: "cropped-square" | "wide";
}

export interface SiteFeature {
  readonly title: string;
  readonly description: string;
  readonly icon: SiteIconName;
}

export interface SitePageCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface SiteStat {
  readonly value: number;
  readonly suffix?: string;
  readonly label: string;
  readonly note?: string;
}

export interface SiteAlly {
  readonly name: string;
  readonly image?: SiteImageConfig;
  /** Preferred visual width in CSS pixels inside shared logo displays. */
  readonly displayWidth?: number;
}

export interface SiteBrandLogo extends SiteAlly {
  readonly image: SiteImageConfig;
}

export interface SiteValue {
  readonly title: string;
  readonly description: string;
  readonly image: SiteImageConfig;
}

export interface SiteTimelineMilestone {
  readonly period: string;
  readonly isoDate?: string;
  readonly isCurrent?: boolean;
  readonly description: string;
}

export interface SiteSocialLinks {
  readonly linkedin: string | null;
  readonly instagram: string | null;
  readonly facebook: string | null;
}

export interface SiteTextSection {
  readonly title: string;
  readonly body: string;
}

export interface SiteDataPolicySection {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface SiteDataPolicyDocument {
  readonly owner: string;
  readonly sourceFile: string;
  readonly title: string;
  readonly sections: readonly SiteDataPolicySection[];
}

export type SiteDataPolicyDocumentId = "la-nieve";

export interface SiteConfig {
  readonly id: "la-nieve" | "unimarka";
  readonly name: string;
  readonly legalName: string;
  readonly slogan: string;
  readonly logo: SiteLogoConfig;
  readonly chromeLogo: SiteLogoConfig;
  readonly favicon?: string;
  readonly themeColor: string;
  readonly metadata: SiteMetadataConfig;
  readonly navigation: readonly SiteNavigationItem[];
  readonly home: SitePageCopy & {
    readonly image: SiteImageConfig;
    readonly points: readonly SiteFeature[];
  };
  readonly stats: SitePageCopy & {
    readonly image: SiteImageConfig;
    readonly items: readonly SiteStat[];
    readonly disclaimer: string;
  };
  readonly coverage: SitePageCopy & {
    readonly departments: readonly string[];
    readonly disclaimer: string;
    readonly isDemo: boolean;
  };
  readonly channels: SitePageCopy & {
    readonly items: readonly SiteFeature[];
  };
  readonly innovation: SitePageCopy & {
    readonly image: SiteImageConfig;
    readonly imageCaption: string;
    readonly items: readonly SiteFeature[];
  };
  readonly about: SitePageCopy & {
    readonly image: SiteImageConfig;
    readonly timeline: readonly SiteTimelineMilestone[];
    readonly mission: string;
    readonly vision: string;
    readonly values: readonly SiteValue[];
  };
  readonly allies: SitePageCopy & {
    readonly items: readonly SiteAlly[];
    readonly logos: readonly SiteBrandLogo[];
    readonly imageNotice: string;
  };
  readonly culture: SitePageCopy & {
    readonly image: SiteImageConfig;
    readonly topics: readonly SiteFeature[];
  };
  readonly contact: SitePageCopy & {
    readonly location?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly mapEmbedUrl: string | null;
    readonly pendingMessage: string;
  };
  readonly careers: SitePageCopy & {
    readonly image: SiteImageConfig;
    readonly pendingMessage: string;
  };
  readonly legal: SitePageCopy;
  readonly dataPolicy: SitePageCopy & {
    readonly applicability: string;
    readonly disclaimer: string;
    readonly documentId: SiteDataPolicyDocumentId | null;
  };
  readonly pqrs: SitePageCopy & {
    readonly disclaimer: string;
    readonly categories: readonly SiteFeature[];
  };
  readonly footerDescription: string;
  readonly socialLinks: SiteSocialLinks;
  /** Networks this brand actually uses; controls which footer icons render at all. */
  readonly socialNetworks: readonly (keyof SiteSocialLinks)[];
  /** Verified footer contact details sourced from redesciales.txt, independent from `contact`. */
  readonly footerContact: {
    readonly email: string | null;
    readonly location: string | null;
  };
  /** Discreet development-team credit shown at the opposite end of the footer's copyright line. */
  readonly developmentTeam: string;
}
