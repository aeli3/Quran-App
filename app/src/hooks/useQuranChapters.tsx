import { useLanguage } from "./useLanguage";
import { useQuery } from '@tanstack/react-query';

const fetchChapters = async (language: string) => {
    const response = await fetch(`https://api.quran.com/api/v4/chapters?language=${language}&per_page=300`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

function useQuranChapters() {
    const { language } = useLanguage();

    return useQuery({
        queryKey: ['chapters', language.value],
        queryFn: () => fetchChapters(language.value),
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
  
export default useQuranChapters;