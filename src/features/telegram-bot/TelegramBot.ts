import { init } from 'next/dist/compiled/webpack/webpack';
import TelegramBot, { Message, Metadata } from 'node-telegram-bot-api';

const BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN as string;

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
            this.instance.on('message', async (msg: Message, metadata: Metadata) => {
                console.log(111111, msg, metadata, this.isInited);
            });
        }
        // this.instance.on('channel_post', async (msg: Message, metadata: Metadata) => {
        //     console.log(111111, msg, metadata, this.isInited);
        // });
    }
}

const telegramBot = new TelegramBotClass(false);

export function getTelegramBot() {
    return telegramBot;
};