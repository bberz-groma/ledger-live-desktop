// @flow
import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "~/renderer/components/Box";
import Button from "~/renderer/components/Button";
import { Wrapper, Content, Title, Subtitle, Illustration } from "./shared";
import illustration from "~/renderer/images/USBTroubleshooting/fail.png";
import { DeviceSelectorOption } from "~/renderer/components/Onboarding/Screens/SelectDevice/DeviceSelectorOption";
import { openURL } from "~/renderer/linking";
import { urls } from "~/config/urls";
import RepairDeviceButton from "~/renderer/components/RepairDeviceButton";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";

import nanoX from "~/renderer/components/Onboarding/Screens/SelectDevice/assets/nanoX.svg";
import nanoS from "~/renderer/components/Onboarding/Screens/SelectDevice/assets/nanoS.svg";
import nanoBlue from "~/renderer/components/Onboarding/Screens/SelectDevice/assets/nanoBlue.svg";
import { registerAssets } from "~/renderer/components/Onboarding/preloadAssets";
registerAssets([nanoX, nanoS, nanoBlue]);

const DeviceSelectContainer: ThemedComponent<*> = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin: 0px 8px;
  }

  & > :first-child {
    margin-left: 0px;
  }

  & > :last-child {
    margin-right: 0px;
  }
`;

const NanoX = styled.div`
  background: url(${nanoX}) no-repeat top right;
  width: 153px;
  height: 218px;
`;

const NanoS = styled.div`
  background: url(${nanoS}) no-repeat top right;
  width: 149px;
  height: 221px;
`;

const NanoBlue = styled.div`
  width: 191px;
  height: 221px;
  background: url(${nanoBlue}) no-repeat top right;
`;

const RepairFunnelSolution = ({
  sendEvent,
  done,
}: {
  sendEvent: (string, ?{}) => void,
  done: boolean,
}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const onBackToPortfolio = useCallback(() => history.push("/"), [history]);
  const onContactSupport = useCallback(() => {
    openURL(urls.contactSupport);
  }, []);

  const onSelectDevice = useCallback(
    deviceModel => {
      sendEvent("DONE", { deviceModel });
    },
    [sendEvent],
  );

  return !done ? (
    <Wrapper>
      <Title>{t("USBTroubleshooting.solutions.repairFunnel.title")}</Title>
      <Subtitle style={{ padding: "0 50px" }} mb={36} mt={12}>
        {t("USBTroubleshooting.solutions.repairFunnel.subtitle")}
      </Subtitle>
      <DeviceSelectContainer>
        <RepairDeviceButton
          Component={({ onClick }) => (
            <DeviceSelectorOption
              id={"device-nanoS"}
              key={"nanoS"}
              label={"Nano S"}
              Illu={<NanoS />}
              onClick={onClick}
            />
          )}
        />
        <DeviceSelectorOption
          id={"device-nanoX"}
          key={"nanoX"}
          label={"Nano X"}
          Illu={<NanoX />}
          onClick={() => onSelectDevice("nanoX")}
        />
        <DeviceSelectorOption
          id={"device-blue"}
          key={"nanoBlue"}
          label={"Blue"}
          Illu={<NanoBlue />}
          onClick={() => onSelectDevice("blue")}
        />
      </DeviceSelectContainer>
    </Wrapper>
  ) : (
    <Wrapper>
      <Content>
        <Illustration height={193} image={illustration} />
      </Content>
      <Title>{t("USBTroubleshooting.solutions.repairFunnel.contactSupport.title")}</Title>
      <Subtitle style={{ padding: "0 50px" }} mb={36} mt={12}>
        {t("USBTroubleshooting.solutions.repairFunnel.contactSupport.subtitle")}
      </Subtitle>
      <Box horizontal>
        <Button secondary mr={2} onClick={onBackToPortfolio}>
          {t("USBTroubleshooting.solutions.repairFunnel.contactSupport.ctaBack")}
        </Button>
        <Button primary onClick={onContactSupport}>
          {t("USBTroubleshooting.solutions.repairFunnel.contactSupport.ctaContact")}
        </Button>
      </Box>
    </Wrapper>
  );
};

export default RepairFunnelSolution;