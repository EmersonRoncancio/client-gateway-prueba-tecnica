import { Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const rpcResponse = exception.getError();

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (rpcResponse.toString().includes('Empty')) {
      return response.status(500).json({
        statusCode: 500,
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        message: rpcResponse
          .toString()
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          .substring(0, rpcResponse.toString().indexOf('(') - 1),
      });
    }

    if (
      typeof rpcResponse === 'object' &&
      'statusCode' in rpcResponse &&
      'message' in rpcResponse
    ) {
      const status = rpcResponse.statusCode;
      return response.status(status as number).json(rpcResponse);
    }

    response.status(400).json({
      statusCode: 400,
      message: rpcResponse,
    });
  }
}
