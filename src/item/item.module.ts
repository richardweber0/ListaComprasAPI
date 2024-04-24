import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ItemProviders } from './item.providers';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';

@Module({
    imports: [DatabaseModule, TokenModule],
    controllers: [ItemController],
    providers: [ 
        ...ItemProviders,
        ItemService,
    ],
    exports: [ItemService]
})
export class ItemModule { }