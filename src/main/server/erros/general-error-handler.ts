import { Request, Response, NextFunction } from 'express'

import { IHttpError } from './../../../utils/http/erros/IHttpError'
import HttpResponse from './../../../utils/http/response'

export default (error: IHttpError, req: Request, res: Response, next: NextFunction) => {
  
  const internalError = 500
  res.status(error.status || internalError)
  
  const response = {
    message: error.message,
    data: {}
  }

  res.send( HttpResponse.build(response, false) )
  
  error.stack ? console.log('\n', 'stack:', error.stack) : console.log('\n')
}
