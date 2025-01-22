import { init } from 'next/dist/compiled/webpack/webpack';
import TelegramBot, { Message, Metadata } from 'node-telegram-bot-api';

const BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN as string;
const IS_POLLING: boolean = true;

class TelegramBotClass {
    public instance: TelegramBot | null = null;
    private isInited: boolean = false;
    constructor(isPolling: boolean = true) {
        if (this.isInited) {
            return;
        } else {
            this.isInited = true;
        }
        this.instance = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN as string, { polling: isPolling });
        if (isPolling) {
            try {
                this.instance.on('polling_error', async (error: any) => {});
                this.instance.on('message', async (msg: Message, metadata: Metadata) => {
                    console.log(111111, msg, metadata, this.isInited);
                });
                this.instance.on('channel_post', async (post: any) => {
                    console.log(111111, post, this.isInited);
                });
                this.instance.on('group_post', async (post: any) => {
                    console.log(111111, post, this.isInited);
                });
            } catch (error) {}
        }
        
    }
}


export async function getTelegramBot(isPolling: boolean = IS_POLLING): Promise<TelegramBotClass> {
    const telegramBot = new TelegramBotClass(isPolling); /// 
    if (!isPolling) {
        console.log(2222222, await telegramBot.instance?.getUpdates()); // store offset of last update in db 
    }
    return telegramBot;
};