import React, { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Button,
  Group,
  Div,
  NavIdProps,
  Title,
} from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { EmojioneV4 } from 'react-emoji-render';

export interface WinProps extends NavIdProps {}

export const Win: FC<WinProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams() || {};

  const theme = params.theme || "food"
  
  return (
    <Panel id={id}>
      <PanelHeader>Победа!</PanelHeader>
      <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <Title level="1" style={{ marginBottom: '16px' }}>Поздравляем!</Title>
        <Div style={{ textAlign: 'center', fontSize: '56px', marginBottom: '16px' }}>
          <EmojioneV4 text="🎉" />
        </Div>
        <Div style={{ textAlign: 'center', marginBottom: '32px' }}>
          Вы успешно прошли тест по теме "{theme}"
        </Div>
        <Button size="l" onClick={() => routeNavigator.replace('/')}>
          Заново
        </Button>
      </Group>
    </Panel>
  );
};
