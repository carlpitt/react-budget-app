import { render, screen } from "@testing-library/react";
import AboutPage from "../../pages/AboutPage";

test("Checking if AboutPage component rendered", () => {
    render(<AboutPage />);
    const aboutElement = screen.getByTestId("header-start-budget");
    expect(aboutElement).toBeInTheDocument();
    expect(aboutElement).toHaveTextContent("Start your personal budget");
});
