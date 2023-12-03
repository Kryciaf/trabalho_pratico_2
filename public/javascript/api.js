export const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3000/breeds');
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        throw error;
    }
};

export const fetchMap = async () => {
    try {
        const response = await fetch('http://localhost:3000/map');
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        throw error;
    }
}
