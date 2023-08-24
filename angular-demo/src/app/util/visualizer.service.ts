import {Injectable} from "@angular/core";

@Injectable()
export class Visualizer{
  serializeQueryParams(params: any): string {
    return Object.keys(params)
      .map(key => {
        const value = params[key];
        if (value !== null && value !== undefined) {
          // Convert numbers to strings, and escape values
          const serializedValue = typeof value === 'number' ? value.toString() : encodeURIComponent(value);
          return `${key}=${serializedValue}`;
        }
        return ''; // Skip null or undefined values
      })
      .filter(param => param !== '') // Remove empty values
      .join('&');
  }

}
