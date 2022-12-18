import * as yup from "yup";

const transactionSchema: any = yup.object().shape({ 
    usernameAddressee: yup.string().min(3, "O nome do destinatário deve ter no mínimo 3 caracteres").required("Campo obrigatório"),
    value: yup.number().required().min(1, "O valor zero é invalido.")
    .test("len", "Mínimo de 3 números incluindo centavos", (val: any) => val.toString().length > 2)
});


const transactionFilterSchema: any = yup.object().shape({ 
    day: yup.number().min(1, "Dia inválido!").max(31, "Dia inválido!").required("É necessário informar o dia da transferência!"),
    month: yup.number().min(1, "Mês inválido!").max(12, "Mês inválido!").required("É necessário informar o mês da transferência!"),
    age: yup.number().min(2020, "Só existem registros a partir do ano 2020.").required("É necessário informar o ano da transferência!")
    .test("len", "O ano não pode ser maior do que o atual!", (val: any) => {
        const dataAtual = new Date();
        const anoAtual = dataAtual. getFullYear();
        return val <= anoAtual;
    })
});

export { transactionSchema, transactionFilterSchema};