export const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return new Date(dateStr).toISOString().split('T')[0] || "";
};

export const validateCpf = (cpf) => {
    if (!cpf) return "CPF é obrigatório";
    return cpf.length >= 11 && cpf.length <= 14 ? "" : "Formato de CPF inválido (11 a 14 caracteres)";
};

export const validateEmail = (emailToValidate) => {
    if (!emailToValidate) return "Email é obrigatório.";
    if (!/\S+@\S+\.\S+/.test(emailToValidate)) return "Formato de email inválido.";
    return "";
};