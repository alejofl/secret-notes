import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { ProtectionCard } from "./protection-card";
import { vi } from 'vitest';

describe("ProtectionCard component", () => {
    const setup = (props = {}) => {
        const defaultProps = {
            passphrase: "",
            setPassphrase: vi.fn(),
            isError: false,
            isLoading: false,
            onSubmit: vi.fn((e) => e.preventDefault()),
            ...props,
        };
        render(<ProtectionCard {...defaultProps} />);
        return defaultProps;
    };

    it("renders the card with title and description", () => {
        setup();
        expect(screen.getByTestId("protected-note-title")).toBeInTheDocument();
        expect(screen.getByTestId("protected-note-description")).toBeInTheDocument();
    });

    it("renders the passphrase input", () => {
        setup();
        expect(screen.getByTestId("passphrase-input")).toBeInTheDocument();
    });

    it("calls setPassphrase on input change", () => {
        const setPassphrase = vi.fn();
        setup({ setPassphrase });
        fireEvent.change(screen.getByTestId("passphrase-input"), {
            target: { value: "secret" },
        });
        expect(setPassphrase).toHaveBeenCalledWith("secret");
    });

    it("shows error message when isError is true", () => {
        setup({ isError: true });
        expect(screen.getByTestId("passphrase-error")).toBeInTheDocument();
    });

    it("disables submit button when isLoading is true", () => {
        setup({ isLoading: true });
        expect(screen.getByTestId("submit-passphrase")).toBeDisabled();
    });

    it("shows 'Access Note' when not loading", () => {
        setup({ isLoading: false });
        expect(screen.getByTestId("submit-passphrase")).toBeEnabled();
    });

    it("calls onSubmit when form is submitted", () => {
        const onSubmit = vi.fn((e) => e.preventDefault());
        setup({ onSubmit });
        fireEvent.submit(screen.getByTestId("passphrase-form"));
        expect(onSubmit).toHaveBeenCalled();
    });

    it("toggles password visibility", () => {
        setup();
        const input = screen.getByTestId("passphrase-input");
        const toggleBtn = screen.getByTestId("toggle-passphrase-visibility");

        expect(input).toHaveAttribute("type", "password");
        fireEvent.click(toggleBtn);
        expect(input).toHaveAttribute("type", "text");
        fireEvent.click(toggleBtn);
        expect(input).toHaveAttribute("type", "password");
    });
});
