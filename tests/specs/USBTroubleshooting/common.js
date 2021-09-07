/* eslint-disable jest/no-export */
import { USBTroubleshootingPage, managerPage, app, mockDeviceEvent } from "../../common.js";

export const generateTest = (platform, solutionCount) => {
  it("goes to USBTroubleshooting screen from manager", async () => {
    await managerPage.goToManager();
    // Simulate a device disconnect to get out of the Loading state from the manager
    await mockDeviceEvent({ type: "deviceChange", device: null });
    // There should be no help component on load
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: `USBTroubleshooting-${platform}-noHelpPopup`,
    });
    await app.client.pause(20000); // Wait for the timeout to complete
    // There should be a visible CTA to trigger the troubleshooting now
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: `USBTroubleshooting-${platform}-helpPopup`,
    });
  });
  it("access the USBTroubleshooting solutions", async () => {
    await USBTroubleshootingPage.startFlow();

    // Expect to see the intro screen
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: `USBTroubleshooting-${platform}-intro-screen`,
    });
    await USBTroubleshootingPage.startFromIntro();

    // Move over the solutions, we could probably make it dynamic here instead of a hardcoded 6(+1)
    for (let i = 0; i < solutionCount; i++) {
      // We should be in the first solution at this point
      expect(await app.client.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: `USBTroubleshooting-${platform}-solution-${i}`,
      });
      await USBTroubleshootingPage.goToNext();
    }
    // We've reached the "funnel" where we choose a device, try one device per platform to cover all
    // three cases.
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: `USBTroubleshooting-${platform}-solution-${solutionCount}`,
    });
    const deviceOption = platform === "linux" ? "nanoS" : platform === "mac" ? "nanoX" : "blue";
    await USBTroubleshootingPage.onChooseDevice(deviceOption);
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: `USBTroubleshooting-${platform}-${deviceOption}-repairModal`,
    });
  });
};