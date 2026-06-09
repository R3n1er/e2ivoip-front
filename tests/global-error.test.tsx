import { render, screen } from "@testing-library/react";
import GlobalError from "@/app/global-error";
import ErrorPage from "@/app/error";

describe("Error boundaries", () => {
  it("global-error affiche le message et le bouton Réessayer", () => {
    const reset = jest.fn();
    render(
      <GlobalError error={new Error("Test manifest")} reset={reset} />
    );

    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Réessayer" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("error segment affiche le bouton Réessayer", () => {
    render(<ErrorPage error={new Error("Page error")} reset={jest.fn()} />);

    expect(
      screen.getByText("Impossible d'afficher cette page")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Réessayer" })).toBeInTheDocument();
  });
});
