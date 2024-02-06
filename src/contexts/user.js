import { createContext } from '@lit/context';

const contextKey = Symbol('user');

export const userContext = createContext(contextKey);
