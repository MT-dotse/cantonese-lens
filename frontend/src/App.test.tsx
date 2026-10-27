import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import App from "./App";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
describe("App", () => {
  it("renders the Cantonese Lens heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Cantonese Lens" }),
    ).toBeDefined();
  });

  it("renders the word input field", () => {
    render(<App />);

    expect(screen.getByRole("textbox")).toBeDefined();
  });
  it("shows an error when submitting an empty input", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Analyze" }));
    expect(screen.getByText("Please enter a word.")).toBeDefined();
  });

  it("displays the result after a successful word lookup", async () => {
    const mockWord = {
      chinese: "香蕉",
      jyutping: "hoeng1 ziu1",
      english: "banana",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockWord,
      }),
    );

    render(<App />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "banana" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Analyze" }));
    expect(await screen.findByText("香蕉")).toBeDefined();
  });
  it("shows an error when the word is not found", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );
    render(<App />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "pineapple" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Analyze" }));
    expect(
      await screen.findByText("Word not found. Try another word."),
    ).toBeDefined();
  });
});
