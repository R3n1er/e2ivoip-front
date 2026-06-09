import { render } from "@testing-library/react";
import { SafeImage } from "@/components/ui/safe-image";

const mockImage = jest.fn((props: Record<string, unknown>) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img data-testid="safe-image" alt={String(props.alt ?? "")} />
));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => mockImage(props),
}));

describe("SafeImage", () => {
  beforeEach(() => {
    mockImage.mockClear();
  });

  it("passe suppressHydrationWarning à next/image", () => {
    render(
      <SafeImage
        src="/images/test.webp"
        alt="Test"
        width={48}
        height={48}
      />
    );

    expect(mockImage).toHaveBeenCalledWith(
      expect.objectContaining({
        suppressHydrationWarning: true,
        alt: "Test",
      })
    );
  });
});
