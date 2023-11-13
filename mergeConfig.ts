import merge from 'ts-deepmerge';

export default function mergeConfig(config: any, userConfig: any) {
  if (userConfig) {
    import(userConfig)
      .then((cfg) => {
        return merge(config, cfg.default ?? cfg);
      })
      .catch((err) => {
        console.error(`error merging ${userConfig}`, err);
      });
  }
  return config;
}
