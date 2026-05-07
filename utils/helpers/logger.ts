import winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Define log levels with colors
const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        verify: 2,
        info: 3,
        http: 4,
        verbose: 5,
        debug: 6,
        silly: 7
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        verify: 'cyan',
        info: 'green',
        http: 'magenta',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'grey'
    }
};

// Add colors to winston
winston.addColors(logLevels.colors);

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Console format with colors
const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.printf(({ timestamp, level, message, ...metadata }) => {
        let msg = `${timestamp} [${level}]: ${message}`;
        if (Object.keys(metadata).length > 0) {
            msg += ` ${JSON.stringify(metadata)}`;
        }
        return msg;
    })
);

// Create transports
const transports: winston.transport[] = [];

// Console transport
if (process.env.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console({
            format: consoleFormat,
            level: process.env.LOG_LEVEL || 'debug'
        })
    );
}

// File transport for all logs
transports.push(
    new DailyRotateFile({
        filename: path.join('logs', '%DATE%-combined.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: logFormat,
        level: 'info'
    })
);

// File transport for errors only
transports.push(
    new DailyRotateFile({
        filename: path.join('logs', '%DATE%-error.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        level: 'error',
        format: logFormat
    })
);

// Create logger instance
const logger = winston.createLogger({
    levels: logLevels.levels,
    format: logFormat,
    transports,
    exitOnError: false
}) as winston.Logger & { verify: winston.LeveledLogMethod };

export default logger;