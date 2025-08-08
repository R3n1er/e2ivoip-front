// Strapi admin configuration with explicit typing for env to satisfy TypeScript
export default ({
  env,
}: {
  env: (key: string, defaultValue?: unknown) => any;
}) => {
  const getBool = (key: string, defaultValue: boolean) => {
    const value = env(key);
    if (value === undefined || value === null) return defaultValue;
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      return ["1", "true", "yes", "on"].includes(normalized)
        ? true
        : ["0", "false", "no", "off"].includes(normalized)
          ? false
          : defaultValue;
    }
    return defaultValue;
  };

  return {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
    apiToken: {
      salt: env("API_TOKEN_SALT"),
    },
    transfer: {
      token: {
        salt: env("TRANSFER_TOKEN_SALT"),
      },
    },
    secrets: {
      encryptionKey: env("ENCRYPTION_KEY"),
    },
    flags: {
      nps: getBool("FLAG_NPS", true),
      promoteEE: getBool("FLAG_PROMOTE_EE", true),
    },
  };
};
