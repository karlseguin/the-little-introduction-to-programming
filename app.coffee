source = if /app\.coffee$/.test(process.argv[1]) then './src/' else './lib/'
config = require('./config')
require(source + 'server')(config)