import { createContext } from 'react';

export interface Auth {
  token: string | null;
  sendOtp: (mobileNumber: string) => Promise<void>;
  signIn: (mobileNumber: string, otp: string) => Promise<void>;
  signOut: () => void;
}

export interface AuthState {
  token: string | null;
}

interface UpdateToken {
  type: 'UPDATE_TOKEN';
  payload: {
    token: string | null;
  };
}

export function updateToken(token: string | null): UpdateToken {
  return {
    type: 'UPDATE_TOKEN',
    payload: {
      token
    }
  };
}

export type Action = UpdateToken;

export const initialState: AuthState = {
  token: null
};

const noop = () => Object.create(null);
export const AuthContext = createContext<Auth>({
  sendOtp: noop,
  signIn: noop,
  signOut: noop,
  token: null
});

export function reducer(state: AuthState, action: Action) {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return { ...state, token: action.payload.token };
    default:
      throw new Error();
  }
}
