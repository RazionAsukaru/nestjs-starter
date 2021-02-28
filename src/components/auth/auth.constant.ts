import { ConfigService } from "@nestjs/config";

class config {
    constructor(private configService:ConfigService){}

    
}

const c = new ConfigService();

export const data= new config(c);
