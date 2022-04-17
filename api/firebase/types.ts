import { User } from 'firebase/auth';

export type SignInResult = [User | null, string | null];
