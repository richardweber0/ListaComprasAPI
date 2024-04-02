import { Body, Controller, Put } from "@nestjs/common";
import { RefreshTokenDTO } from "./dto/refresh.token.dto";
import { TokenService } from "./token.service";

@Controller('token')
export class TokenController {
    constructor(
        private tokenService: TokenService
    ) { }

    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDTO) {
        return this.tokenService.refreshToken(data.oldToken)
    }
}