"use client";

import { useState } from "react";
import type { SiteCultureTopic } from "../config/types";
import { DonTulioTopicCard } from "./DonTulioTopicCard";
import { RevealGroup } from "./RevealGroup";

export function CultureTopics({
  topics,
}: {
  topics: readonly SiteCultureTopic[];
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
