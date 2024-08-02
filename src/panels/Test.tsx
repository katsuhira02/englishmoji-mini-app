import React, { FC, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Button,
  Group,
  Div,
  Progress,
  NavIdProps,
} from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { EmojioneV4 } from 'react-emoji-render';
import { emojiT } from '../utils/types/LessonTypes';
import { getCorrect, getThemeLength, getRandomEmojiTest } from '../utils/helpers';
import './Test.css';

export interface TestProps extends NavIdProps {}

export const Test: FC<TestProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [emojis, setEmojis] = useState<emojiT[]>([]);
  const [correctEmoji, setCorrectEmoji] = useState<emojiT | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const params = useParams() || {};

  React.useEffect(() => {
    if (params.theme) {
      const testEmojis = getRandomEmojiTest(params.theme);
      setEmojis(testEmojis);
      setCorrectEmoji(testEmojis[Math.floor(Math.random() * testEmojis.length)]);
    } else {
      const testEmojis = getRandomEmojiTest("food");
      setEmojis(testEmojis);
      setCorrectEmoji(testEmojis[Math.floor(Math.random() * testEmojis.length)]);
    }
  }, [params.theme]);

  const theme = params.theme || "food"

  const handleButtonClick = (emoji: emojiT) => {
    const isCorrect = emoji === correctEmoji;
    console.log(correctAnswers, "correctAnswers")
    console.log(score, "score")
    if (isCorrect) {
      // setScore(getThemeLength(theme as string));
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, emoji.name]);
      if (score >= getThemeLength(theme as string)) {
        setScore(0)
        setCorrectAnswers([])
        routeNavigator.push(`/win`)
      }
      const testEmojis = getRandomEmojiTest(theme as string);
      setEmojis(testEmojis);
      setCorrectEmoji(getCorrect(testEmojis, correctAnswers));
    } else {
      setScore(0);
      setCorrectAnswers([]);
    }
  };

  const progress = (score / getThemeLength(theme as string)) * 100;

  return (
    <Panel id={id} style={{ overflow: 'hidden' }}>
      <PanelHeader>
        <div>
        <span>{theme}</span>
        </div>
      </PanelHeader>
      <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <span style={{ fontSize: '24px', marginBottom: '16px', display: 'inline-block' }}>
            {score} / {getThemeLength(theme as string)}
          </span>
        <Div style={{ width: '30%', marginBottom: '16px', justifyContent: 'center', alignItems: 'center',  }}>
          <Progress value={progress} height={10}  />
        </Div>
        <Div style={{ textAlign: 'center', fontSize: '56px', marginBottom: '16px' }}>
          {correctEmoji?.title}
        </Div>
        <Div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', justifyContent: 'center' }}>
          {emojis.map((emoji, index) => (
            <Button
              key={index}
              style={{ width: '80px', height: '80px', backgroundColor: 'transparent' }}
              onClick={() => handleButtonClick(emoji)}
            >
              <EmojioneV4 options={{className: 'large-emoji'}} text={emoji.name} />
            </Button>
          ))}
        </Div>
      </Group>
    </Panel>
  );
};