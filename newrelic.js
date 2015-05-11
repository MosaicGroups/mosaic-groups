/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['mosaic-groups-' + process.env.NODE_ENV || 'dev'],
  /**
   * Your New Relic license key.
   */
  license_key: 'c3ccc656fe0cb52ee50cd8e238ffe74a1cecac6d',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
};
