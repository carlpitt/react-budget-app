import { render, screen } from "@testing-library/react";
import DashboardPage from "../../pages/DashboardPage";

test("Checking if chart data is there", () => {
    render(<DashboardPage />);
    const chartElement = screen.getByTestId("chart-1");
    expect(chartElement).toBeInTheDocument();
    expect(chartElement).toHaveTextContent("Start Your Personal Budget");
});
