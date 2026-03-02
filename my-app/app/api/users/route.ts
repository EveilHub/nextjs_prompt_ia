const callApiCats = async () => {
    try {
        const response = await fetch('https://cataas.com/cat', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        };
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
};
export default callApiCats;