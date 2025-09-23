import { NextFunction, Request, Response } from "express";

export const validateOrigin = (req: Request, res: Response, next: NextFunction): Response | void => {
    const allowedOrigins = [
        "https://app-responde.munijlo.gob.pe",
        "http://localhost:4321"
    ]

    const origin = req.headers.origin || req.headers.referer
    const userAgent = req.headers['user-agent'] || ''

    if (!origin) {
        return res.status(403).json({
            error: "Acceso denegado: origen desconocido"
        })
    }
    const isValidOrigin = allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))
    if (!isValidOrigin) {
        return res.status(403).json({
            error: "Acceso denegado: origen no permitido"
        })
    }
    const suspiciousAgents = [
        'curl',
        'wget',
        'httpie',
        'aria2',
        'fetch',
        'python-requests',
        'python-urllib',
        'urllib',
        'requests',
        'python-httplib',
        'go-http-client',
        'golang',
        'okhttp',
        'okhttp3',
        'java',
        'apache-httpclient',
        'apache-httpcomponents',
        'node-fetch',
        'axios',
        'superagent',
        'got',
        'unirest',
        'httpclient',
        'postman',
        'insomnia',
        'thunder-client',
        'thunderclient',
        'thunder client',
        'paw',
        'hoppscotch',
        'restclient',
        'libwww-perl',
        'lwp',
        'mechanize',
        'perl',
        'php-curl',
        'http_request2',
        'pecl_http',
        'selenium',
        'phantomjs',
        'headless',
        'puppeteer',
        'chromium',
        'chrome headless',
        'firefox headless',
        'sqlmap',
        'nmap',
        'nikto',
        'masscan',
        'zmap',
        'zgrab',
        'acunetix',
        'burpsuite',
        'burp',
        'owasp-zap',
        'zaproxy',
        'fimap',
        'wpscan',
        'ffuf',
        'dirbuster',
        'dirb',
        'gobuster',
        'scrapy',
        'spider',
        'crawler',
        'bot',
        'crawl',
        'bingbot',
        'googlebot',
        'yandexbot',
        'baiduspider',
        'facebookexternalhit',
        'slurp',
        'curl-agent',
        'httpie/',
        'python-requests/'
    ]
    const isSuspiciousAgent = suspiciousAgents.some(agent => userAgent.toLowerCase().includes(agent))
    if (isSuspiciousAgent) {
        return res.status(403).json({
            error: "Acceso denegado: agente sospechoso detectado"
        })
    }
    return next()
}