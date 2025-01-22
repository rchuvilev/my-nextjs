import 'server-only';
import { getTelegramBot } from './TelegramBot';

export const ActionTelegramBotMount = async (req: Request): Promise<any> => {
	const telegramBot = getTelegramBot();
};



