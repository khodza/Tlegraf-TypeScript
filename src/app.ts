import { Telegraf, session } from "telegraf";
import { IConfigInterface } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";

class Bot{
    bot:Telegraf<IBotContext>;
    commands:Command[]=[];
    constructor(private readonly configService:IConfigInterface){
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        console.log(this.bot,this.configService.get('TOKEN'));
        this.bot.use(session())
    }
    init(){
        this.commands =[new StartCommand(this.bot)]
        for(const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService);
bot.init();