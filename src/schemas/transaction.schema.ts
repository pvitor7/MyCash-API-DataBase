import * as yup from "yup";

const transactionSchema: any = yup.object().shape({ 
    usernameAddressee: yup.string().min(3, "Mínimo de 3 caracteres").required("Campo obrigatório"),
    value: yup.number().required().min(1, "O valor deve ser positivo")
    .test("len", "Mínimo de 3 números incluindo centavos", (val: any) => val.toString().length > 2)
});

export default transactionSchema;