import { Button, Card, Title } from '@mantine/core';
import type { FC } from 'react';
import caTranslations from './locales/ca.json' with { type: 'json' };
import enTranslations from './locales/en.json' with { type: 'json' };
import esTranslations from './locales/es.json' with { type: 'json' };

const translations = {
  en: enTranslations,
  es: esTranslations,
  ca: caTranslations
};

type Locale = keyof typeof translations;

interface TestCardProps {
  title: string;
  locale: Locale;
  onButtonClick: () => void;
}

const TestCard: FC<TestCardProps> = ({ title, locale, onButtonClick }) => {
  const t = translations[locale];

  return (
    <Card withBorder padding="lg" radius="md" shadow="sm">
      <Title order={3}>{title}</Title>
      <p className="mt-4 text-gray-600">{t.description}</p>
      <Button className="mt-4" onClick={onButtonClick}>
        {t.button}
      </Button>
    </Card>
  );
};

export default TestCard;