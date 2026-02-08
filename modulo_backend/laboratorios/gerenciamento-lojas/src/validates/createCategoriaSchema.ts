import z from "zod";

export const createCategoriaSchema = z.object({
    nome: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(1, "Nome da categoria é obrigatório.")
    ),

    descricao: z.preprocess(
            (val) => (val === "" || val === null ? undefined : val),
            z.string().optional()
    )
})
