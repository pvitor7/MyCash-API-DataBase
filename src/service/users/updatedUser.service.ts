import { compare, hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/users.repository";

const updatedUserService = async (
  id: string,
  userId: string,
  password: string
) => {
  if (id != userId) {
    throw new AppError("Usuário não autorizado!", 403);
  }
  const user = await UserRepository.findOneById(id);

  if (!user) {
    throw new AppError("Usuário não encontrado.", 400);
  }

  const hashedPassword = await hash(password, 12);
  const userUpdated = await UserRepository.update(id, hashedPassword);

  return "Senha atualizada com sucesso!";
};

export default updatedUserService;
