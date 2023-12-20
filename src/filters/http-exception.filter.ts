import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  catch(exception: HttpException, host: ArgumentsHost): never {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error(
      `${request.url} : HttpException`,
      exception.getResponse(),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.status(status).json({
      statusResponse: status,
      message: undefined,
      error: exception.getResponse(),
    });
  }
}
