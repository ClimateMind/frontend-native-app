
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import MythsFeedScreen from "../../screens/tabs/MythsFeedScreen/MythsFeedScreen";


describe("<App />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it("renders correctly", () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders Hello World message on the home page", async () => {
        render(<MythsFeedScreen />);
        expect(screen.getByText("Climate change myths")).toBeDefined()
    });
});
