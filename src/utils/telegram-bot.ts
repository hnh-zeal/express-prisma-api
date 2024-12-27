import axios from 'axios';
import { config } from '@/config';

const send = async (channelId: string, text: string) => {
  try {
    const url = `https://api.telegram.org/${config.TELEGRAM_TOKEN}/sendMessage?chat_id=${channelId}&text=${text}&disable_web_page_preview=true;`;
    const data = await axios.get(url);
    return data;
  } catch (error) {
    console.log('telegram error', error);
  }
};

const cronJobChannel = async (text: string) => {
  return send(config.TELEGRAM_SUCCESS_CHANNEL, text);
};

const notificationChannel = async (text: string) => {
  return send(config.TELEGRAM_SUCCESS_CHANNEL, text);
};

const errorChannel = async (text: string) => {
  return send(config.TELEGRAM_ERROR_CHANNEL, text);
};

export { cronJobChannel, notificationChannel, errorChannel };
