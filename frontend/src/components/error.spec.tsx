import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Error } from "./error";

describe("Error component", () => {
    beforeEach(() => {
        Object.defineProperty(window, "location", {
            value: {
                ...window.location,
                reload: vi.fn(),
            },
            writable: true,
        });
    });

    afterEach(() => {
        window.location.reload = location.reload;
    });

    it("renders the error message", () => {
        render(<Error />);
        expect(screen.getByTestId("error-title")).toBeInTheDocument();
    });

    it("renders the reload button with icon and text", () => {
        render(<Error />);
        const button = screen.getByTestId("error-button");
        expect(button).toBeInTheDocument();
        expect(button.querySelector("svg")).toBeInTheDocument();
    });

    it("reloads the page when the button is clicked", () => {
        render(<Error />);
        const button = screen.getByTestId("error-button");
        fireEvent.click(button);
        expect(window.location.reload).toHaveBeenCalled();
    });
});