import { Server } from '@overnightjs/core';
import './util/module-alias';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as http from 'http';

export class SetupServer extends Server {
  private server?: http.Server;

  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  private setupControllers(): void {}

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log('Server listening on: ' + this.port);
    });
  }
}
