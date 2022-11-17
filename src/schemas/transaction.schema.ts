import * as yup from "yup";

const transactionSchema: any = yup.object().shape({ 
    debitedAccountId: yup.string().min(1).required("Campo obrigatório"),
    creditedAccountId: yup.string().required(),
    value: yup.number().required().min(1, "O valor deve ser positivo")
    .test("len", "Mínimo de 3 números incluindo centavos", (val: any) => val.toString().length > 2)
});

export default transactionSchema;