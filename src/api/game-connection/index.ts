import { AxiosConnection } from '../connection';

export class GameConnection extends AxiosConnection {
  constructor() {
    super(process.env.NEXT_PUBLIC_GAME_API_BASE_URL);
  }
}
