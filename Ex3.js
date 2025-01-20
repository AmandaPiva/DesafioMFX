function handleDateOperations(params) {
    const { date1, date2, daysToAdd, targetTimeZone, format } = params;

    // Função para validar se uma string é uma data válida
    function isValidDate(date) {
        return !isNaN(new Date(date).getTime()); //traz o valor numerico em milissegundos da data e verifica se é um número
    }

    // Calcular a diferença em dias entre duas datas
    function calculateDaysBetween(d1, d2) {
        const diferenca = Math.abs(new Date(d2) - new Date(d1)); //abs garante que seja retornado um valor positivo
        return Math.floor(diferenca / (1000 * 60 * 60 * 24)); //converte o valor em milissegundos para dias (floor arredonda para baixo)
    }

    // Adicionar dias a uma data
    function addDaysToDate(date, days) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    // Converter para outro fuso horário
    function convertToTimeZone(date, timeZone) {
        try {
            return new Date(date).toLocaleString("en-US", { timeZone });
        } catch {
            return "Fuso horário inválido";
        }
    }

    // Formatar uma data
    function formatDate(date, format) {
        const data = new Date(date);
        if (isNaN(data)) return "Data inválida";

        const options = {
            "YYYY-MM-DD": () => `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`,
            "DD/MM/YYYY": () => `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`,
            "MM-DD-YYYY": () => `${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}-${data.getFullYear()}`
        };

        return options[format] ? options[format]() : "Formato Inválido";
    }

    // Validar as entradas
    if (date1 && !isValidDate(date1)) return { error: "Date1 inválida" };
    if (date2 && !isValidDate(date2)) return { error: "Date2 inválida" };

    const daysBetween = date1 && date2 ? calculateDaysBetween(date1, date2) : 0;
    const newDate = date1 && daysToAdd ? addDaysToDate(date1, daysToAdd) : "";
    const convertedTimeZone = date1 && targetTimeZone ? convertToTimeZone(date1, targetTimeZone) : "";
    const formattedDate = date1 && format ? formatDate(date1, format) : "";

    return {
        daysBetween,
        newDate: newDate ? newDate.toISOString() : "",
        convertedTimeZone,
        formattedDate
    };
}

// Exemplo de uso
const params = {
    date1: "2025-01-20",
    date2: "2025-01-25",
    daysToAdd: 5,
    targetTimeZone: "America/New_York",
    format: "DD/MM/YYYY"
};

console.log(handleDateOperations(params));
