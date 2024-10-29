import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { Amplify } from '@aws-amplify/core';
import { MainStack } from './components/MainStack';
import { awsConfig } from './config/aws-config';

Object.defineProperty(global, '__DEV__', { value: false });

// Initialize AWS Amplify
Amplify.configure(awsConfig);

ReactNativeScript.start(React.createElement(MainStack, {}, null));