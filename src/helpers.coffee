module.exports = (app, config) ->
  app.helpers
    chapters:  config.chapters
    development:  app.settings.env == 'development'
    chapter_link: (language, chapter) ->
      "/chapter/#{language}/#{chapter}/#{config.chapters[chapter-1].replace(/\ /g, '_').replace(/'/g, '')}"
