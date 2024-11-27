const port = 'PORT' as const;
const nodeEnv= 'NODE_ENV' as const;

export const envVariableKeys = {
  port,
  nodeEnv,
} as const;