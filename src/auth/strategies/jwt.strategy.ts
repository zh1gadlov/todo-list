import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "../../config.service";


const configService = new ConfigService();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 
  constructor() {    
    super(
      {        
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,        
        secretOrKey: configService.get("JWT_SECRET"),
      });  
    }
    
  async validate(payload: any) {
    return { id: payload.sub, password: payload.password };  }
}
