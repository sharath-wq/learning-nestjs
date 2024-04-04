import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())}\t${entry}\n`;

    const logFilePath = path.join(__dirname, '..', '..', 'logs', 'logfile.log');

    try {
      if (!fs.existsSync(path.dirname(logFilePath))) {
        await fsPromises.mkdir(path.dirname(logFilePath), { recursive: true });
      }

      await fsPromises.appendFile(logFilePath, formattedEntry);
    } catch (e) {
      console.error(e instanceof Error ? e.message : e);
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
