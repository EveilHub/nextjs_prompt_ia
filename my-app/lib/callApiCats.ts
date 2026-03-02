const callApiCats = async (): Promise<string> => {
    const response = await fetch('https://cataas.com/cat?json=true');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.url.startsWith('http')) {
        return data.url;
    }

    return `https://cataas.com${data.url}`;
};

export default callApiCats;