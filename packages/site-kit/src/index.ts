export { createPageMetadata, createSiteMetadata } from "./config/metadata";
export { createCorporateNavigation } from "./config/navigation";
export {
  CORPORATE_MISSION,
  CORPORATE_VALUES,
  CORPORATE_VISION,
} from "./config/corporateContent";
export {
  LA_NIEVE_DATA_POLICY_DOCUMENT,
  LA_NIEVE_DATA_POLICY_SOURCE,
} from "./config/dataPolicyContent";
export { sharedHeroImage } from "./config/sharedAssets";
export { CORPORATE_TECHNOLOGY } from "./config/technologyContent";
export { LA_NIEVE_TIMELINE, UNIMARKA_TIMELINE } from "./config/timelineContent";
export type {
  SiteConfig,
  SiteDataPolicyDocument,
  SiteDataPolicyDocumentId,
  SiteDataPolicySection,
  SiteAlly,
  SiteBrandLogo,
  SiteFeature,
  SiteIconName,
  SiteImageConfig,
  SiteLogoConfig,
  SiteMetadataConfig,
  SiteNavigationItem,
  SitePageCopy,
  SitePageKey,
  SiteStat,
  SiteSocialLinks,
  SiteTextSection,
  SiteTimelineMilestone,
  SiteValue,
} from "./config/types";

export { CompanyTimeline } from "./components/CompanyTimeline";
export { SiteChrome } from "./components/SiteChrome";
export { HomePage } from "./pages/HomePage";
export { AboutPage } from "./pages/AboutPage";
export { AlliesPage } from "./pages/AlliesPage";
export { CulturePage } from "./pages/CulturePage";
export { ContactPage } from "./pages/ContactPage";
export { CareersPage } from "./pages/CareersPage";
export { LegalPage } from "./pages/LegalPage";
export { DataPolicyPage } from "./pages/DataPolicyPage";
export { PqrsPage } from "./pages/PqrsPage";
