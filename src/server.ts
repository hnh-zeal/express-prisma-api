import http from 'http';

import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';

// import { Server } from 'socket.io';

import localeMiddleware from './middlewares/locale.middleware';
import i18n from './utils/i18n';
import { config, prisma } from '@/config';
import xss from '@/middlewares/xss.middleware';
import { appRoutes } from '@/routes';

export function start(app: Application): void {
  app.use(i18n.init);
  app.use(localeMiddleware);
  standardMiddleware(app);
  securityMiddleware(app);
  routesMiddleware(app);
  startServer(app);
}

function securityMiddleware(app: Application): void {
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(xss());
  app.use(
    cors({
      origin: ['*', 'http://localhost:5173', 'http://localhost:4173', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    })
  );
}

function standardMiddleware(app: Application): void {
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ extended: true, limit: '200mb' }));
}

function routesMiddleware(app: Application): void {
  appRoutes(app);
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.log(`Server has started with process id ${process.pid}`);
    httpServer.listen(config.SERVER_PORT, () => {
      console.log(`Server running on port ${config.SERVER_PORT}`);
    });

    // const httpServer: http.Server = new http.Server(app);
    // const socketIO: Server = await createSocketIO(httpServer);
    // this.startHttpServer(httpServer);
    // this.socketIOConnections(socketIO);
  } catch (error) {
    console.log('Server failed', error);
  }
}

// async function createSocketIO(httpServer: http.Server): Promise<Server> {
//   const io: Server = new Server(httpServer, {
//     cors: {
//       origin: `${config.CLIENT_URL}`,
//       methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
//     }
//   });
//   const pubClient = createClient({ url: config.REDIS_HOST });
//   const subClient = pubClient.duplicate();
//   await Promise.all([pubClient.connect(), subClient.connect()]);
//   io.adapter(createAdapter(pubClient, subClient));
//   socketIO = io;
//   return io;
// }

export function databaseConnection(): void {
  prisma
    .$connect()
    .then(() => console.log('Prisma connected successfully!'))
    .catch((err: any) => console.error('Failed to connect Prisma:', err));
}
