import * as yup from "yup";

const userSchema: any = yup.object().shape({ 
    username: yup.string().min(3, "Mínimo de 3 caracteres").required("Campo obrigatório"),
    password: yup.string()
    .required("Campo obrigatório")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/,
        "A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, e 8 caracteres!"
      )
});

export default userSchema;