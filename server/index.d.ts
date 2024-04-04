import 'express-serve-static-core';
import TokenPayloadDto from './src/utils/dtos/tokens/tokenPayload.dto';

declare module 'express-serve-static-core' {
  interface Request {
    user: TokenPayloadDto;
  }
}
