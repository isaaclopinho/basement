import { AxiosConnection } from 'api/connection';

export default class GameConnection extends AxiosConnection {
  constructor() {
    super(process.env.NEXT_PUBLIC_GAME_API_BASE_URL);
  }
}
