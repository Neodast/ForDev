import 'express-serve-static-core'
import TokenPayloadDto from './src/models/dto/TokenDtos/tokenPayload.dto'

declare module 'express-serve-static-core' {
	interface Request {
		authUser?: TokenPayloadDto
	}
}