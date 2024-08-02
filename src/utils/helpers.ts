import { food } from '../assets/emoji/food'
import { emojiT } from './types/LessonTypes';
import bridge from '@vkontakte/vk-bridge';

const themes: { [key: string]: emojiT[] } = {
    food,
  };

function getThemeLength(theme: string): number {
  const selectedTheme = themes[theme];
  if (!selectedTheme) {
    throw new Error(`Тема ${theme} не найдена`);
  }
  return selectedTheme.length;
}

function getCorrect(arr: emojiT[], correctAnswers: string[]) {
    let correct;
    do {
      const randomIndex = Math.floor(Math.random() * arr.length);
      correct = arr[randomIndex];
    } while (correctAnswers.includes(correct.name));
    return correct;
}

function getRandomEmojiTest(theme: string): emojiT[] {
    const selectedTheme = themes[theme];
    if (!selectedTheme) {
      throw new Error(`Тема ${theme} не найдена`);
    }
  
    const shuffled = selectedTheme.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
}

async function saveToStorage(key: string, value: string) {
    try {
      await bridge.send('VKWebAppStorageSet', {
        key,
        value,
      });
      console.log(`Data saved: ${key} = ${value}`);
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  }

async function getFromStorage(key: string) {
    try {
      const value = await bridge.send('VKWebAppStorageGet', { keys: [key] });
      return value;
    } catch (error) {
      console.error('Error getting data from storage:', error);
    }
  }

export { getThemeLength, getCorrect, getRandomEmojiTest, saveToStorage, getFromStorage };
