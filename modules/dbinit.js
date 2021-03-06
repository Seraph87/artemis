const npm = require("./NPM.js");
npm.npm();
exports.dbinit = function () {
  //////////////////////
  //user info/level DB//
  //////////////////////
  const table1 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';"
    )
    .get();
  if (!table1["count(*)"]) {
    db.prepare(
      "CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, warning INTEGER, muted INTEGER, translate INTEGER, stream INTEGER, notes TEXT);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  ////////////////////
  //Channelmanage DB//
  ////////////////////
  const table2 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guildhub';"
    )
    .get();
  if (!table2["count(*)"]) {
    db.prepare(
      "CREATE TABLE guildhub (guild TEXT PRIMARY KEY, generalChannel TEXT, highlightChannel TEXT, muteChannel TEXT, logsChannel TEXT, streamChannel TEXT, reactionChannel TEXT, streamHere TEXT, autoMod TEXT, prefix TEXT, leveling TEXT);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_guidhub_id ON guildhub (guild);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  ////////////////////
  //Rolemanage    DB//
  ////////////////////
  const table3 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'roles';"
    )
    .get();
  if (!table3["count(*)"]) {
    db.prepare(
      "CREATE TABLE roles (guild TEXT, roles TEXT PRIMARY KEY);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_roles_id ON roles (roles);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  ////////////////////
  //Word filter   DB//
  ////////////////////
  const table4 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'words';"
    )
    .get();
  if (!table4["count(*)"]) {
    db.prepare(
      "CREATE TABLE words (guild TEXT, words TEXT, wordguild TEXT PRIMARY KEY);"
    ).run();
    db.prepare(
      "CREATE UNIQUE INDEX idx_wordguild_id ON words (wordguild);"
    ).run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  ////////////////////
  //level up      DB//
  ////////////////////
  const table5 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'level';"
    )
    .get();
  if (!table5["count(*)"]) {
    db.prepare(
      "CREATE TABLE level (guild TEXT PRIMARY KEY, lvl5 TEXT, lvl10 TEXT, lvl15 TEXT, lvl20 TEXT, lvl30 TEXT, lvl50 TEXT, lvl85 TEXT);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_level_id ON level (guild);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  ////////////////////
  //command usage DB//
  ////////////////////
  const table6 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'usage';"
    )
    .get();
  if (!table6["count(*)"]) {
    db.prepare(
      "CREATE TABLE usage (command TEXT PRIMARY KEY, number TEXT);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_usage_id ON usage (command);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  //////////////////////
  //Remind          DB//
  //////////////////////
  const table7 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'remind';"
    )
    .get();
  if (!table7["count(*)"]) {
    db.prepare(
      "CREATE TABLE remind (mid TEXT PRIMARY KEY, cid TEXT, gid TEXT, uid TEXT, time TEXT, reminder TEXT);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_remind_id ON remind (mid);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  //////////////////////
  //mute or stream  DB//
  //////////////////////
  const table8 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'timers';"
    )
    .get();
  if (!table8["count(*)"]) {
    db.prepare(
      "CREATE TABLE timers (mid TEXT PRIMARY KEY, cid TEXT, gid TEXT, uid TEXT, time TEXT, bs TEXT);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_timers_id ON timers (mid);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  //////////////////////
  //support         DB//
  //////////////////////
  const table9 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'support';"
    )
    .get();
  if (!table9["count(*)"]) {
    db.prepare(
      "CREATE TABLE support (cid TEXT PRIMARY KEY, gid TEXT, inuse TEXT);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_support_id ON support (cid);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  //////////////////////
  //specs           DB//
  //////////////////////
  const table10 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'specs';"
    )
    .get();
  if (!table10["count(*)"]) {
    db.prepare("CREATE TABLE specs (uid TEXT PRIMARY KEY, spec TEXT);").run();
    db.prepare("CREATE UNIQUE INDEX idx_specs_id ON specs (uid);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  //////////////////////
  //support cases   DB//
  //////////////////////
  const table11 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'supcase';"
    )
    .get();
  if (!table11["count(*)"]) {
    db.prepare(
      "CREATE TABLE supcase (scase TEXT PRIMARY KEY, askby TEXT, question TEXT, solveby TEXT, answer TEXT, murl TEXT);"
    ).run();
    db.prepare("CREATE UNIQUE INDEX idx_supcase_id ON supcase (scase);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  //////////////////////
  //settings        DB//
  //////////////////////
  const table12 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'settings';"
    )
    .get();
  if (!table12["count(*)"]) {
    db.prepare(
      "CREATE TABLE settings (guild TEXT PRIMARY KEY, leavejoin TEXT, deletemsg TEXT, editmsg TEXT, bumpping TEXT);"
    ).run();
    db.prepare(
      "CREATE UNIQUE INDEX idx_settings_id ON settings (guild);"
    ).run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  //////////////////////
  //UWU             DB//
  //////////////////////
  const table13 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'uwu';"
    )
    .get();
  if (!table13["count(*)"]) {
    db.prepare("CREATE TABLE uwu (cid TEXT PRIMARY KEY, gid TEXT);").run();
    db.prepare("CREATE UNIQUE INDEX idx_uwu_id ON support (cid);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

  //////////////////////
  //Admin Cases     DB//
  //////////////////////
  const table14 = db
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'admincases';"
    )
    .get();
  if (!table14["count(*)"]) {
    db.prepare("CREATE TABLE admincases (guildidcaseid TEXT PRIMARY KEY, caseid INTEGER, guildid TEXT, userid TEXT, username TEXT, type TEXT, reason TEXT, date TEXT);").run();
    db.prepare("CREATE UNIQUE INDEX idx_admincases_id ON admincases (guildidcaseid);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");
  }

   //run admincases
   getACase = db.prepare("SELECT * FROM admincases WHERE guildid = ?");
   setACase = db.prepare(
     "INSERT OR REPLACE INTO admincases (guildidcaseid, caseid, guildid, userid, username, type, reason, date) VALUES (@guildidcaseid, @caseid, @guildid, @userid, @username, @type, @reason, @date);"
   );

  //run uwu
  getUwu = db.prepare("SELECT * FROM uwu WHERE cid = ? AND gid = ?");
  setUwu = db.prepare(
    "INSERT OR REPLACE INTO uwu (cid, gid) VALUES (@cid, @gid);"
  );

  //run Settings
  getSettings = db.prepare("SELECT * FROM settings WHERE guild = ?");
  setSettings = db.prepare(
    "INSERT OR REPLACE INTO settings (guild, leavejoin, deletemsg, editmsg, bumpping) VALUES (@guild, @leavejoin, @deletemsg, @editmsg, @bumpping);"
  );

  //run support cases
  getSupCase = db.prepare("SELECT * FROM supcase WHERE scase = ?");
  setSupCase = db.prepare(
    "INSERT OR REPLACE INTO supcase (scase, askby, question, solveby, answer, murl) VALUES (@scase, @askby, @question, @solveby, @answer, @murl);"
  );

  //Run specs DB
  getSpecs = db.prepare("SELECT * FROM specs WHERE uid = ?");
  setSpecs = db.prepare(
    "INSERT OR REPLACE INTO specs (uid, spec) VALUES (@uid, @spec);"
  );

  //Run support DB
  getSupport = db.prepare("SELECT * FROM support WHERE cid = ? AND gid = ?");
  setSupport = db.prepare(
    "INSERT OR REPLACE INTO support (cid, gid, inuse) VALUES (@cid, @gid, @inuse);"
  );

  //Run remind DB
  getRemind = db.prepare("SELECT * FROM remind WHERE time = ?");
  setRemind = db.prepare(
    "INSERT OR REPLACE INTO remind (mid, cid, gid, uid, time, reminder) VALUES (@mid, @cid, @gid, @uid, @time, @reminder);"
  );

  //Run ban or stream DB
  getTimers = db.prepare("SELECT * FROM timers WHERE time = ?");
  setTimers = db.prepare(
    "INSERT OR REPLACE INTO timers (mid, cid, gid, uid, time, bs) VALUES (@mid, @cid, @gid, @uid, @time, @bs);"
  );

  //Run user info/scores
  getScore = db.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  setScore = db.prepare(
    "INSERT OR REPLACE INTO scores (id, user, guild, points, level, warning, muted, translate, stream, notes) VALUES (@id, @user, @guild, @points, @level, @warning, @muted, @translate, @stream, @notes);"
  );

  //loadusage
  getUsage = db.prepare("SELECT * FROM usage WHERE command = ?");
  setUsage = db.prepare(
    "INSERT OR REPLACE INTO usage (command, number) VALUES (@command, @number);"
  );

  //run level up
  getLevel = db.prepare("SELECT * FROM level WHERE guild = ?");
  setLevel = db.prepare(
    "INSERT OR REPLACE INTO level (guild, lvl5, lvl10, lvl15, lvl20, lvl30, lvl50, lvl85) VALUES (@guild, @lvl5, @lvl10, @lvl15, @lvl20, @lvl30, @lvl50, @lvl85);"
  );

  //run word filter
  getWords = db.prepare("SELECT * FROM words WHERE guild = ?");
  setWords = db.prepare(
    "INSERT OR REPLACE INTO words (guild, words) VALUES (@guild, @words);"
  );

  //run rolemanage
  getRoles = db.prepare("SELECT * FROM roles WHERE guild = ?");
  setRoles = db.prepare(
    "INSERT OR REPLACE INTO roles (guild, roles) VALUES (@guild, @roles);"
  );

  //run channelmanage
  getGuild = db.prepare("SELECT * FROM guildhub WHERE guild = ?");
  setGuild = db.prepare(
    "INSERT OR REPLACE INTO guildhub (guild, generalChannel, highlightChannel, muteChannel, logsChannel, streamChannel, reactionChannel, streamHere, autoMod, prefix, leveling, wmessage) VALUES (@guild, @generalChannel, @highlightChannel, @muteChannel, @logsChannel, @streamChannel, @reactionChannel, @streamHere, @autoMod, @prefix, @leveling, @wmessage);"
  );
};
