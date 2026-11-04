import type { ReactNode } from "react";

import { Button } from "@/shared/ui/Button/Button";
import shared from "../shared.module.css";

interface RepeatableSectionProps {
  title: string;
  hint: string;
  addLabel: string;
  onAdd: () => void;
  children: ReactNode;
}

export function RepeatableSection({
  title,
  hint,
  addLabel,
  onAdd,
  children,
}: RepeatableSectionProps) {
  return (
    <section className={shared.card}>
      <div className={shared.sectionHeadingRow}>
        <div>
          <h2>{title}</h2>
          <p className={shared.hint}>{hint}</p>
        </div>
        <Button type="button" onClick={onAdd}>
          {addLabel}
        </Button>
      </div>
      <div className={shared.repeatList}>{children}</div>
    </section>
  );
}
