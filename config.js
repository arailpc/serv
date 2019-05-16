const environments = {};

environments.production = {
  port: 5000,
  nameEnv: "production"
};

environments.development = {
  port: 3000,
  nameEnv: "development"
};

const currentEnvironment = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV.toLowerCase() : "";

const environmentForExport =
  typeof environments[currentEnvironment] === "object" ? environments[currentEnvironment] : environments.development;

module.exports = environmentForExport;
hvv