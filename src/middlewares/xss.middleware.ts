import DOMPurify from 'dompurify';
import { NextFunction, Request, Response } from 'express';
import { JSDOM } from 'jsdom';
import { inHTMLData } from 'xss-filters';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const config = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'img'],
  ALLOWED_ATTR: ['href', 'title']
};

/**
 * Clean for xss.
 * @param {string/object} data - The value to sanitize
 * @return {string/object} The sanitized value
 */
export const clean = <T>(data: T | string = ''): T => {
  if (data === null || data === undefined) {
    return data as T;
  }

  if (typeof data === 'object') {
    // Array
    if (Array.isArray(data)) {
      return data.map((item) => clean(item)) as T;
    }

    // JSON
    return Object.entries(data).reduce(
      (acc, [key, value]) => {
        acc[key] = clean(value); // Recursively clean the value
        return acc;
      },
      {} as Record<string, unknown>
    ) as T;
  }

  if (typeof data === 'string') {
    return inHTMLData(purify.sanitize(data, config)).trim() as T;
  }

  return data;
};

const middleware = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.body) {
      req.body = clean(req.body);
    }
    if (req.query) {
      req.query = clean(req.query);
    }
    if (req.params) {
      req.params = clean(req.params);
    }

    next();
  };
};

export default middleware;
