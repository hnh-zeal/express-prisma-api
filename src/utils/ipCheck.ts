import geoip from 'geoip-lite';
import { notificationChannel } from './telegram-bot';

export const isLocalIP = (ip: string): boolean => {
  return (
    ip === '127.0.0.1' || // IPv4 localhost
    ip === '::1' || // IPv6 localhost
    ip.startsWith('10.') || // Private IPv4 range
    ip.startsWith('192.168.') || // Private IPv4 range
    (ip.startsWith('172.') && parseInt(ip.split('.')[1]) >= 16 && parseInt(ip.split('.')[1]) <= 31) // 172.16.0.0 - 172.31.255.255
  );
};

export const getLocationFromIP = async (ip: string) => {
  const geo = geoip.lookup(ip);
  if (geo) {
    await notificationChannel(JSON.stringify(geo));
    return {
      city: geo.city,
      region: geo.region,
      country: geo.country,
      latitude: geo.ll[0],
      longitude: geo.ll[1]
    };
  }
  return null;
};
