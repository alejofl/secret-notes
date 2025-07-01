import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { NotFound } from "./not-found";
import { vi } from 'vitest';
import * as ReactRouter from "@tanstack/react-router";

vi.mock("@tanstack/react-router", () => ({
    useRouter: vi.fn(),
    Link: ({ children, to, ...props }: any) => (
        <a href={to} {...props}>
            {children}
        </a>
    ),
}));

describe("NotFound component", () => {
    it("renders the not found message", () => {
        render(<NotFound />);
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
        expect(screen.getByTestId("not-found-title")).toBeInTheDocument();
    });

    it("renders Go Home button with icon", () => {
        render(<NotFound />);
        const goHomeButton = screen.getByTestId("go-home-button");
        expect(goHomeButton).toBeInTheDocument();
        expect(goHomeButton.querySelector("svg")).toBeInTheDocument();
        expect(goHomeButton).toHaveAttribute("href", "/");
    });

    it("renders Go Back button with icon", () => {
        render(<NotFound />);
        const goBackButton = screen.getByTestId("go-back-button");
        expect(goBackButton).toBeInTheDocument();
        expect(goBackButton.querySelector("svg")).toBeInTheDocument();
    });

    it("calls router.history.back when Go Back is clicked", () => {
        const mockBack = vi.fn();
        
        (ReactRouter.useRouter as any).mockReturnValue({
            history: { back: mockBack },
        });
        
        render(<NotFound />);
        const goBackButton = screen.getByTestId("go-back-button");
        fireEvent.click(goBackButton);
        expect(mockBack).toHaveBeenCalled();
    });
});