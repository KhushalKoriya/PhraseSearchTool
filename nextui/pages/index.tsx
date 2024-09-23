import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [sort, setSort] = useState('asc');
    const [selectedPhrase, setSelectedPhrase] = useState<any | null>(null);
    const [translation, setTranslation] = useState<string | null>(null);

    const searchPhrases = async () => {
        try {
            const response = await axios.get(`/phrase/search?query=${query}&sort=${sort}`);
            console.log("API Response:", response.data);

            if (Array.isArray(response.data.data)) {
                setResults(response.data.data);
            } else {
                console.error("Unexpected response format:", response.data);
                setResults([]);
            }
        } catch (error) {
            console.error("API Error:", error);
            setResults([]);
        }
    };

    const fetchPhraseDetails = async (id: number) => {
        try {
            const response = await axios.get(`/phrase/${id}`);
            setSelectedPhrase(response.data);
            setTranslation(null); // Reset translation
        } catch (error) {
            console.error("Error fetching phrase details:", error);
        }
    };

    const fetchTranslation = async (id: number, language: string) => {
        try {
            const response = await axios.get(`/phrase/${id}/${language}`);
            setTranslation(response.data.translation);
        } catch (error) {
            console.error("Error fetching translation:", error);
        }
    };

    return (
        <div>
            <h1>Phrase Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter phrase text"
            />
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <button onClick={searchPhrases}>Search</button>

            <ul>
                {results.length > 0 ? (
                    results.map((phrase: any) => (
                        <li key={phrase.id}>
                            {phrase.phrase}
                            <button onClick={() => fetchPhraseDetails(phrase.id)}>Get Details</button>
                        </li>
                    ))
                ) : (
                    <li>No results found</li>
                )}
            </ul>

            {selectedPhrase && (
                <div>
                    <h2>Selected Phrase Details</h2>
                    <p>Phrase: {selectedPhrase.phrase}</p>
                    <p>Status: {selectedPhrase.status}</p>
                    <p>Created At: {new Date(selectedPhrase.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(selectedPhrase.updatedAt).toLocaleString()}</p>
                    <button onClick={() => fetchTranslation(selectedPhrase.id, 'fr')} style={{ marginRight: '10px' }}>
                        Get French Translation
                    </button>
                    <button onClick={() => fetchTranslation(selectedPhrase.id, 'es')}>
                        Get Spanish Translation
                    </button>


                    {translation && (
                        <div className="translation">
                            <h3>Translation:</h3>
                            <p>{translation}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}
