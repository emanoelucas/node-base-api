import { saveUser, loadUserByEmail } from '../../../infra/repositories/users'
import { BadRequestError } from '../../../utils/http/erros'
import encrypter from '../../../utils/libraries/encrypter'
import {equalPasswordsValidator, passwordCharactersValidator } from '../../../utils/validators'

class Creation {
  private saveUser: typeof saveUser
  private loadByEmail: typeof loadUserByEmail
  private encrypter: typeof encrypter
  private equalPassword: typeof equalPasswordsValidator
  private passwordCharactersValidator: typeof passwordCharactersValidator
  constructor() {
    this.saveUser = saveUser
    this.loadByEmail = loadUserByEmail
    this.encrypter = encrypter
    this.equalPassword = equalPasswordsValidator
    this.passwordCharactersValidator = passwordCharactersValidator
  }

  async create (name: string, lastName:string, phoneNumber: string, email: string, password: string, repeatPassword: string) {
    
    const user = await this.loadByEmail.load(email)
    if (user) 
      throw new BadRequestError('This email is already in use')
    
    const equalPassword = this.equalPassword.validate(password, repeatPassword)
    if (!equalPassword)
      throw new BadRequestError('Passwords are no equals')
    
    this.passwordCharactersValidator.validate(password)

    const hashedPassword = await this.encrypter.hash(password, Number(process.env.ENCRYPTER_SALT))

    return await this.saveUser.save(name, lastName, phoneNumber, email, hashedPassword)
  }
}

export default new Creation()