## Basic setup

Simple clone and install setup:

```
git clone https://github.com/juegodynamics/vulcano.git
npm install

// Start listening on port 3005
npm run start-dev
```

## Factorio Export

This repo is instantiated with a full set of complex mods to demo some of the more complex features. If you'd like to run with your local mod configuration, you can do the following:

1. While running your instance of Factorio, press `~` to access the Factorio console.
2. Paste in the console scripts from `src/dev/console` to export the recipe/entity data that matches your current combination of mods. (The exports will live in your [User data directory](https://wiki.factorio.com/Application_directory); for me this was `~/Library/Application Support/factorio/script-output`)
3. These exports should then be migrated to `src/dev/data`
4. Finally, run `npm run transform` to transform the data to JSON and create all the indices for searching (output will go into `src/server/data`)
