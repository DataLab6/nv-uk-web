import {
  Briefcase,
  Building2,
  Check,
  FileText,
  GlassWater,
  Handshake,
  Heart,
  Lightbulb,
  MapPin,
  Megaphone,
  PackageCheck,
  Scale,
  Shield,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Truck,
  Users,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { SiteIconName } from "../config/types";

const ICONS: Record<SiteIconName, LucideIcon> = {
  building: Building2,
  briefcase: Briefcase,
  check: Check,
  "file-text": FileText,
  "glass-water": GlassWater,
  handshake: Handshake,
  heart: Heart,
  lightbulb: Lightbulb,
  "map-pin": MapPin,
  megaphone: Megaphone,
  "package-check": PackageCheck,
  scale: Scale,
  shield: Shield,
  sparkles: Sparkles,
  store: Store,
  target: Target,
  "trending-up": TrendingUp,
  truck: Truck,
  users: Users,
  wine: Wine,
};

/**
 * Renders one approved Lucide icon from a serializable site identifier.
 */
export function SiteIcon({
  name,
  className,
}: {
  name: SiteIconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
