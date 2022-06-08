import { Request, Response, NextFunction } from 'express'

import retrieve from '../../cases/users/retrieve'
import HttpResponse from '../../../utils/http/response/http-response'

class GetUserRouter{
  get = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const id = req.user.sub
      const user = await retrieve.run(id)
  
      res.send(
        HttpResponse.success( { message: 'User retrieved', data: {user: user.retrievableData()} } )
      )
  
    } catch (error) {
      next(error)
    }
  }
}

export default new GetUserRouter()
