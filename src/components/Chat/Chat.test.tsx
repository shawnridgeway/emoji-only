// 3p
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';

// Project
import { createSetup, itRenders } from '../../utils/testUtils';
import Chat, { ChatProps } from './Chat';
import { Message, User } from '../../types';


/* --- Setup --- */
const setup = createSetup(Chat, {});

/* --- Tests --- */
itRenders(setup().wrapper);