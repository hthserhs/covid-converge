import { createContext } from 'react';
import { HealthWorkerDTO } from './types/types';

export interface Auth {
  token: string | null;
  user: HealthWorkerDTO | null;
  sendOtp: (mobileNumber: string) => Promise<void>;
  signIn: (mobileNumber: string, otp: string) => Promise<void>;
  signOut: () => void;
}

export interface AuthState {
  token: string | null;
  user: HealthWorkerDTO | null;
}

interface UpdateToken {
  type: 'UPDATE_TOKEN';
  payload: {
    token: string | null;
  };
}

interface UpdateUser {
  type: 'UPDATE_USER';
  payload: {
    user: HealthWorkerDTO | null;
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

export function updateUser(user: HealthWorkerDTO | null): UpdateUser {
  return {
    type: 'UPDATE_USER',
    payload: {
      user
    }
  };
}

export type Action = UpdateToken | UpdateUser;

export const initialState: AuthState = {
  token: null,
  user: null
};

const noop = () => Object.create(null);

export const AuthContext = createContext<Auth>({
  sendOtp: noop,
  signIn: noop,
  signOut: noop,
  token: null,
  user: null
});

export function reducer(state: AuthState, action: Action) {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return { ...state, token: action.payload.token };
    case 'UPDATE_USER':
      return { ...state, user: action.payload.user };
    default:
      throw new Error();
  }
}
