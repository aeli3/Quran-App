import { useLocalSearchParams } from "expo-router";
import { useQuery } from '@tanstack/react-query';

const fetchAudio = async (reciterId: number, chapterId: number) => {
    const response = await fetch(`https://api.quran.com/api/v4/recitations/${reciterId}/by_chapter/${chapterId}?per_page=300`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Add prefix to URLs
    const audioFilesWithPrefix = data.audio_files.map(file => ({
        ...file,
        url: `https://verses.quran.com/${file.url}`
    }));
    
    return audioFilesWithPrefix;
};

export default function useQuranAudio() {
    const reciterId = 1;
    const { id: chapterId } = useLocalSearchParams<{ id: string }>();

    return useQuery({
        queryKey: ['verseAudio', reciterId, chapterId],
        queryFn: () => fetchAudio(reciterId, Number(chapterId)),
        staleTime: Infinity,
        gcTime: Infinity,
    });
}