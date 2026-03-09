const callApiCats = async (): Promise<string[]> => {
    const response = await fetch("https://cataas.com/api/cats?limit=20");

    if (!response.ok) {
        throw new Error("API error");
    };
    
    const cats: { id: string }[] = await response.json();
    return cats.map((cat: {id: string}) => `https://cataas.com/cat/${cat.id}`);
};
export default callApiCats;