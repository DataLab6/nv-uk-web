"use client";

import { useState } from "react";
import type { SiteCultureTopic } from "../config/types";
import { DonTulioTopicCard } from "./DonTulioTopicCard";
import { RevealGroup } from "./RevealGroup";

export function CultureTopics({
  topics,
  site = "la-nieve",
}: {
  topics: readonly SiteCultureTopic[];
  site?: "la-nieve" | "unimarka";
}) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <RevealGroup
      className="grid items-stretch gap-6 md:grid-cols-3"
      stagger={0.1}
    >
      {topics.map((topic, index) => (
        <DonTulioTopicCard
          key={topic.title}
          topic={topic}
          media={
            site === "unimarka"
              ? {
                  name: "Doña Ceci",
                  video: `/videos/jose-maria-${["saludo", "practicas", "consejo"][index % 3]}-v5.webm`,
                  poster: `/images/culture/jose-maria-${["saludo", "practicas", "consejo"][index % 3]}-v5.png`,
                }
              : undefined
          }
          animation={
            index === 1 ? "shelf" : index === 2 ? "advice" : "greeting"
          }
          selected={selected === index}
          onSelect={() => setSelected(selected === index ? null : index)}
        />
      ))}
    </RevealGroup>
  );
}
