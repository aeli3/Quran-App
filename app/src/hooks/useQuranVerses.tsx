import { useQuery } from '@tanstack/react-query';
import { languageMap } from '../utils/LanguageMap';
import { useLocalSearchParams } from 'expo-router';
import { useLanguage } from './useLanguage';

interface ProcessedVerse {
  id: number;
  verseNumber: number;
  verseKey: string;
  translation: string;
  arabicText: string;
  transliteration: string;
}

const fetchAndProcessVerses = async (chapterId: string, translationId: number) => {
  const arabicQuran = require("../lang/quran_en.json")
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?words=true&translations=${translationId}&per_page=300`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  return data.verses.map((verse: any): ProcessedVerse => ({
    id: verse.id,
    verseNumber: verse.verse_number,
    verseKey: verse.verse_key,
    translation: verse.translations[0]?.text.replace(/<[^>]*>.*?<\/[^>]*>/g, '') || '',
    arabicText: arabicQuran[Number(chapterId) - 1].verses[verse.verse_number - 1].text,
    transliteration: verse.words.filter((word: any) => word.char_type_name === 'word').map((word: any) => word.transliteration.text).join(' ')
  }));
};

export function useQuranVerses() {
    const { language } = useLanguage();
    const translationId = languageMap[language.value]
    const { id: chapterId } = useLocalSearchParams<{ id: string }>();

  return useQuery({
    queryKey: ['verses', language.value, chapterId],
    queryFn: () => fetchAndProcessVerses(chapterId, translationId),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}