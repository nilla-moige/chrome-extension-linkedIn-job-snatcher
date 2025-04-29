import sinon from "sinon";
import chrome from "sinon-chrome";
import { copyWithPrompt } from "../src/clipboard";

describe("copyWithPrompt()", () => {
    beforeAll(() => {
        global.chrome = chrome;
    });

    it("prepends selected prompt before copying", () => {
        const jobText = "Job description";
        const prompt = "What skills are most important?";
        copyWithPrompt(prompt, jobText);
        const expected = prompt + "\n\n" + jobText;
        const lastCall = chrome.clipboard.writeText.getCall(0).args[0];
        expect(lastCall).toBe(expected);
    });
});