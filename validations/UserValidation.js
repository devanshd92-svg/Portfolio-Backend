
import vine from "@vinejs/vine"
import { CustomErrorReporter } from "./customerRepoter.js"

vine.errorReporter = () => new CustomErrorReporter()

export const UserSchema = vine.object({
    name: vine.string().minLength(3).maxLength(150),
    email: vine.string().email(),
     description:vine.string(),
   
    phone: vine.string().minLength(6).regex(/^[0-9]{10}$/)


})
