// @flow
import React, { useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Wrapper, Illustration, Number, Title, Content, BulletRowIcon } from "./shared";
import Box from "~/renderer/components/Box";
import BulletRow from "~/renderer/components/BulletRow";
import Text from "~/renderer/components/Text";
import FakeLink from "~/renderer/components/FakeLink";
import { openURL } from "~/renderer/linking";

import illustration from "~/renderer/images/USBTroubleshooting/illus4.png";

const TryAnotherComputerSolution = ({ number = 1 }: { number?: number }) => {
  const { t } = useTranslation();
  const onClickLink = useCallback(() => {
    openURL("https://www.ledger.com/ledger-live/");
  }, []);

  return (
    <Wrapper>
      <Number>{t("USBTroubleshooting.solution", { number })}</Number>
      <Title>{t("USBTroubleshooting.solutions.tryAnotherComputer.title")}</Title>
      <Content>
        <Illustration image={illustration} height={148} />
        <Box flex={2}>
          <Text mb={3} ff="Inter|SemiBold" color="palette.text.shade90" fontSize={5}>
            {t("USBTroubleshooting.followSteps")}
          </Text>
          <BulletRow
            step={{
              icon: <BulletRowIcon>1</BulletRowIcon>,
              desc: (
                <Text ff="Inter|Medium" fontSize={4}>
                  <Trans i18nKey="USBTroubleshooting.solutions.tryAnotherComputer.bullets.0">
                    <FakeLink onClick={onClickLink} />
                  </Trans>
                </Text>
              ),
            }}
          />
          <BulletRow
            step={{
              icon: <BulletRowIcon>1</BulletRowIcon>,
              desc: (
                <Text ff="Inter|Medium" fontSize={4}>
                  {t("USBTroubleshooting.solutions.tryAnotherComputer.bullets.1")}
                </Text>
              ),
            }}
          />
        </Box>
      </Content>
    </Wrapper>
  );
};

export default TryAnotherComputerSolution;
