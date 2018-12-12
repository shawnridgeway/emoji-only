// 3p
import React, { createContext } from 'react';
import { User } from '../../types';

// Project


/* --- UserProvider Component --- */
export type UserContextShape = User | null;

const UserContext = createContext<UserContextShape>(null);

export default UserContext;
