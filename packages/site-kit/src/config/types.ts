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
  readonly src: string;
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
}

export interface SiteTextSection {
  readonly title: string;
  readonly body: string;
}

export interface SiteConfig {
  readonly id: "la-nieve" | "unimarka";
  readonly name: string;
  readonly legalName: string;
  readonly slogan: string;
  readonly logo: SiteLogoConfig;
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
    readonly items: readonly SiteFeature[];
  };
  readonly about: SitePageCopy & {
    readonly image: SiteImageConfig;
    readonly mission: string;
    readonly vision: string;
    readonly values: readonly SiteFeature[];
    readonly pillars: readonly SiteFeature[];
    readonly disclaimer: string;
  };
  readonly allies: SitePageCopy & {
    readonly items: readonly SiteAlly[];
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
    readonly pendingMessage: string;
  };
  readonly careers: SitePageCopy & {
    readonly image: SiteImageConfig;
    readonly benefits: readonly SiteFeature[];
    readonly pendingMessage: string;
  };
  readonly legal: SitePageCopy;
  readonly dataPolicy: SitePageCopy & {
    readonly disclaimer: string;
    readonly sections: readonly SiteTextSection[];
  };
  readonly pqrs: SitePageCopy & {
    readonly disclaimer: string;
    readonly categories: readonly SiteFeature[];
  };
  readonly footerDescription: string;
}
