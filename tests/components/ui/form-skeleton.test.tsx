import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { FormSkeleton } from "@/components/ui/form-skeleton";

describe("FormSkeleton", () => {
  test("expose un rôle status accessible avec libellé", () => {
    render(<FormSkeleton />);
    const skeleton = screen.getByRole("status");
    expect(skeleton).toHaveAccessibleName(/chargement du formulaire/i);
  });

  test("rend 4 rangées de champs par défaut", () => {
    render(<FormSkeleton />);
    expect(screen.getByRole("status").querySelectorAll("[data-skeleton-row]")).toHaveLength(4);
  });

  test("respecte le nombre de rangées et la hauteur passés en props", () => {
    render(<FormSkeleton rows={2} height={120} />);
    const skeleton = screen.getByRole("status");
    expect(skeleton.querySelectorAll("[data-skeleton-row]")).toHaveLength(2);
    expect(skeleton).toHaveStyle({ height: "120px" });
  });

  test("utilise une pulsation sobre, pas de spinner circulaire", () => {
    render(<FormSkeleton />);
    const skeleton = screen.getByRole("status");
    expect(skeleton.className).toContain("animate-pulse");
    expect(skeleton.querySelector(".animate-spin")).toBeNull();
  });
});
