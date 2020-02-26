const Router = require('@koa/router');
const router = new Router();

// 遍历整个 routes 文件夹，导入模块路由 router.js 和 router-custom.js 文件
// 格式参考用例：routes/epicgames/router.js
const RouterPath = require('require-all')({
    dirname: __dirname + '/routes',
    filter: /^.*router([-_]custom[s]?)?\.js$/,
});

// 将收集到的自定义模块路由进行合并
for (const project in RouterPath) {
    for (const routerName in RouterPath[project]) {
        const proRouter = RouterPath[project][routerName]();
        proRouter.stack.forEach((nestedLayer) => {
            router.stack.push(nestedLayer);
        });
    }
}

// index
router.get('/', require('./routes/index'));

// test
router.get('/rss/test/:id', require('./routes/test'));

// RSSHub
router.get('/rss/rsshub/rss', require('./routes/rsshub/rss'));

// 1draw
router.get('/rss/1draw/', require('./routes/1draw/index'));

// 1X Magazine
router.get('/rss/1x/magazine', require('./routes/1x/magazine'));

// bilibili
router.get('/rss/bilibili/user/video/:uid/:disableEmbed?', require('./routes/bilibili/video'));
router.get('/rss/bilibili/user/article/:uid', require('./routes/bilibili/article'));
router.get('/rss/bilibili/user/fav/:uid/:disableEmbed?', require('./routes/bilibili/userFav'));
router.get('/rss/bilibili/user/coin/:uid/:disableEmbed?', require('./routes/bilibili/coin'));
router.get('/rss/bilibili/user/dynamic/:uid/:disableEmbed?', require('./routes/bilibili/dynamic'));
router.get('/rss/bilibili/user/followers/:uid', require('./routes/bilibili/followers'));
router.get('/rss/bilibili/user/followings/:uid', require('./routes/bilibili/followings'));
router.get('/rss/bilibili/user/bangumi/:uid', require('./routes/bilibili/user_bangumi'));
router.get('/rss/bilibili/partion/:tid/:disableEmbed?', require('./routes/bilibili/partion'));
router.get('/rss/bilibili/partion/ranking/:tid/:days?/:disableEmbed?', require('./routes/bilibili/partion-ranking'));
router.get('/rss/bilibili/bangumi/:seasonid', require('./routes/bilibili/bangumi')); // 弃用
router.get('/rss/bilibili/bangumi/media/:mediaid', require('./routes/bilibili/bangumi'));
router.get('/rss/bilibili/video/page/:aid/:disableEmbed?', require('./routes/bilibili/page'));
router.get('/rss/bilibili/video/reply/:aid', require('./routes/bilibili/reply'));
router.get('/rss/bilibili/video/danmaku/:aid/:pid?', require('./routes/bilibili/danmaku'));
router.get('/rss/bilibili/link/news/:product', require('./routes/bilibili/linkNews'));
router.get('/rss/bilibili/live/room/:roomID', require('./routes/bilibili/liveRoom'));
router.get('/rss/bilibili/live/search/:key/:order', require('./routes/bilibili/liveSearch'));
router.get('/rss/bilibili/live/area/:areaID/:order', require('./routes/bilibili/liveArea'));
router.get('/rss/bilibili/fav/:uid/:fid/:disableEmbed?', require('./routes/bilibili/fav'));
router.get('/rss/bilibili/blackboard', require('./routes/bilibili/blackboard'));
router.get('/rss/bilibili/mall/new', require('./routes/bilibili/mallNew'));
router.get('/rss/bilibili/mall/ip/:id', require('./routes/bilibili/mallIP'));
router.get('/rss/bilibili/ranking/:rid?/:day?/:arc_type?/:disableEmbed?', require('./routes/bilibili/ranking'));
router.get('/rss/bilibili/user/channel/:uid/:cid/:disableEmbed?', require('./routes/bilibili/userChannel'));
router.get('/rss/bilibili/topic/:topic', require('./routes/bilibili/topic'));
router.get('/rss/bilibili/audio/:id', require('./routes/bilibili/audio'));
router.get('/rss/bilibili/vsearch/:kw/:order?/:disableEmbed?', require('./routes/bilibili/vsearch'));
router.get('/rss/bilibili/followings/video/:uid/:disableEmbed?', require('./routes/bilibili/followings_video'));
router.get('/rss/bilibili/followings/article/:uid', require('./routes/bilibili/followings_article'));
router.get('/rss/bilibili/readlist/:listid', require('./routes/bilibili/readlist'));
router.get('/rss/bilibili/weekly', require('./routes/bilibili/weekly_recommend'));

// bangumi
router.get('/rss/bangumi/calendar/today', require('./routes/bangumi/calendar/today'));
router.get('/rss/bangumi/subject/:id/:type', require('./routes/bangumi/subject'));
router.get('/rss/bangumi/person/:id', require('./routes/bangumi/person'));
router.get('/rss/bangumi/topic/:id', require('./routes/bangumi/group/reply'));
router.get('/rss/bangumi/group/:id', require('./routes/bangumi/group/topic'));
router.get('/rss/bangumi/subject/:id', require('./routes/bangumi/subject'));

// 微博
router.get('/rss/weibo/user/:uid/:displayVideo?', require('./routes/weibo/user'));
router.get('/rss/weibo/keyword/:keyword', require('./routes/weibo/keyword'));
router.get('/rss/weibo/search/hot', require('./routes/weibo/search/hot'));
router.get('/rss/weibo/super_index/:id', require('./routes/weibo/super_index'));
router.get('/rss/weibo/oasis/user/:userid', require('./routes/weibo/oasis/user'));

// 贴吧
router.get('/rss/tieba/forum/:kw', require('./routes/tieba/forum'));
router.get('/rss/tieba/forum/good/:kw/:cid?', require('./routes/tieba/forum'));
router.get('/rss/tieba/post/:id', require('./routes/tieba/post'));
router.get('/rss/tieba/post/lz/:id', require('./routes/tieba/post'));

// 网易云音乐
router.get('/rss/ncm/playlist/:id', require('./routes/ncm/playlist'));
router.get('/rss/ncm/user/playlist/:uid', require('./routes/ncm/userplaylist'));
router.get('/rss/ncm/artist/:id', require('./routes/ncm/artist'));
router.get('/rss/ncm/djradio/:id', require('./routes/ncm/djradio'));

// 掘金
router.get('/rss/juejin/category/:category', require('./routes/juejin/category'));
router.get('/rss/juejin/tag/:tag', require('./routes/juejin/tag'));
router.get('/rss/juejin/trending/:category/:type', require('./routes/juejin/trending'));
router.get('/rss/juejin/books', require('./routes/juejin/books'));
router.get('/rss/juejin/pins', require('./routes/juejin/pins'));
router.get('/rss/juejin/posts/:id', require('./routes/juejin/posts'));
router.get('/rss/juejin/collections/:userId', require('./routes/juejin/favorites'));
router.get('/rss/juejin/collection/:collectionId', require('./routes/juejin/collection'));
router.get('/rss/juejin/shares/:userId', require('./routes/juejin/shares'));

// 自如
router.get('/rss/ziroom/room/:city/:iswhole/:room/:keyword', require('./routes/ziroom/room'));

// 简书
router.get('/rss/jianshu/home', require('./routes/jianshu/home'));
router.get('/rss/jianshu/trending/:timeframe', require('./routes/jianshu/trending'));
router.get('/rss/jianshu/collection/:id', require('./routes/jianshu/collection'));
router.get('/rss/jianshu/user/:id', require('./routes/jianshu/user'));

// 知乎
router.get('/rss/zhihu/collection/:id', require('./routes/zhihu/collection'));
router.get('/rss/zhihu/people/activities/:id', require('./routes/zhihu/activities'));
router.get('/rss/zhihu/people/answers/:id', require('./routes/zhihu/answers'));
router.get('/rss/zhihu/people/posts/:id', require('./routes/zhihu/posts'));
router.get('/rss/zhihu/zhuanlan/:id', require('./routes/zhihu/zhuanlan'));
router.get('/rss/zhihu/daily', require('./routes/zhihu/daily'));
router.get('/rss/zhihu/daily/section/:sectionId', require('./routes/zhihu/daily_section'));
router.get('/rss/zhihu/hotlist', require('./routes/zhihu/hotlist'));
router.get('/rss/zhihu/pin/hotlist', require('./routes/zhihu/pin/hotlist'));
router.get('/rss/zhihu/question/:questionId', require('./routes/zhihu/question'));
router.get('/rss/zhihu/topic/:topicId', require('./routes/zhihu/topic'));
router.get('/rss/zhihu/people/pins/:id', require('./routes/zhihu/pin/people'));
router.get('/rss/zhihu/bookstore/newest', require('./routes/zhihu/bookstore/newest'));
router.get('/rss/zhihu/pin/daily', require('./routes/zhihu/pin/daily'));
router.get('/rss/zhihu/weekly', require('./routes/zhihu/weekly'));

// 妹子图
router.get('/rss/mzitu/home/:type?', require('./routes/mzitu/home'));
router.get('/rss/mzitu/tags', require('./routes/mzitu/tags'));
router.get('/rss/mzitu/category/:category', require('./routes/mzitu/category'));
router.get('/rss/mzitu/post/:id', require('./routes/mzitu/post'));
router.get('/rss/mzitu/tag/:tag', require('./routes/mzitu/tag'));

// pixiv
router.get('/rss/pixiv/user/bookmarks/:id', require('./routes/pixiv/bookmarks'));
router.get('/rss/pixiv/user/illustfollows', require('./routes/pixiv/illustfollow'));
router.get('/rss/pixiv/user/:id/', require('./routes/pixiv/user'));
router.get('/rss/pixiv/ranking/:mode/:date?', require('./routes/pixiv/ranking'));
router.get('/rss/pixiv/search/:keyword/:order?/:r18?', require('./routes/pixiv/search'));

// 豆瓣
router.get('/rss/douban/movie/playing', require('./routes/douban/playing'));
router.get('/rss/douban/movie/playing/:score', require('./routes/douban/playing'));
router.get('/rss/douban/movie/playing/:score/:city', require('./routes/douban/playing'));
router.get('/rss/douban/movie/later', require('./routes/douban/later'));
router.get('/rss/douban/movie/ustop', require('./routes/douban/ustop'));
router.get('/rss/douban/movie/weekly', require('./routes/douban/weekly_best'));
router.get('/rss/douban/movie/classification/:sort?/:score?/:tags?', require('./routes/douban/classification.js'));
router.get('/rss/douban/group/:groupid', require('./routes/douban/group'));
router.get('/rss/douban/explore', require('./routes/douban/explore'));
router.get('/rss/douban/music/latest/:area?', require('./routes/douban/latest_music'));
router.get('/rss/douban/book/latest', require('./routes/douban/latest_book'));
router.get('/rss/douban/event/hot/:locationId', require('./routes/douban/event/hot'));
router.get('/rss/douban/commercialpress/latest', require('./routes/douban/commercialpress/latest'));
router.get('/rss/douban/bookstore', require('./routes/douban/bookstore'));
router.get('/rss/douban/book/rank/:type', require('./routes/douban/book/rank'));
router.get('/rss/douban/doulist/:id', require('./routes/douban/doulist'));
router.get('/rss/douban/explore/column/:id', require('./routes/douban/explore_column'));
router.get('/rss/douban/people/:userid/status', require('./routes/douban/people/status.js'));
router.get('/rss/douban/topic/:id/:sort?', require('./routes/douban/topic.js'));
router.get('/rss/douban/channel/:id/:nav?', require('./routes/douban/channel/topic.js'));
router.get('/rss/douban/channel/:id/subject/:nav', require('./routes/douban/channel/subject.js'));

// 法律白話文運動
router.get('/rss/plainlaw/archives', require('./routes/plainlaw/archives.js'));

// 煎蛋
router.get('/rss/jandan/:sub_model', require('./routes/jandan/pic'));

// 喷嚏
router.get('/rss/dapenti/tugua', require('./routes/dapenti/tugua'));
router.get('/rss/dapenti/subject/:id', require('./routes/dapenti/subject'));

// Dockone
router.get('/rss/dockone/weekly', require('./routes/dockone/weekly'));

// 开发者头条
router.get('/rss/toutiao/today', require('./routes/toutiao/today'));
router.get('/rss/toutiao/user/:id', require('./routes/toutiao/user'));

// 众成翻译
router.get('/rss/zcfy', require('./routes/zcfy/index'));
router.get('/rss/zcfy/index', require('./routes/zcfy/index')); // 废弃
router.get('/rss/zcfy/hot', require('./routes/zcfy/hot'));

// 今日头条
router.get('/rss/jinritoutiao/keyword/:keyword', require('./routes/jinritoutiao/keyword'));

// Disqus
router.get('/rss/disqus/posts/:forum', require('./routes/disqus/posts'));

// Twitter
router.get('/rss/twitter/user/:id/:type?', require('./routes/twitter/user'));
router.get('/rss/twitter/list/:id/:name', require('./routes/twitter/list'));
router.get('/rss/twitter/likes/:id', require('./routes/twitter/likes'));
router.get('/rss/twitter/followings/:id', require('./routes/twitter/followings'));
router.get('/rss/twitter/keyword/:keyword', require('./routes/twitter/keyword'));

// Instagram
router.get('/rss/instagram/user/:id', require('./routes/instagram/user'));
router.get('/rss/instagram/tag/:tag', require('./routes/instagram/tag'));
router.get('/rss/instagram/story/:username', require('./routes/instagram/story'));

// Youtube
router.get('/rss/youtube/user/:username/:embed?', require('./routes/youtube/user'));
router.get('/rss/youtube/channel/:id/:embed?', require('./routes/youtube/channel'));
router.get('/rss/youtube/playlist/:id/:embed?', require('./routes/youtube/playlist'));

// 极客时间
router.get('/rss/geektime/column/:cid', require('./routes/geektime/column'));
router.get('/rss/geektime/news', require('./routes/geektime/news'));

// 界面新闻
router.get('/rss/jiemian/list/:cid', require('./routes/jiemian/list.js'));

// 好奇心日报
router.get('/rss/qdaily/notch/posts', require('./routes/qdaily/notch/index'));
router.get('/rss/qdaily/notch/explore/:id', require('./routes/qdaily/notch/explore'));
router.get('/rss/qdaily/:type/:id', require('./routes/qdaily/index'));

// 爱奇艺
router.get('/rss/iqiyi/dongman/:id', require('./routes/iqiyi/dongman'));
router.get('/rss/iqiyi/user/video/:uid', require('./routes/iqiyi/video'));

// 南方周末
router.get('/rss/infzm/:id', require('./routes/infzm/news'));

// Dribbble
router.get('/rss/dribbble/popular/:timeframe?', require('./routes/dribbble/popular'));
router.get('/rss/dribbble/user/:name', require('./routes/dribbble/user'));
router.get('/rss/dribbble/keyword/:keyword', require('./routes/dribbble/keyword'));

// 斗鱼
router.get('/rss/douyu/room/:id', require('./routes/douyu/room'));

// 虎牙
router.get('/rss/huya/live/:id', require('./routes/huya/live'));

// kingkong直播
router.get('/rss/kingkong/room/:id', require('./routes/kingkong/room'));

// v2ex
router.get('/rss/v2ex/topics/:type', require('./routes/v2ex/topics'));
router.get('/rss/v2ex/post/:postid', require('./routes/v2ex/post'));

// Telegram
router.get('/rss/telegram/channel/:username', require('./routes/telegram/channel'));
router.get('/rss/telegram/stickerpack/:name', require('./routes/telegram/stickerpack'));
router.get('/rss/telegram/blog', require('./routes/telegram/blog'));

// readhub
router.get('/rss/readhub/category/:category', require('./routes/readhub/category'));

// GitHub
router.get('/rss/github/repos/:user', require('./routes/github/repos'));
router.get('/rss/github/trending/:since/:language?', require('./routes/github/trending'));
router.get('/rss/github/issue/:user/:repo/:state?/:labels?', require('./routes/github/issue'));
router.get('/rss/github/pull/:user/:repo', require('./routes/github/pulls'));
router.get('/rss/github/user/followers/:user', require('./routes/github/follower'));
router.get('/rss/github/stars/:user/:repo', require('./routes/github/star'));
router.get('/rss/github/search/:query/:sort?/:order?', require('./routes/github/search'));
router.get('/rss/github/branches/:user/:repo', require('./routes/github/branches'));
router.get('/rss/github/file/:user/:repo/:branch/:filepath+', require('./routes/github/file'));
router.get('/rss/github/starred_repos/:user', require('./routes/github/starred_repos'));
// f-droid
router.get('/rss/fdroid/apprelease/:app', require('./routes/fdroid/apprelease'));

// konachan
router.get('/rss/konachan/post/popular_recent', require('./routes/konachan/post_popular_recent'));
router.get('/rss/konachan.com/post/popular_recent', require('./routes/konachan/post_popular_recent'));
router.get('/rss/konachan.net/post/popular_recent', require('./routes/konachan/post_popular_recent'));
router.get('/rss/konachan/post/popular_recent/:period', require('./routes/konachan/post_popular_recent'));
router.get('/rss/konachan.com/post/popular_recent/:period', require('./routes/konachan/post_popular_recent'));
router.get('/rss/konachan.net/post/popular_recent/:period', require('./routes/konachan/post_popular_recent'));

// yande.re
router.get('/rss/yande.re/post/popular_recent', require('./routes/yande.re/post_popular_recent'));
router.get('/rss/yande.re/post/popular_recent/:period', require('./routes/yande.re/post_popular_recent'));

// 纽约时报
router.get('/rss/nytimes/morning_post', require('./routes/nytimes/morning_post'));
router.get('/rss/nytimes/:lang?', require('./routes/nytimes/index'));

// 3dm
router.get('/rss/3dm/:name/:type', require('./routes/3dm/game'));
router.get('/rss/3dm/news', require('./routes/3dm/news_center'));

// 旅法师营地
router.get('/rss/lfsyd/:typecode', require('./routes/lfsyd/index'));

// 喜马拉雅
router.get('/rss/ximalaya/album/:id/:all?', require('./routes/ximalaya/album'));

// EZTV
router.get('/rss/eztv/torrents/:imdb_id', require('./routes/eztv/imdb'));

// 什么值得买
router.get('/rss/smzdm/keyword/:keyword', require('./routes/smzdm/keyword'));
router.get('/rss/smzdm/ranking/:rank_type/:rank_id/:hour', require('./routes/smzdm/ranking'));
router.get('/rss/smzdm/haowen/:day?', require('./routes/smzdm/haowen'));
router.get('/rss/smzdm/haowen/fenlei/:name/:sort?', require('./routes/smzdm/haowen_fenlei'));

// 新京报
router.get('/rss/bjnews/:cat', require('./routes/bjnews/news'));

// 停水通知
router.get('/rss/tingshuitz/hangzhou', require('./routes/tingshuitz/hangzhou'));
router.get('/rss/tingshuitz/xiaoshan', require('./routes/tingshuitz/xiaoshan'));
router.get('/rss/tingshuitz/dalian', require('./routes/tingshuitz/dalian'));
router.get('/rss/tingshuitz/guangzhou', require('./routes/tingshuitz/guangzhou'));
router.get('/rss/tingshuitz/dongguan', require('./routes/tingshuitz/dongguan'));
router.get('/rss/tingshuitz/xian', require('./routes/tingshuitz/xian'));
router.get('/rss/tingshuitz/yangjiang', require('./routes/tingshuitz/yangjiang'));
router.get('/rss/tingshuitz/nanjing', require('./routes/tingshuitz/nanjing'));
router.get('/rss/tingshuitz/wuhan', require('./routes/tingshuitz/wuhan'));

// 米哈游
router.get('/rss/mihoyo/bh3/:type', require('./routes/mihoyo/bh3'));
router.get('/rss/mihoyo/bh2/:type', require('./routes/mihoyo/bh2'));

// 新闻联播
router.get('/rss/cctv/xwlb', require('./routes/cctv/xwlb'));
// 央视新闻
router.get('/rss/cctv/:category', require('./routes/cctv/category'));

// 财新博客
router.get('/rss/caixin/blog/:column', require('./routes/caixin/blog'));
// 财新
router.get('/rss/caixin/:column/:category', require('./routes/caixin/category'));
// 财新首页
router.get('/rss/caixin/article', require('./routes/caixin/article'));

// 草榴社区
router.get('/rss/t66y/post/:tid', require('./routes/t66y/post'));
router.get('/rss/t66y/:id/:type?', require('./routes/t66y/index'));

// 色中色
router.get('/rss/sexinsex/:id/:type?', require('./routes/sexinsex/index'));

// 机核
router.get('/rss/gcores/category/:category', require('./routes/gcores/category'));

// 国家地理
router.get('/rss/natgeo/dailyphoto', require('./routes/natgeo/dailyphoto'));
router.get('/rss/natgeo/:cat/:type?', require('./routes/natgeo/natgeo'));

// 一个
router.get('/rss/one', require('./routes/one/index'));

// Firefox
router.get('/rss/firefox/release/:platform', require('./routes/firefox/release'));
router.get('/rss/firefox/addons/:id', require('./routes/firefox/addons'));

// Thunderbird
router.get('/rss/thunderbird/release', require('./routes/thunderbird/release'));

// tuicool
router.get('/rss/tuicool/mags/:type', require('./routes/tuicool/mags'));

// Hexo
router.get('/rss/hexo/next/:url', require('./routes/hexo/next'));
router.get('/rss/hexo/yilia/:url', require('./routes/hexo/yilia'));

// 小米
router.get('/rss/mi/crowdfunding', require('./routes/mi/crowdfunding'));
router.get('/rss/mi/youpin/crowdfunding', require('./routes/mi/youpin/crowdfunding'));
router.get('/rss/mi/youpin/new', require('./routes/mi/youpin/new'));
router.get('/rss/miui/:device/:type?/:region?', require('./routes/mi/miui/index'));
router.get('/rss/mi/bbs/board/:boardId', require('./routes/mi/board'));

// Keep
router.get('/rss/keep/user/:id', require('./routes/keep/user'));

// 起点
router.get('/rss/qidian/chapter/:id', require('./routes/qidian/chapter'));
router.get('/rss/qidian/forum/:id', require('./routes/qidian/forum'));
router.get('/rss/qidian/free/:type?', require('./routes/qidian/free'));
router.get('/rss/qidian/free-next/:type?', require('./routes/qidian/free-next'));

// 纵横
router.get('/rss/zongheng/chapter/:id', require('./routes/zongheng/chapter'));

// 刺猬猫
router.get('/rss/ciweimao/chapter/:id', require('./routes/ciweimao/chapter'));

// 中国美术馆
router.get('/rss/namoc/announcement', require('./routes/namoc/announcement'));
router.get('/rss/namoc/news', require('./routes/namoc/news'));
router.get('/rss/namoc/media', require('./routes/namoc/media'));
router.get('/rss/namoc/exhibition', require('./routes/namoc/exhibition'));
router.get('/rss/namoc/specials', require('./routes/namoc/specials'));

// 懂球帝
router.get('/rss/dongqiudi/daily', require('./routes/dongqiudi/daily'));
router.get('/rss/dongqiudi/result/:team', require('./routes/dongqiudi/result'));
router.get('/rss/dongqiudi/team_news/:team', require('./routes/dongqiudi/team_news'));
router.get('/rss/dongqiudi/player_news/:id', require('./routes/dongqiudi/player_news'));
router.get('/rss/dongqiudi/special/:id', require('./routes/dongqiudi/special'));
router.get('/rss/dongqiudi/top_news/:id?', require('./routes/dongqiudi/top_news'));

// 维基百科 Wikipedia
router.get('/rss/wikipedia/mainland', require('./routes/wikipedia/mainland'));

// 联合国 United Nations
router.get('/rss/un/scveto', require('./routes/un/scveto'));

// e 公司
router.get('/rss/egsea/flash', require('./routes/egsea/flash'));

// 选股宝
router.get('/rss/xuangubao/subject/:subject_id', require('./routes/xuangubao/subject'));

// 雪球
router.get('/rss/xueqiu/user/:id/:type?', require('./routes/xueqiu/user'));
router.get('/rss/xueqiu/favorite/:id', require('./routes/xueqiu/favorite'));
router.get('/rss/xueqiu/user_stock/:id', require('./routes/xueqiu/user_stock'));
router.get('/rss/xueqiu/fund/:id', require('./routes/xueqiu/fund'));
router.get('/rss/xueqiu/stock_info/:id/:type?', require('./routes/xueqiu/stock_info'));
router.get('/rss/xueqiu/snb/:id', require('./routes/xueqiu/snb'));
router.get('/rss/xueqiu/hots', require('./routes/xueqiu/hots'));

// Greasy Fork
router.get('/rss/greasyfork/:language/:domain?', require('./routes/greasyfork/scripts'));

// LinkedKeeper
router.get('/rss/linkedkeeper/:type/:id?', require('./routes/linkedkeeper/index'));

// 开源中国
router.get('/rss/oschina/news/:category?', require('./routes/oschina/news'));
router.get('/rss/oschina/user/:id', require('./routes/oschina/user'));
router.get('/rss/oschina/u/:id', require('./routes/oschina/u'));
router.get('/rss/oschina/topic/:topic', require('./routes/oschina/topic'));

// 安全客
router.get('/rss/aqk/vul', require('./routes/aqk/vul'));
router.get('/rss/aqk/:category', require('./routes/aqk/category'));

// 腾讯大家
router.get('/rss/dajia', require('./routes/tencent/dajia/index'));
router.get('/rss/dajia/author/:uid', require('./routes/tencent/dajia/author'));
router.get('/rss/dajia/zhuanlan/:uid', require('./routes/tencent/dajia/zhuanlan'));

// 腾讯游戏开发者社区
router.get('/rss/gameinstitute/community/:tag?', require('./routes/tencent/gameinstitute/community'));

// 腾讯视频 SDK
router.get('/rss/qcloud/mlvb/changelog', require('./routes/tencent/qcloud/mlvb/changelog'));

// 腾讯吐个槽
router.get('/rss/tucaoqq/post/:project/:key', require('./routes/tencent/tucaoqq/post'));

// Bugly SDK
router.get('/rss/bugly/changelog/:platform', require('./routes/tencent/bugly/changelog'));

// wechat
router.get('/rss/wechat/wemp/:id', require('./routes/tencent/wechat/wemp'));
router.get('/rss/wechat/csm/:id', require('./routes/tencent/wechat/csm'));
router.get('/rss/wechat/ce/:id', require('./routes/tencent/wechat/ce'));
router.get('/rss/wechat/announce', require('./routes/tencent/wechat/announce'));
router.get('/rss/wechat/miniprogram/plugins', require('./routes/tencent/wechat/miniprogram/plugins'));
router.get('/rss/wechat/tgchannel/:id', require('./routes/tencent/wechat/tgchannel'));
router.get('/rss/wechat/uread/:userid', require('./routes/tencent/wechat/uread'));
router.get('/rss/wechat/ershicimi/:id', require('./routes/tencent/wechat/ershcimi'));

// All the Flight Deals
router.get('/rss/atfd/:locations/:nearby?', require('./routes/atfd/index'));

// Fir
router.get('/rss/fir/update/:id', require('./routes/fir/update'));

// Nvidia Web Driver
router.get('/rss/nvidia/webdriverupdate', require('./routes/nvidia/webdriverupdate'));

// Google
router.get('/rss/google/citations/:id', require('./routes/google/citations'));
router.get('/rss/google/scholar/:query', require('./routes/google/scholar'));
router.get('/rss/google/doodles/:language?', require('./routes/google/doodles'));
router.get('/rss/google/album/:id', require('./routes/google/album'));

// Awesome Pigtals
router.get('/rss/pigtails', require('./routes/pigtails'));

// 每日环球展览 iMuseum
router.get('/rss/imuseum/:city/:type?', require('./routes/imuseum'));

// AppStore
router.get('/rss/appstore/update/:country/:id', require('./routes/apple/appstore/update'));
router.get('/rss/appstore/price/:country/:type/:id', require('./routes/apple/appstore/price'));
router.get('/rss/appstore/iap/:country/:id', require('./routes/apple/appstore/in-app-purchase'));
router.get('/rss/appstore/xianmian', require('./routes/apple/appstore/xianmian'));
router.get('/rss/appstore/gofans', require('./routes/apple/appstore/gofans'));

// Hopper
router.get('/rss/hopper/:lowestOnly/:from/:to?', require('./routes/hopper/index'));

// 马蜂窝
router.get('/rss/mafengwo/note/:type', require('./routes/mafengwo/note'));

// 中国地震局震情速递（与地震台网同步更新）
router.get('/rss/earthquake/:region?', require('./routes/earthquake'));

// 中国地震台网
router.get('/rss/earthquake/ceic/:type', require('./routes/earthquake/ceic'));

// 笔趣阁
router.get('/rss/biquge/novel/latestchapter/:id', require('./routes/novel/biquge'));

// UU看书
router.get('/rss/uukanshu/chapter/:uid', require('./routes/novel/uukanshu'));

// 小说
router.get('/rss/novel/biquge/:id', require('./routes/novel/biquge'));
router.get('/rss/novel/uukanshu/:uid', require('./routes/novel/uukanshu'));
router.get('/rss/novel/wenxuemi/:id1/:id2', require('./routes/novel/wenxuemi'));
router.get('/rss/novel/booksky/:id', require('./routes/novel/booksky'));
router.get('/rss/novel/shuquge/:id', require('./routes/novel/shuquge'));
router.get('/rss/novel/ptwxz/:id1/:id2', require('./routes/novel/ptwxz'));

// 中国气象网
router.get('/rss/weatheralarm', require('./routes/weatheralarm'));

// Gitlab
router.get('/rss/gitlab/explore/:type', require('./routes/gitlab/explore'));

// 忧郁的loli
router.get('/rss/mygalgame', require('./routes/galgame/mmgal')); // 废弃
router.get('/rss/mmgal', require('./routes/galgame/mmgal'));

// say花火
router.get('/rss/sayhuahuo', require('./routes/galgame/sayhuahuo'));

// 终点分享
router.get('/rss/zdfx', require('./routes/galgame/zdfx'));

// 北京理工大学
router.get('/rss/bit/jwc', require('./routes/universities/bit/jwc/jwc'));
router.get('/rss/bit/cs', require('./routes/universities/bit/cs/cs'));

// 大连工业大学
router.get('/rss/dpu/jiaowu/news/:type?', require('./routes/universities/dpu/jiaowu/news'));
router.get('/rss/dpu/wlfw/news/:type?', require('./routes/universities/dpu/wlfw/news'));

// 东南大学
router.get('/rss/seu/radio/academic', require('./routes/universities/seu/radio/academic'));
router.get('/rss/seu/yzb/:type', require('./routes/universities/seu/yzb'));
router.get('/rss/seu/cse/:type?', require('./routes/universities/seu/cse'));

// 南京工业大学
router.get('/rss/njtech/jwc', require('./routes/universities/njtech/jwc'));

// 南京航空航天大学
router.get('/rss/nuaa/jwc/:type?', require('./routes/universities/nuaa/jwc/jwc'));
router.get('/rss/nuaa/cs/:type?', require('./routes/universities/nuaa/cs/index'));
router.get('/rss/nuaa/yjsy/:type?', require('./routes/universities/nuaa/yjsy/yjsy'));

// 哈尔滨工业大学
router.get('/rss/hit/jwc', require('./routes/universities/hit/jwc'));
router.get('/rss/hit/today/:category', require('./routes/universities/hit/today'));

// 上海科技大学
router.get('/rss/shanghaitech/sist/activity', require('./routes/universities/shanghaitech/sist/activity'));

// 上海交通大学
router.get('/rss/sjtu/seiee/academic', require('./routes/universities/sjtu/seiee/academic'));
router.get('/rss/sjtu/seiee/bjwb/:type', require('./routes/universities/sjtu/seiee/bjwb'));
router.get('/rss/sjtu/seiee/xsb/:type?', require('./routes/universities/sjtu/seiee/xsb'));

router.get('/rss/sjtu/gs/tzgg/:type?', require('./routes/universities/sjtu/gs/tzgg'));
router.get('/rss/sjtu/jwc/:type?', require('./routes/universities/sjtu/jwc'));
router.get('/rss/sjtu/tongqu', require('./routes/universities/sjtu/tongqu/activity'));

// 江南大学
router.get('/rss/ju/jwc/:type?', require('./routes/universities/ju/jwc'));

// 洛阳理工学院
router.get('/rss/lit/jwc', require('./routes/universities/lit/jwc'));
router.get('/rss/lit/xwzx/:name?', require('./routes/universities/lit/xwzx'));
router.get('/rss/lit/tw/:name?', require('./routes/universities/lit/tw'));

// 清华大学
router.get('/rss/thu/:type', require('./routes/universities/thu/index'));

// 北京大学
router.get('/rss/pku/eecs/:type?', require('./routes/universities/pku/eecs'));
router.get('/rss/pku/rccp/mzyt', require('./routes/universities/pku/rccp/mzyt'));
router.get('/rss/pku/cls/lecture', require('./routes/universities/pku/cls/lecture'));
router.get('/rss/pku/bbs/hot', require('./routes/universities/pku/bbs/hot'));

// 上海海事大学
router.get('/rss/shmtu/www/:type', require('./routes/universities/shmtu/www'));
router.get('/rss/shmtu/jwc/:type', require('./routes/universities/shmtu/jwc'));

// 西南科技大学
router.get('/rss/swust/jwc/news', require('./routes/universities/swust/jwc_news'));
router.get('/rss/swust/jwc/notice/:type?', require('./routes/universities/swust/jwc_notice'));
router.get('/rss/swust/cs/:type?', require('./routes/universities/swust/cs'));

// 华南师范大学
router.get('/rss/scnu/jw', require('./routes/universities/scnu/jw'));
router.get('/rss/scnu/library', require('./routes/universities/scnu/library'));
router.get('/rss/scnu/cs/match', require('./routes/universities/scnu/cs/match'));

// 广东工业大学
router.get('/rss/gdut/news', require('./routes/universities/gdut/news'));

// 中国科学院
router.get('/rss/cas/sim/academic', require('./routes/universities/cas/sim/academic'));

// 中国传媒大学
router.get('/rss/cuc/yz', require('./routes/universities/cuc/yz'));

// 南京邮电大学
router.get('/rss/njupt/jwc/:type?', require('./routes/universities/njupt/jwc'));

// 南昌航空大学
router.get('/rss/nchu/jwc/:type?', require('./routes/universities/nchu/jwc'));

// 哈尔滨工程大学
router.get('/rss/heu/ugs/news/:author?/:category?', require('./routes/universities/heu/ugs/news'));

// 重庆大学
router.get('/rss/cqu/jwc/announcement', require('./routes/universities/cqu/jwc/announcement'));
router.get('/rss/cqu/news/jzyg', require('./routes/universities/cqu/news/jzyg'));

// 南京信息工程大学
router.get('/rss/nuist/bulletin/:category?', require('./routes/universities/nuist/bulletin'));
router.get('/rss/nuist/jwc/:category?', require('./routes/universities/nuist/jwc'));
router.get('/rss/nuist/yjs/:category?', require('./routes/universities/nuist/yjs'));
router.get('/rss/nuist/xgc', require('./routes/universities/nuist/xgc'));
router.get('/rss/nuist/scs/:category?', require('./routes/universities/nuist/scs'));
router.get('/rss/nuist/lib', require('./routes/universities/nuist/library/lib'));
router.get('/rss/nuist/sese/:category?', require('./routes/universities/nuist/sese'));
router.get('/rss/nuist/cas/:category?', require('./routes/universities/nuist/cas'));

// 成都信息工程大学
router.get('/rss/cuit/cxxww/:type?', require('./routes/universities/cuit/cxxww'));

// 郑州大学
router.get('/rss/zzu/news/:type', require('./routes/universities/zzu/news'));
router.get('/rss/zzu/soft/news/:type', require('./routes/universities/zzu/soft/news'));

// 重庆科技学院
router.get('/rss/cqust/jw/:type?', require('./routes/universities/cqust/jw'));
router.get('/rss/cqust/lib/:type?', require('./routes/universities/cqust/lib'));

// 常州大学
router.get('/rss/cczu/jwc/:category?', require('./routes/universities/cczu/jwc'));
router.get('/rss/cczu/news/:category?', require('./routes/universities/cczu/news'));

// 南京理工大学
router.get('/rss/njust/jwc/:type', require('./routes/universities/njust/jwc'));
router.get('/rss/njust/cwc/:type', require('./routes/universities/njust/cwc'));
router.get('/rss/njust/gs/:type', require('./routes/universities/njust/gs'));

// 四川旅游学院
router.get('/rss/sctu/xgxy', require('./routes/universities/sctu/information-engineer-faculty/index'));
router.get('/rss/sctu/xgxy/:id', require('./routes/universities/sctu/information-engineer-faculty/context'));
router.get('/rss/sctu/jwc/:type?', require('./routes/universities/sctu/jwc/index'));
router.get('/rss/sctu/jwc/:type/:id', require('./routes/universities/sctu/jwc/context'));

// 电子科技大学
router.get('/rss/uestc/jwc/:type?', require('./routes/universities/uestc/jwc'));
router.get('/rss/uestc/news/:type?', require('./routes/universities/uestc/news'));
router.get('/rss/uestc/auto/:type?', require('./routes/universities/uestc/auto'));
router.get('/rss/uestc/cs/:type?', require('./routes/universities/uestc/cs'));

// 昆明理工大学
router.get('/rss/kmust/jwc/:type?', require('./routes/universities/kmust/jwc'));
router.get('/rss/kmust/job/careers/:type?', require('./routes/universities/kmust/job/careers'));
router.get('/rss/kmust/job/jobfairs', require('./routes/universities/kmust/job/jobfairs'));

// 武汉大学
router.get('/rss/whu/cs/:type', require('./routes/universities/whu/cs'));
router.get('/rss/whu/news/:type?', require('./routes/universities/whu/news'));

// 华中科技大学
router.get('/rss/hust/auto/notice/:type?', require('./routes/universities/hust/aia/notice'));
router.get('/rss/hust/auto/news/', require('./routes/universities/hust/aia/news'));
router.get('/rss/hust/aia/news/', require('./routes/universities/hust/aia/news'));
router.get('/rss/hust/aia/notice/:type?', require('./routes/universities/hust/aia/notice'));

// 井冈山大学
router.get('/rss/jgsu/jwc', require('./routes/universities/jgsu/jwc'));

// 中南大学
router.get('/rss/csu/job/:type?', require('./routes/universities/csu/job'));

// 山东大学
router.get('/rss/sdu/sc/:type?', require('./routes/universities/sdu/sc'));
router.get('/rss/sdu/cs/:type?', require('./routes/universities/sdu/cs'));
router.get('/rss/sdu/cmse/:type?', require('./routes/universities/sdu/cmse'));
router.get('/rss/sdu/mech/:type?', require('./routes/universities/sdu/mech'));
router.get('/rss/sdu/epe/:type?', require('./routes/universities/sdu/epe'));

// 中国海洋大学
router.get('/rss/ouc/it/:type?', require('./routes/universities/ouc/it'));

// 大连大学
router.get('/rss/dlu/jiaowu/news', require('./routes/universities/dlu/jiaowu/news'));

// 东莞理工学院
router.get('/rss/dgut/jwc/:type?', require('./routes/universities/dgut/jwc'));
router.get('/rss/dgut/xsc/:type?', require('./routes/universities/dgut/xsc'));

// 同济大学
router.get('/rss/tju/sse/:type?', require('./routes/universities/tju/sse/notice'));

// 华南理工大学
router.get('/rss/scut/jwc/notice/:category?', require('./routes/universities/scut/jwc/notice'));
router.get('/rss/scut/jwc/news', require('./routes/universities/scut/jwc/news'));

// 温州商学院
router.get('/rss/wzbc/:type?', require('./routes/universities/wzbc/news'));

// 河南大学
router.get('/rss/henu/:type?', require('./routes/universities/henu/news'));

// 南开大学
router.get('/rss/nku/jwc/:type?', require('./routes/universities/nku/jwc/index'));

// 北京航空航天大学
router.get('/rss/buaa/news/:type', require('./routes/universities/buaa/news/index'));

// 上海大学
router.get('/rss/shu/jwc/:type?', require('./routes/universities/shu/jwc'));

// 北京科技大学天津学院
router.get('/rss/ustb/tj/news/:type?', require('./routes/universities/ustb/tj/news'));

// 深圳大学
router.get('/rss/szu/yz/:type?', require('./routes/universities/szu/yz'));

// 中国石油大学（华东）
router.get('/rss/upc/main/:type?', require('./routes/universities/upc/main'));
router.get('/rss/upc/jsj/:type?', require('./routes/universities/upc/jsj'));

// 华北水利水电大学
router.get('/rss/ncwu/notice', require('./routes/universities/ncwu/notice'));

// ifanr
router.get('/rss/ifanr/:channel?', require('./routes/ifanr/index'));

// 果壳网
router.get('/rss/guokr/scientific', require('./routes/guokr/scientific'));
router.get('/rss/guokr/:category', require('./routes/guokr/calendar'));

// 联合早报
router.get('/rss/zaobao/realtime/:section?', require('./routes/zaobao/realtime'));
router.get('/rss/zaobao/znews/:section?', require('./routes/zaobao/znews'));
router.get('/rss/zaobao/:type/:section', require('./routes/zaobao/'));

// Apple
router.get('/rss/apple/exchange_repair/:country?', require('./routes/apple/exchange_repair'));

// IPSW.me
router.get('/rss/ipsw/index/:ptype/:pname', require('./routes/ipsw/index'));

// Minecraft CurseForge
router.get('/rss/curseforge/files/:project', require('./routes/curseforge/files'));

// 抖音
router.get('/rss/douyin/user/:id', require('./routes/douyin/user'));
router.get('/rss/douyin/like/:id', require('./routes/douyin/like'));

// 少数派 sspai
router.get('/rss/sspai/series', require('./routes/sspai/series'));
router.get('/rss/sspai/shortcuts', require('./routes/sspai/shortcutsGallery'));
router.get('/rss/sspai/matrix', require('./routes/sspai/matrix'));
router.get('/rss/sspai/column/:id', require('./routes/sspai/column'));
router.get('/rss/sspai/author/:id', require('./routes/sspai/author'));
router.get('/rss/sspai/topics', require('./routes/sspai/topics'));
router.get('/rss/sspai/topic/:id', require('./routes/sspai/topic'));
router.get('/rss/sspai/tag/:keyword', require('./routes/sspai/tag'));

// 异次元软件世界
router.get('/rss/iplay/home', require('./routes/iplay/home'));

// xclient.info
router.get('/rss/xclient/app/:name', require('./routes/xclient/app'));

// 中国驻外使领事馆
router.get('/rss/embassy/:country/:city?', require('./routes/embassy/index'));

// 澎湃新闻
router.get('/rss/thepaper/featured', require('./routes/thepaper/featured'));
router.get('/rss/thepaper/channel/:id', require('./routes/thepaper/channel'));

// 澎湃美数课
router.get('/rss/thepaper/839studio', require('./routes/thepaper/839studio/studio.js'));
router.get('/rss/thepaper/839studio/:id', require('./routes/thepaper/839studio/category.js'));

// 电影首发站
router.get('/rss/dysfz', require('./routes/dysfz/index'));
router.get('/rss/dysfz/index', require('./routes/dysfz/index')); // 废弃

// きららファンタジア
router.get('/rss/kirara/news', require('./routes/kirara/news'));

// 电影天堂
router.get('/rss/dytt', require('./routes/dytt/index'));
router.get('/rss/dytt/index', require('./routes/dytt/index')); // 废弃

// BT之家
router.get('/rss/btzj/:type?', require('./routes/btzj/index'));

// 人生05电影网
router.get('/rss/rs05/rs05', require('./routes/rs05/rs05'));

// 趣头条
router.get('/rss/qutoutiao/category/:cid', require('./routes/qutoutiao/category'));

// NHK NEW WEB EASY
router.get('/rss/nhk/news_web_easy', require('./routes/nhk/news_web_easy'));

// BBC
router.get('/rss/bbc/:channel?', require('./routes/bbc/index'));

// FT 中文网
router.get('/rss/ft/:language/:channel?', require('./routes/ft/channel'));

// The Verge
router.get('/rss/verge', require('./routes/verge/index'));

// 看雪
router.get('/rss/pediy/topic/:category?/:type?', require('./routes/pediy/topic'));

// 观止（每日一文）
router.get('/rss/guanzhi', require('./routes/guanzhi/guanzhi'));

// 多维新闻网
router.get('/rss/dwnews/yaowen/:region?', require('./routes/dwnews/yaowen'));
router.get('/rss/dwnews/rank/:type?/:range?', require('./routes/dwnews/rank'));

// 知晓程序
router.get('/rss/miniapp/article/:category', require('./routes/miniapp/article'));
router.get('/rss/miniapp/store/newest', require('./routes/miniapp/store/newest'));

// 后续
router.get('/rss/houxu/live/:id/:timeline?', require('./routes/houxu/live'));
router.get('/rss/houxu/events', require('./routes/houxu/events'));
router.get('/rss/houxu/lives/:type', require('./routes/houxu/lives'));

// 老司机
router.get('/rss/laosiji/hot', require('./routes/laosiji/hot'));
router.get('/rss/laosiji/feed', require('./routes/laosiji/feed'));
router.get('/rss/laosiji/hotshow/:id', require('./routes/laosiji/hotshow'));

// Scientific American 60-Second Science
router.get('/rss/60s-science/transcript', require('./routes/60s-science/transcript'));

// 99% Invisible
router.get('/rss/99percentinvisible/transcript', require('./routes/99percentinvisible/transcript'));

// 青空文庫
router.get('/rss/aozora/newbook/:count?', require('./routes/aozora/newbook'));

// solidot
router.get('/rss/solidot/:type?', require('./routes/solidot/main'));

// Hermes UK
router.get('/rss/parcel/hermesuk/:tracking', require('./routes/parcel/hermesuk'));

// 数字尾巴
router.get('/rss/dgtle', require('./routes/dgtle/index'));
router.get('/rss/dgtle/whale/category/:category', require('./routes/dgtle/whale'));
router.get('/rss/dgtle/whale/rank/:type/:rule', require('./routes/dgtle/whale_rank'));
router.get('/rss/dgtle/trade/:typeId?', require('./routes/dgtle/trade'));
router.get('/rss/dgtle/trade/search/:keyword', require('./routes/dgtle/keyword'));

// 抽屉新热榜
router.get('/rss/chouti/top/:hour?', require('./routes/chouti/top'));
router.get('/rss/chouti/:subject?', require('./routes/chouti'));

// 西安电子科技大学
router.get('/rss/xidian/jwc/:category?', require('./routes/universities/xidian/jwc'));

// Westore
router.get('/rss/westore/new', require('./routes/westore/new'));

// 优酷
router.get('/rss/youku/channel/:channelId/:embed?', require('./routes/youku/channel'));

// 油价
router.get('/rss/oilprice/:area', require('./routes/oilprice'));

// nHentai
router.get('/rss/nhentai/search/:keyword/:mode?', require('./routes/nhentai/search'));
router.get('/rss/nhentai/:key/:keyword/:mode?', require('./routes/nhentai/other'));

// 龙腾网
router.get('/rss/ltaaa/:type?', require('./routes/ltaaa/main'));

// AcFun
router.get('/rss/acfun/bangumi/:id', require('./routes/acfun/bangumi'));
router.get('/rss/acfun/user/video/:uid', require('./routes/acfun/video'));

// Auto Trader
router.get('/rss/autotrader/:query', require('./routes/autotrader'));

// 极客公园
router.get('/rss/geekpark/breakingnews', require('./routes/geekpark/breakingnews'));

// 百度
router.get('/rss/baidu/doodles', require('./routes/baidu/doodles'));
router.get('/rss/baidu/topwords/:boardId?', require('./routes/baidu/topwords'));

// 搜狗
router.get('/rss/sogou/doodles', require('./routes/sogou/doodles'));

// 香港天文台
router.get('/rss/hko/weather', require('./routes/hko/weather'));

// sankakucomplex
router.get('/rss/sankakucomplex/post', require('./routes/sankakucomplex/post'));

// 技术头条
router.get('/rss/blogread/newest', require('./routes/blogread/newest'));

// gnn游戏新闻
router.get('/rss/gnn/gnn', require('./routes/gnn/gnn'));

// a9vg游戏新闻
router.get('/rss/a9vg/a9vg', require('./routes/a9vg/a9vg'));

// IT桔子
router.get('/rss/itjuzi/invest', require('./routes/itjuzi/invest'));
router.get('/rss/itjuzi/merge', require('./routes/itjuzi/merge'));

// 探物
router.get('/rss/tanwu/products', require('./routes/tanwu/products'));

// GitChat
router.get('/rss/gitchat/newest/:category?/:selected?', require('./routes/gitchat/newest'));

// The Guardian
router.get('/rss/guardian/:type', require('./routes/guardian/guardian'));

// 下厨房
router.get('/rss/xiachufang/user/cooked/:id', require('./routes/xiachufang/user/cooked'));
router.get('/rss/xiachufang/user/created/:id', require('./routes/xiachufang/user/created'));
router.get('/rss/xiachufang/popular/:timeframe?', require('./routes/xiachufang/popular'));

// 经济观察报
router.get('/rss/eeo/:category?', require('./routes/eeo/index'));

// 腾讯视频
router.get('/rss/tencentvideo/playlist/:id', require('./routes/tencent/video/playlist'));

// 看漫画
router.get('/rss/manhuagui/comic/:id', require('./routes/manhuagui/comic'));
// 動漫狂
router.get('/rss/cartoonmad/comic/:id', require('./routes/cartoonmad/comic'));
// Vol
router.get('/rss/vol/:mode?', require('./routes/vol/lastupdate'));
// 咚漫
router.get('/rss/dongmanmanhua/:category/:name/:id', require('./routes/dongmanmanhua/comic'));
// webtoons
router.get('/rss/webtoons/:lang/:category/:name/:id', require('./routes/webtoons/comic'));
router.get('/rss/webtoons/naver/:id', require('./routes/webtoons/naver'));

// Tits Guru
router.get('/rss/tits-guru/home', require('./routes/titsguru/home'));
router.get('/rss/tits-guru/daily', require('./routes/titsguru/daily'));
router.get('/rss/tits-guru/category/:type', require('./routes/titsguru/category'));
router.get('/rss/tits-guru/model/:name', require('./routes/titsguru/model'));

// typora
router.get('/rss/typora/changelog', require('./routes/typora/changelog'));

// TSSstatus
router.get('/rss/tssstatus/:board/:build', require('./routes/tssstatus'));

// Anime1
router.get('/rss/anime1/anime/:time/:name', require('./routes/anime1/anime'));
router.get('/rss/anime1/search/:keyword', require('./routes/anime1/search'));

// gitea
router.get('/rss/gitea/blog', require('./routes/gitea/blog'));

// iDownloadBlog
router.get('/rss/idownloadblog', require('./routes/idownloadblog/index'));

// 9to5
router.get('/rss/9to5/:subsite/:tag?', require('./routes/9to5/subsite'));

// TesterHome
router.get('/rss/testerhome/newest', require('./routes/testerhome/newest'));

// 刷屏
router.get('/rss/weseepro/newest', require('./routes/weseepro/newest'));
router.get('/rss/weseepro/newest-direct', require('./routes/weseepro/newest-direct'));
router.get('/rss/weseepro/circle', require('./routes/weseepro/circle'));

// 玩物志
router.get('/rss/coolbuy/newest', require('./routes/coolbuy/newest'));

// NGA
router.get('/rss/nga/forum/:fid/:recommend?', require('./routes/nga/forum'));
router.get('/rss/nga/post/:tid', require('./routes/nga/post'));

// Nautilus
router.get('/rss/nautilus/topic/:tid', require('./routes/nautilus/topics'));

// JavBus
router.get('/rss/javbus/home', require('./routes/javbus/home'));
router.get('/rss/javbus/genre/:gid', require('./routes/javbus/genre'));
router.get('/rss/javbus/star/:sid', require('./routes/javbus/star'));
router.get('/rss/javbus/series/:seriesid', require('./routes/javbus/series'));
router.get('/rss/javbus/uncensored/home', require('./routes/javbus/uncensored/home'));
router.get('/rss/javbus/uncensored/genre/:gid', require('./routes/javbus/uncensored/genre'));
router.get('/rss/javbus/uncensored/star/:sid', require('./routes/javbus/uncensored/star'));
router.get('/rss/javbus/uncensored/series/:seriesid', require('./routes/javbus/uncensored/series'));
router.get('/rss/javbus/western/home', require('./routes/javbus/western/home'));
router.get('/rss/javbus/western/genre/:gid', require('./routes/javbus/western/genre'));
router.get('/rss/javbus/western/star/:sid', require('./routes/javbus/western/star'));
router.get('/rss/javbus/western/series/:seriesid', require('./routes/javbus/western/series'));

// 中山大学
router.get('/rss/sysu/sdcs', require('./routes/universities/sysu/sdcs'));

// 動畫瘋
router.get('/rss/anigamer/new_anime', require('./routes/anigamer/new_anime'));
router.get('/rss/anigamer/anime/:sn', require('./routes/anigamer/anime'));

// Apkpure
router.get('/rss/apkpure/versions/:region/:pkg', require('./routes/apkpure/versions'));

// 豆瓣美女
router.get('/rss/dbmv/:category?', require('./routes/dbmv/index'));

// 中国药科大学
router.get('/rss/cpu/home', require('./routes/universities/cpu/home'));
router.get('/rss/cpu/jwc', require('./routes/universities/cpu/jwc'));
router.get('/rss/cpu/yjsy', require('./routes/universities/cpu/yjsy'));

// 字幕组
router.get('/rss/zimuzu/resource/:id?', require('./routes/zimuzu/resource'));

// 虎嗅
router.get('/rss/huxiu/tag/:id', require('./routes/huxiu/tag'));
router.get('/rss/huxiu/search/:keyword', require('./routes/huxiu/search'));
router.get('/rss/huxiu/author/:id', require('./routes/huxiu/author'));
router.get('/rss/huxiu/article', require('./routes/huxiu/article'));

// Steam
router.get('/rss/steam/search/:params', require('./routes/steam/search'));
router.get('/rss/steam/news/:appids', require('./routes/steam/news'));

// Steamgifts
router.get('/rss/steamgifts/discussions/:category?', require('./routes/steam/steamgifts/discussions'));

// 扇贝
router.get('/rss/shanbay/checkin/:id', require('./routes/shanbay/checkin'));
router.get('/rss/shanbay/footprints/:category?', require('./routes/shanbay/footprints'));

// Facebook
router.get('/rss/facebook/page/:id', require('./routes/facebook/page'));

// 币乎
router.get('/rss/bihu/activaties/:id', require('./routes/bihu/activaties'));

// 停电通知
router.get('/rss/tingdiantz/nanjing', require('./routes/tingdiantz/nanjing'));

// 36kr
router.get('/rss/36kr/search/article/:keyword', require('./routes/36kr/search/article'));
router.get('/rss/36kr/newsflashes', require('./routes/36kr/newsflashes'));

// PMCAFF
router.get('/rss/pmcaff/list/:typeid', require('./routes/pmcaff/list'));
router.get('/rss/pmcaff/feed/:typeid', require('./routes/pmcaff/feed'));

// icourse163
router.get('/rss/icourse163/newest', require('./routes/icourse163/newest'));

// patchwork.kernel.org
router.get('/rss/patchwork.kernel.org/comments/:id', require('./routes/patchwork.kernel.org/comments'));

// 京东众筹
router.get('/rss/jingdong/zhongchou/:type/:status/:sort', require('./routes/jingdong/zhongchou'));

// 淘宝众筹
router.get('/rss/taobao/zhongchou/:type?', require('./routes/taobao/zhongchou'));

// All Poetry
router.get('/rss/allpoetry/:order?', require('./routes/allpoetry/order'));

// 华尔街见闻
router.get('/rss/wallstreetcn/news/global', require('./routes/wallstreetcn/news'));

// 多抓鱼搜索
router.get('/rss/duozhuayu/search/:wd', require('./routes/duozhuayu/search'));

// 创业邦
router.get('/rss/cyzone/author/:id', require('./routes/cyzone/author'));
router.get('/rss/cyzone/label/:name', require('./routes/cyzone/label'));

// 政府
router.get('/rss/gov/zhengce/zuixin', require('./routes/gov/zhengce/zuixin'));
router.get('/rss/gov/zhengce/wenjian/:pcodeJiguan?', require('./routes/gov/zhengce/wenjian'));
router.get('/rss/gov/zhengce/govall/:advance?', require('./routes/gov/zhengce/govall'));
router.get('/rss/gov/province/:name/:category', require('./routes/gov/province'));
router.get('/rss/gov/city/:name/:category', require('./routes/gov/city'));
router.get('/rss/gov/statecouncil/briefing', require('./routes/gov/statecouncil/briefing'));
router.get('/rss/gov/news/:uid', require('./routes/gov/news'));

// 苏州
router.get('/rss/gov/suzhou/news/:uid', require('./routes/gov/suzhou/news'));
router.get('/rss/gov/suzhou/doc', require('./routes/gov/suzhou/doc'));

// 江苏
router.get('/rss/gov/jiangsu/eea/:type?', require('./routes/gov/jiangsu/eea'));

// 山西
router.get('/rss/gov/shanxi/rst/:category', require('./routes/gov/shanxi/rst'));

// 湖南
router.get('/rss/gov/hunan/notice/:type', require('./routes/gov/hunan/notice'));

// 中华人民共和国-海关总署
router.get('/rss/gov/customs/list/:gchannel', require('./routes/gov/customs/list'));

// 中华人民共和国生态环境部
router.get('/rss/gov/mee/gs', require('./routes/gov/mee/gs'));

// 中华人民共和国教育部
router.get('/rss/gov/moe/:type', require('./routes/gov/moe/moe'));

// 中华人民共和国外交部
router.get('/rss/gov/fmprc/fyrbt', require('./routes/gov/fmprc/fyrbt'));

// 国家新闻出版广电总局
router.get('/rss/gov/sapprft/approval/:channel/:detail?', require('./routes/gov/sapprft/7026'));

// 北京卫生健康委员会
router.get('/rss/gov/beijing/mhc/:caty', require('./routes/gov/beijing/mhc'));

// 小黑盒
router.get('/rss/xiaoheihe/user/:id', require('./routes/xiaoheihe/user'));
router.get('/rss/xiaoheihe/news', require('./routes/xiaoheihe/news'));
router.get('/rss/xiaoheihe/discount', require('./routes/xiaoheihe/discount'));

// 惠誉评级
router.get('/rss/fitchratings/site/:type', require('./routes/fitchratings/site'));

// 移动支付
router.get('/rss/mpaypass/news', require('./routes/mpaypass/news'));
router.get('/rss/mpaypass/main/:type?', require('./routes/mpaypass/main'));

// 新浪科技探索
router.get('/rss/sina/discovery/:type', require('./routes/sina/discovery'));

// 新浪科技滚动新闻
router.get('/rss/sina/rollnews', require('./routes/sina/rollnews'));

// 新浪专栏创事记
router.get('/rss/sina/csj', require('./routes/sina/chuangshiji'));

// Animen
router.get('/rss/animen/news/:type', require('./routes/animen/news'));

// D2 资源库
router.get('/rss/d2/daily', require('./routes/d2/daily'));

// ebb
router.get('/rss/ebb', require('./routes/ebb'));

// Indienova
router.get('/rss/indienova/:type', require('./routes/indienova/article'));

// JPMorgan Chase Institute
router.get('/rss/jpmorganchase', require('./routes/jpmorganchase/research'));

// 美拍
router.get('/rss/meipai/user/:uid', require('./routes/meipai/user'));

// 多知网
router.get('/rss/duozhi', require('./routes/duozhi'));

// Docker Hub
router.get('/rss/dockerhub/build/:owner/:image/:tag?', require('./routes/dockerhub/build'));

// 人人都是产品经理
router.get('/rss/woshipm/popular', require('./routes/woshipm/popular'));
router.get('/rss/woshipm/wen', require('./routes/woshipm/wen'));
router.get('/rss/woshipm/bookmarks/:id', require('./routes/woshipm/bookmarks'));
router.get('/rss/woshipm/user_article/:id', require('./routes/woshipm/user_article'));

// 高清电台
router.get('/rss/gaoqing/latest', require('./routes/gaoqing/latest'));

// 轻小说文库
router.get('/rss/wenku8/chapter/:id', require('./routes/wenku8/chapter'));

// 鲸跃汽车
router.get('/rss/whalegogo/home', require('./routes/whalegogo/home'));
router.get('/rss/whalegogo/portal/:type_id/:tagid?/', require('./routes/whalegogo/portal'));

// 爱思想
router.get('/rss/aisixiang/column/:id', require('./routes/aisixiang/column'));
router.get('/rss/aisixiang/ranking/:type?/:range?', require('./routes/aisixiang/ranking'));

// Hacker News
router.get('/rss/hackernews/:section/:type?', require('./routes/hackernews/story'));

// LeetCode
router.get('/rss/leetcode/articles', require('./routes/leetcode/articles'));
router.get('/rss/leetcode/submission/us/:user', require('./routes/leetcode/check-us'));
router.get('/rss/leetcode/submission/cn/:user', require('./routes/leetcode/check-cn'));

// segmentfault
router.get('/rss/segmentfault/channel/:name', require('./routes/segmentfault/channel'));

// 虎扑
router.get('/rss/hupu/bxj/:id/:order?', require('./routes/hupu/bbs'));
router.get('/rss/hupu/bbs/:id/:order?', require('./routes/hupu/bbs'));

// 牛客网
router.get('/rss/nowcoder/discuss/:type/:order', require('./routes/nowcoder/discuss'));

// Xiaomi.eu
router.get('/rss/xiaomieu/releases', require('./routes/xiaomieu/releases'));

// sketch.com
router.get('/rss/sketch/beta', require('./routes/sketch/beta'));
router.get('/rss/sketch/updates', require('./routes/sketch/updates'));

// 每日安全
router.get('/rss/security/pulses', require('./routes/security/pulses'));

// DoNews
router.get('/rss/donews/:column?', require('./routes/donews/index'));

// WeGene
router.get('/rss/wegene/column/:type/:category', require('./routes/wegene/column'));
router.get('/rss/wegene/newest', require('./routes/wegene/newest'));

// instapaper
router.get('/rss/instapaper/person/:name', require('./routes/instapaper/person'));

// UI 中国
router.get('/rss/ui-cn/article', require('./routes/ui-cn/article'));
router.get('/rss/ui-cn/user/:id', require('./routes/ui-cn/user'));

// Dcard
router.get('/rss/dcard/:section/:type?', require('./routes/dcard/section'));

// 12306
router.get('/rss/12306/zxdt/:id?', require('./routes/12306/zxdt'));

// 北京天文馆每日一图
router.get('/rss/bjp/apod', require('./routes/bjp/apod'));

// 洛谷日报
router.get('/rss/luogu/daily/:id?', require('./routes/luogu/daily'));

// 决胜网
router.get('/rss/juesheng', require('./routes/juesheng'));

// 播客IBCラジオ イヤーマイッタマイッタ
router.get('/rss/maitta', require('./routes/maitta'));

// 一些博客
// 敬维-以认真的态度做完美的事情: https://jingwei.link/
router.get('/rss/blogs/jingwei.link', require('./routes/blogs/jingwei_link'));

// 王垠的博客-当然我在扯淡
router.get('/rss/blogs/wangyin', require('./routes/blogs/wangyin'));

// 裏垢女子まとめ
router.get('/rss/uraaka-joshi', require('./routes/uraaka-joshi/uraaka-joshi'));
router.get('/rss/uraaka-joshi/:id', require('./routes/uraaka-joshi/uraaka-joshi-user'));

// 西祠胡同
router.get('/rss/xici/:id?', require('./routes/xici'));

// 淘股吧论坛
router.get('/rss/taoguba/index', require('./routes/taoguba/index'));
router.get('/rss/taoguba/user/:uid', require('./routes/taoguba/user'));

// 今日热榜
router.get('/rss/tophub/:id', require('./routes/tophub'));

// 游戏时光
router.get('/rss/vgtime/news', require('./routes/vgtime/news.js'));
router.get('/rss/vgtime/release', require('./routes/vgtime/release'));
router.get('/rss/vgtime/keyword/:keyword', require('./routes/vgtime/keyword'));

// MP4吧
router.get('/rss/mp4ba/:param', require('./routes/mp4ba'));

// anitama
router.get('/rss/anitama/:channel?', require('./routes/anitama/channel'));

// 親子王國
router.get('/rss/babykingdom/:id/:order?', require('./routes/babykingdom'));

// 四川大学
router.get('/rss/scu/jwc/notice', require('./routes/universities/scu/jwc'));
router.get('/rss/scu/xg/notice', require('./routes/universities/scu/xg'));

// 浙江工商大学
router.get('/rss/zjgsu/tzgg', require('./routes/universities/zjgsu/tzgg/scripts'));
router.get('/rss/zjgsu/gsgg', require('./routes/universities/zjgsu/gsgg/scripts'));
router.get('/rss/zjgsu/xszq', require('./routes/universities/zjgsu/xszq/scripts'));

// 大众点评
router.get('/rss/dianping/user/:id?', require('./routes/dianping/user'));

// 半月谈
router.get('/rss/banyuetan/:name', require('./routes/banyuetan'));

// 人民日报
router.get('/rss/people/opinion/:id', require('./routes/people/opinion'));
router.get('/rss/people/env/:id', require('./routes/people/env'));
router.get('/rss/people/xjpjh/:keyword?/:year?', require('./routes/people/xjpjh'));

// 北极星电力网
router.get('/rss/bjx/huanbao', require('./routes/bjx/huanbao'));

// gamersky
router.get('/rss/gamersky/news', require('./routes/gamersky/news'));
router.get('/rss/gamersky/ent/:category', require('./routes/gamersky/ent'));

// 游研社
router.get('/rss/yystv/category/:category', require('./routes/yystv/category'));

// psnine
router.get('/rss/psnine/index', require('./routes/psnine/index'));
router.get('/rss/psnine/shuzhe', require('./routes/psnine/shuzhe'));
router.get('/rss/psnine/trade', require('./routes/psnine/trade'));
router.get('/rss/psnine/game', require('./routes/psnine/game'));
router.get('/rss/psnine/news', require('./routes/psnine/news'));

// 浙江大学
router.get('/rss/zju/list/:type', require('./routes/universities/zju/list'));
router.get('/rss/zju/physics/:type', require('./routes/universities/zju/physics'));
router.get('/rss/zju/grs/:type', require('./routes/universities/zju/grs'));
router.get('/rss/zju/career/:type', require('./routes/universities/zju/career'));
router.get('/rss/zju/cst/:type', require('./routes/universities/zju/cst'));

// 浙江大学城市学院
router.get('/rss/zucc/news/latest', require('./routes/universities/zucc/news'));
router.get('/rss/zucc/cssearch/latest/:webVpn/:key/', require('./routes/universities/zucc/cssearch'));

// 华中师范大学
router.get('/rss/ccnu/career', require('./routes/universities/ccnu/career'));

// Infoq
router.get('/rss/infoq/recommend', require('./routes/infoq/recommend'));
router.get('/rss/infoq/topic/:id', require('./routes/infoq/topic'));

// checkee
router.get('/rss/checkee/:dispdate', require('./routes/checkee/index'));

// 艾瑞
router.get('/rss/iresearch/report', require('./routes/iresearch/report'));

// ZAKER
router.get('/rss/zaker/:type/:id', require('./routes/zaker/source'));

// Matters
router.get('/rss/matters/topics', require('./routes/matters/topics'));
router.get('/rss/matters/latest', require('./routes/matters/latest'));
router.get('/rss/matters/hot', require('./routes/matters/hot'));
router.get('/rss/matters/tags/:tid', require('./routes/matters/tags'));
router.get('/rss/matters/author/:uid', require('./routes/matters/author'));

// MobData
router.get('/rss/mobdata/report', require('./routes/mobdata/report'));

// 谷雨
router.get('/rss/tencent/guyu/channel/:name', require('./routes/tencent/guyu/channel'));

// 古诗文网
router.get('/rss/gushiwen/recommend', require('./routes/gushiwen/recommend'));

// 电商在线
router.get('/rss/imaijia/category/:category', require('./routes/imaijia/category'));

// 21财经
router.get('/rss/21caijing/channel/:name', require('./routes/21caijing/channel'));

// 北京邮电大学
router.get('/rss/bupt/yz/:type', require('./routes/universities/bupt/yz'));
router.get('/rss/bupt/grs', require('./routes/universities/bupt/grs'));
router.get('/rss/bupt/portal', require('./routes/universities/bupt/portal'));
router.get('/rss/bupt/news', require('./routes/universities/bupt/news'));

// VOCUS 方格子
router.get('/rss/vocus/publication/:id', require('./routes/vocus/publication'));
router.get('/rss/vocus/user/:id', require('./routes/vocus/user'));

// 一亩三分地 1point3acres
router.get('/rss/1point3acres/user/:id/threads', require('./routes/1point3acres/threads'));
router.get('/rss/1point3acres/user/:id/posts', require('./routes/1point3acres/posts'));
router.get('/rss/1point3acres/offer/:year?/:major?/:school?', require('./routes/1point3acres/offer'));

// 广东海洋大学
router.get('/rss/gdoujwc', require('./routes/universities/gdou/jwc/jwtz'));

// 中国高清网
router.get('/rss/gaoqingla/:tag?', require('./routes/gaoqingla/latest'));

// 马良行
router.get('/rss/mlhang', require('./routes/mlhang/latest'));

// PlayStation Store
router.get('/rss/ps/list/:gridName', require('./routes/ps/list'));
router.get('/rss/ps/trophy/:id', require('./routes/ps/trophy'));
router.get('/rss/ps/ps4updates', require('./routes/ps/ps4updates'));

// Quanta Magazine
router.get('/rss/quantamagazine/archive', require('./routes/quantamagazine/archive'));

// Nintendo
router.get('/rss/nintendo/eshop/jp', require('./routes/nintendo/eshop_jp'));
router.get('/rss/nintendo/eshop/hk', require('./routes/nintendo/eshop_hk'));
router.get('/rss/nintendo/eshop/us', require('./routes/nintendo/eshop_us'));
router.get('/rss/nintendo/news', require('./routes/nintendo/news'));
router.get('/rss/nintendo/direct', require('./routes/nintendo/direct'));
router.get('/rss/nintendo/system-update', require('./routes/nintendo/system-update'));

// 世界卫生组织
router.get('/rss/who/news-room/:type', require('./routes/who/news-room'));

// 福利资源-met.red
router.get('/rss/metred/fuli', require('./routes/metred/fuli'));

// MIT
router.get('/rss/mit/graduateadmissions/:type/:name', require('./routes/universities/mit/graduateadmissions'));

// 毕马威
router.get('/rss/kpmg/insights', require('./routes/kpmg/insights'));

// Saraba1st
router.get('/rss/saraba1st/thread/:tid', require('./routes/saraba1st/thread'));

// gradcafe
router.get('/rss/gradcafe/result/:type', require('./routes/gradcafe/result'));
router.get('/rss/gradcafe/result', require('./routes/gradcafe/result'));

// The Economist
router.get('/rss/the-economist/gre-vocabulary', require('./routes/the-economist/gre-vocabulary'));
router.get('/rss/the-economist/:endpoint', require('./routes/the-economist/full'));

// 鼠绘漫画
router.get('/rss/shuhui/comics/:id', require('./routes/shuhui/comics'));

// 朝日新聞中文网（简体中文版）
router.get('/rss/asahichinese-j/:category/:subCate', require('./routes/asahichinese-j/index'));
router.get('/rss/asahichinese-j/:category', require('./routes/asahichinese-j/index'));

// 朝日新聞中文網（繁體中文版）
router.get('/rss/asahichinese-f/:category/:subCate', require('./routes/asahichinese-f/index'));
router.get('/rss/asahichinese-f/:category', require('./routes/asahichinese-f/index'));

// 7x24小时快讯
router.get('/rss/fx678/kx', require('./routes/fx678/kx'));

// SoundCloud
router.get('/rss/soundcloud/tracks/:user', require('./routes/soundcloud/tracks'));

// dilidili
router.get('/rss/dilidili/fanju/:id', require('./routes/dilidili/fanju'));

// 且听风吟福利
router.get('/rss/qtfyfl/:category', require('./routes/qtfyfl/category'));

// 派代
router.get('/rss/paidai', require('./routes/paidai/index'));
router.get('/rss/paidai/bbs', require('./routes/paidai/bbs'));
router.get('/rss/paidai/news', require('./routes/paidai/news'));

// 中国银行
router.get('/rss/boc/whpj/:format?', require('./routes/boc/whpj'));

// 漫画db
router.get('/rss/manhuadb/comics/:id', require('./routes/manhuadb/comics'));

// 装备前线
router.get('/rss/zfrontier/postlist/:type', require('./routes/zfrontier/postlist'));

// 观察者风闻话题
router.get('/rss/guanchazhe/topic/:id', require('./routes/guanchazhe/topic'));
router.get('/rss/guanchazhe/personalpage/:uid', require('./routes/guanchazhe/personalpage'));
router.get('/rss/guanchazhe/index/:type', require('./routes/guanchazhe/index'));

// Hpoi 手办维基
router.get('/rss/hpoi/info/:type?', require('./routes/hpoi/info'));
router.get('/rss/hpoi/:category/:words', require('./routes/hpoi'));

// 通用CurseForge
router.get('/rss/curseforge/:gameid/:catagoryid/:projectid/files', require('./routes/curseforge/generalfiles'));

// 西南财经大学
router.get('/rss/swufe/seie/:type?', require('./routes/universities/swufe/seie'));

// Wired
router.get('/rss/wired/tag/:tag', require('./routes/wired/tag'));

// 语雀文档
router.get('/rss/yuque/doc/:repo_id', require('./routes/yuque/doc'));

// 飞地
router.get('/rss/enclavebooks/category/:id?', require('./routes/enclavebooks/category'));
router.get('/rss/enclavebooks/user/:uid', require('./routes/enclavebooks/user.js'));
router.get('/rss/enclavebooks/collection/:uid', require('./routes/enclavebooks/collection.js'));

// 色花堂 - 色花图片版块
router.get('/rss/dsndsht23/picture/:subforumid', require('./routes/dsndsht23/pictures'));

// 色花堂 - 原创bt电影
router.get('/rss/dsndsht23/bt/:subforumid?', require('./routes/dsndsht23/index'));
router.get('/rss/dsndsht23/:subforumid?/:type?', require('./routes/dsndsht23/index'));
router.get('/rss/dsndsht23/:subforumid?', require('./routes/dsndsht23/index'));
router.get('/rss/dsndsht23', require('./routes/dsndsht23/index'));

// 数英网最新文章
router.get('/rss/digitaling/index', require('./routes/digitaling/index'));

// 数英网文章专题
router.get('/rss/digitaling/articles/:category/:subcate', require('./routes/digitaling/article'));

// 数英网项目专题
router.get('/rss/digitaling/projects/:category', require('./routes/digitaling/project'));

// Bing壁纸
router.get('/rss/bing', require('./routes/bing/index'));

// Maxjia News - DotA 2
router.get('/rss/maxnews/dota2', require('./routes/maxnews/dota2'));

// 柠檬 - 私房歌
router.get('/rss/ningmeng/song', require('./routes/ningmeng/song'));

// 紫竹张
router.get('/rss/zzz', require('./routes/zzz/index'));

// AEON
router.get('/rss/aeon/:cid', require('./routes/aeon/category'));

// AlgoCasts
router.get('/rss/algocasts', require('./routes/algocasts/all'));

// aqicn
router.get('/rss/aqicn/:city', require('./routes/aqicn/index'));

// 猫眼电影
router.get('/rss/maoyan/hot', require('./routes/maoyan/hot'));
router.get('/rss/maoyan/upcoming', require('./routes/maoyan/upcoming'));

// cnBeta
router.get('/rss/cnbeta', require('./routes/cnbeta/home'));

// 国家退伍士兵信息
router.get('/rss/gov/veterans/:type', require('./routes/gov/veterans/china'));

// 河北省退伍士兵信息
router.get('/rss/gov/veterans/hebei/:type', require('./routes/gov/veterans/hebei'));

// Dilbert Comic Strip
router.get('/rss/dilbert/strip', require('./routes/dilbert/strip'));

// 游戏打折情报
router.get('/rss/yxdzqb/:type', require('./routes/yxdzqb'));

// 怪物猎人
router.get('/rss/monsterhunter/update', require('./routes/mhw/update'));
router.get('/rss/mhw/update', require('./routes/mhw/update'));
router.get('/rss/mhw/news', require('./routes/mhw/news'));

// 005.tv
router.get('/rss/005tv/zx/latest', require('./routes/005tv/zx'));

// Polimi News
router.get('/rss/polimi/news/:language?', require('./routes/polimi/news'));

// dekudeals
router.get('/rss/dekudeals/:type', require('./routes/dekudeals'));

// 直播吧
router.get('/rss/zhibo8/forum/:id', require('./routes/zhibo8/forum'));
router.get('/rss/zhibo8/post/:id', require('./routes/zhibo8/post'));

// 东方网-上海
router.get('/rss/eastday/sh', require('./routes/eastday/sh'));

// Metacritic
router.get('/rss/metacritic/release/:platform/:type/:sort?', require('./routes/metacritic/release'));

// 快科技（原驱动之家）
router.get('/rss/kkj/news', require('./routes/kkj/news'));

// Outage.Report
router.get('/rss/outagereport/:name/:count?', require('./routes/outagereport/service'));

// sixthtone
router.get('/rss/sixthtone/news', require('./routes/sixthtone/news'));

// AI研习社
router.get('/rss/aiyanxishe/:id/:sort?', require('./routes/aiyanxishe/home'));

// 活动行
router.get('/rss/huodongxing/explore', require('./routes/hdx/explore'));

// 飞客茶馆优惠信息
router.get('/rss/flyertea/preferential', require('./routes/flyertea/preferential'));
router.get('/rss/flyertea/creditcard/:bank', require('./routes/flyertea/creditcard'));

// 中国广播
router.get('/rss/radio/:channelname/:name', require('./routes/radio/radio'));

// TOPYS
router.get('/rss/topys/:category', require('./routes/topys/article'));

// 巴比特作者专栏
router.get('/rss/8btc/:authorid', require('./routes/8btc/author'));
router.get('/rss/8btc/news/flash', require('./routes/8btc/news/flash'));

// VueVlog
router.get('/rss/vuevideo/:userid', require('./routes/vuevideo/user'));

// 证监会
router.get('/rss/csrc/news/:suffix?', require('./routes/csrc/news'));
router.get('/rss/csrc/fashenwei', require('./routes/csrc/fashenwei'));
router.get('/rss/csrc/auditstatus/:apply_id', require('./routes/csrc/auditstatus'));

// LWN.net Alerts
router.get('/rss/lwn/alerts/:distributor', require('./routes/lwn/alerts'));

// 唱吧
router.get('/rss/changba/:userid', require('./routes/changba/user'));

// 英雄联盟
router.get('/rss/lol/newsindex/:type', require('./routes/lol/newsindex'));

// 掌上英雄联盟
router.get('/rss/lolapp/recommend', require('./routes/lolapp/recommend'));

// 左岸读书
router.get('/rss/zreading', require('./routes/zreading/home'));

// NBA
router.get('/rss/nba/app_news', require('./routes/nba/app_news'));

// 天津产权交易中心
router.get('/rss/tprtc/cqzr', require('./routes/tprtc/cqzr'));
router.get('/rss/tprtc/qyzc', require('./routes/tprtc/qyzc'));
router.get('/rss/tprtc/news', require('./routes/tprtc/news'));

// ArchDaily
router.get('/rss/archdaily', require('./routes/archdaily/home'));

// aptonic Dropzone actions
router.get('/rss/aptonic/action', require('./routes/aptonic/action'));

// 印记中文周刊
router.get('/rss/docschina/jsweekly', require('./routes/docschina/jsweekly'));

// im2maker
router.get('/rss/im2maker/:channel?', require('./routes/im2maker/index'));

// 巨潮资讯
router.get('/rss/cninfo/announcement/:code?/:category?', require('./routes/cninfo/announcement'));
router.get('/rss/cninfo/stock_announcement/:code', require('./routes/cninfo/stock_announcement'));
router.get('/rss/cninfo/fund_announcement/:code?/:searchkey?', require('./routes/cninfo/fund_announcement'));

// 中央纪委国家监委网站
router.get('/rss/ccdi/scdc', require('./routes/ccdi/scdc'));

// 香水时代
router.get('/rss/nosetime/:id/:type/:sort?', require('./routes/nosetime/comment'));
router.get('/rss/nosetime/home', require('./routes/nosetime/home'));

// 涂鸦王国
router.get('/rss/gracg/:user/:love?', require('./routes/gracg/user'));

// 大侠阿木
router.get('/rss/daxiaamu/home', require('./routes/daxiaamu/home'));

// 美团技术团队
router.get('/rss/meituan/tech/home', require('./routes//meituan/tech/home'));

// 码农网
router.get('/rss/codeceo/home', require('./routes/codeceo/home'));
router.get('/rss/codeceo/:type/:category?', require('./routes/codeceo/category'));

// BOF
router.get('/rss/bof/home', require('./routes/bof/home'));

// 爱发电
router.get('/rss/afdian/explore/:type?/:category?', require('./routes/afdian/explore'));
router.get('/rss/afdian/dynamic/:uid', require('./routes/afdian/dynamic'));

// Simons Foundation
router.get('/rss/simonsfoundation/articles', require('./routes/simonsfoundation/articles'));
router.get('/rss/simonsfoundation/recommend', require('./routes/simonsfoundation/recommend'));

// 王者荣耀
router.get('/rss/pvp/newsindex/:type', require('./routes/pvp/newsindex'));

// 《明日方舟》游戏
router.get('/rss/arknights/news', require('./routes/arknights/news'));

// ff14
router.get('/rss/ff14/ff14_zh/:type', require('./routes/ff14/ff14_zh'));

// 学堂在线
router.get('/rss/xuetangx/course/:cid/:type', require('./routes/xuetangx/course_info'));
router.get('/rss/xuetangx/course/list/:mode/:credential/:status/:type?', require('./routes/xuetangx/course_list'));

// wikihow
router.get('/rss/wikihow/index', require('./routes/wikihow/index.js'));
router.get('/rss/wikihow/category/:category/:type', require('./routes/wikihow/category.js'));

// 正版中国
router.get('/rss/getitfree/category/:category?', require('./routes/getitfree/category.js'));
router.get('/rss/getitfree/search/:keyword?', require('./routes/getitfree/search.js'));

// 万联网
router.get('/rss/10000link/news/:category?', require('./routes/10000link/news'));

// 站酷
router.get('/rss/zcool/recommend/:type', require('./routes/zcool/recommend'));
router.get('/rss/zcool/top', require('./routes/zcool/top'));
router.get('/rss/zcool/user/:uid', require('./routes/zcool/user'));

// 第一财经
router.get('/rss/yicai/brief', require('./routes/yicai/brief.js'));

// 一兜糖
router.get('/rss/yidoutang/index', require('./routes/yidoutang/index.js'));
router.get('/rss/yidoutang/guide', require('./routes/yidoutang/guide.js'));
router.get('/rss/yidoutang/mtest', require('./routes/yidoutang/mtest.js'));
router.get('/rss/yidoutang/case/:type', require('./routes/yidoutang/case.js'));

// 开眼
router.get('/rss/kaiyan/index', require('./routes/kaiyan/index'));

// 龙空
router.get('/rss/lkong/forum/:id/:digest?', require('./routes/lkong/forum'));
router.get('/rss/lkong/thread/:id', require('./routes/lkong/thread'));
// router.get('/rss/lkong/user/:id', require('./routes/lkong/user'));

// 坂道系列官网新闻
router.get('/rss/nogizaka46/news', require('./routes/nogizaka46/news'));
router.get('/rss/keyakizaka46/news', require('./routes/keyakizaka46/news'));
router.get('/rss/hinatazaka46/news', require('./routes/hinatazaka46/news'));

// 阿里云
router.get('/rss/aliyun/database_month', require('./routes/aliyun/database_month'));
router.get('/rss/aliyun/notice/:type?', require('./routes/aliyun/notice'));

// 礼物说
router.get('/rss/liwushuo/index', require('./routes/liwushuo/index.js'));

// 故事fm
router.get('/rss/storyfm/index', require('./routes/storyfm/index.js'));

// 中国日报
router.get('/rss/chinadaily/english/:category', require('./routes/chinadaily/english.js'));

// leboncoin
router.get('/rss/leboncoin/ad/:query', require('./routes/leboncoin/ad.js'));

// DHL
router.get('/rss/dhl/:id', require('./routes/dhl/shipment-tracking'));

// Japanpost
router.get('/rss/japanpost/:reqCode', require('./routes/japanpost/index'));

// 中华人民共和国商务部
router.get('/rss/mofcom/article/:suffix', require('./routes/mofcom/article'));

// 字幕库
router.get('/rss/zimuku/:type?', require('./routes/zimuku/index'));

// 品玩
router.get('/rss/pingwest/status', require('./routes/pingwest/status'));
router.get('/rss/pingwest/tag/:tag/:type', require('./routes/pingwest/tag'));
router.get('/rss/pingwest/user/:uid/:type?', require('./routes/pingwest/user'));

// Hanime
router.get('/rss/hanime/video', require('./routes/hanime/video'));

// 篝火营地
router.get('/rss/gouhuo/news/:category', require('./routes/gouhuo'));
router.get('/rss/gouhuo/strategy', require('./routes/gouhuo/strategy'));

// Soul
router.get('/rss/soul/:id', require('./routes/soul'));

// 单向空间
router.get('/rss/owspace/read/:type?', require('./routes/owspace/read'));

// 天涯论坛
router.get('/rss/tianya/index/:type', require('./routes/tianya/index'));
router.get('/rss/tianya/user/:userid', require('./routes/tianya/user'));
router.get('/rss/tianya/comments/:userid', require('./routes/tianya/comments'));

// eleme
router.get('/rss/eleme/open/announce', require('./routes/eleme/open/announce'));
router.get('/rss/eleme/open-be/announce', require('./routes/eleme/open-be/announce'));

// 微信开放社区
router.get('/rss/wechat-open/community/:type', require('./routes/tencent/wechat/wechat-open/community/announce'));
// 微信支付 - 商户平台公告
router.get('/rss/wechat-open/pay/announce', require('./routes/tencent/wechat/wechat-open/pay/announce'));
router.get('/rss/wechat-open/community/:type/:category', require('./routes/tencent/wechat/wechat-open/community/question'));

// 微店
router.get('/rss/weidian/goods/:id', require('./routes/weidian/goods'));

// 有赞
router.get('/rss/youzan/goods/:id', require('./routes/youzan/goods'));
// 币世界快讯
router.get('/rss/bishijie/kuaixun', require('./routes/bishijie/kuaixun'));

// 顺丰丰桥
router.get('/rss/sf/sffq-announce', require('./routes/sf/sffq-announce'));

// 缺书网
router.get('/rss/queshu/sale', require('./routes/queshu/sale'));
router.get('/rss/queshu/book/:bookid', require('./routes/queshu/book'));

// SANS
router.get('/rss/sans/summit_archive', require('./routes/sans/summit_archive'));

// LaTeX 开源小屋
router.get('/rss/latexstudio/home', require('./routes/latexstudio/home'));

// 上证债券信息网 - 可转换公司债券公告
router.get('/rss/sse/convert/:query?', require('./routes/sse/convert'));
router.get('/rss/sse/renewal/', require('./routes/sse/renewal'));
router.get('/rss/sse/inquire/', require('./routes/sse/inquire'));

// 深圳证券交易所——上市公告
router.get('/rss/szse/notice/', require('./routes/szse/notice'));
router.get('/rss/szse/inquire/:type', require('./routes/szse/inquire'));

// 前端艺术家每日整理&&飞冰早报
router.get('/rss/jskou/:type?', require('./routes/jskou/index'));

// 国家应急广播
router.get('/rss/cneb/yjxx', require('./routes/cneb/yjxx'));
router.get('/rss/cneb/guoneinews', require('./routes/cneb/guoneinews'));

// 邮箱
router.get('/rss/mail/imap/:email', require('./routes/mail/imap'));

// 好队友
router.get('/rss/network360/jobs', require('./routes/network360/jobs'));

// 智联招聘
router.get('/rss/zhilian/:city/:keyword', require('./routes/zhilian/index'));

// 电鸭社区
router.get('/rss/eleduck/jobs', require('./routes/eleduck/jobs'));

// 北华航天工业学院 - 新闻
router.get('/rss/nciae/news', require('./routes/universities/nciae/news'));

// 北华航天工业学院 - 通知公告
router.get('/rss/nciae/tzgg', require('./routes/universities/nciae/tzgg'));

// 北华航天工业学院 - 学术信息
router.get('/rss/nciae/xsxx', require('./routes/universities/nciae/xsxx'));

// cfan
router.get('/rss/cfan/news', require('./routes/cfan/news'));

// 搜狐 - 搜狐号
router.get('/rss/sohu/mp/:id', require('./routes/sohu/mp'));

// 厚墨书源索引
router.get('/rss/houmo/:code?', require('./routes/houmo/booksource'));

// 腾讯企鹅号
router.get('/rss/tencent/news/author/:mid', require('./routes/tencent/news/author'));

// 奈菲影视
router.get('/rss/nfmovies/:id?', require('./routes/nfmovies/index'));

// 书友社区
router.get('/rss/andyt/:view?', require('./routes/andyt/index'));

// 品途商业评论
router.get('/rss/pintu360/:type?', require('./routes/pintu360/index'));

// engadget中国版
router.get('/rss/engadget-cn', require('./routes/engadget/home'));

// engadget
router.get('/rss/engadget/:lang', require('./routes/engadget/home'));

// 吹牛部落
router.get('/rss/chuiniu/column/:id', require('./routes/chuiniu/column'));

// leemeng
router.get('/rss/leemeng', require('./routes/blogs/leemeng'));

// 中国地质大学
router.get('/rss/cug/graduate', require('./routes/cug/graduate'));

// 网易 - 网易号
router.get('/rss/netease/dy/:id', require('./routes/netease/dy'));

// 海猫吧
router.get('/rss/haimaoba/:id?', require('./routes/haimaoba/comics'));

// 蒲公英
router.get('/rss/pgyer/:app?', require('./routes/pgyer/app'));

// 微博个人时间线
router.get('/rss/weibo/timeline/:uid/:feature?', require('./routes/weibo/timeline'));

// TAPTAP
router.get('/rss/taptap/topic/:id/:label?', require('./routes/taptap/topic'));
router.get('/rss/taptap/changelog/:id', require('./routes/taptap/changelog'));
router.get('/rss/taptap/review/:id/:order?', require('./routes/taptap/review'));

// lofter
router.get('/rss/lofter/tag/:name/:type?', require('./routes/lofter/tag'));

// 米坛社区表盘
router.get('/rss/watchface/:watch_type?/:list_type?', require('./routes/watchface/update'));

// CNU视觉联盟
router.get('/rss/cnu/selected', require('./routes/cnu/selected'));
router.get('/rss/cnu/discovery/:type?/:category?', require('./routes/cnu/discovery'));

// 战旗直播
router.get('/rss/zhanqi/room/:id', require('./routes/zhanqi/room'));

// 酒云网
router.get('/rss/wineyun/:category', require('./routes/wineyun'));

// 重磅原创-每经网
router.get('/rss/nbd/daily', require('./routes/nbd/article'));

// 快知
router.get('/rss/kzfeed/topic/:id', require('./routes/kzfeed/topic'));

// 腾讯新闻较真查证平台
router.get('/rss/factcheck', require('./routes/tencent/factcheck'));

// X-MOL化学资讯平台
router.get('/rss/x-mol/news/:tag?', require('./routes/x-mol/news.js'));
router.get('/rss/x-mol/paper/:type/:magazine', require('./routes/x-mol/paper'));

// 電撃Online
router.get('/rss/dengekionline/:type?', require('./routes/dengekionline/new'));

// 4Gamers
router.get('/rss/4gamers/category/:category', require('./routes/4gamers/category'));
router.get('/rss/4gamers/tag/:tag', require('./routes/4gamers/tag'));

// 大麦网
router.get('/rss/damai/activity/:city/:category/:subcategory/:keyword?', require('./routes/damai/activity'));

// 桂林电子科技大学新闻资讯
router.get('/rss/guet/xwzx/:type?', require('./routes/guet/news'));

// はてな匿名ダイアリー
router.get('/rss/hatena/anonymous_diary/archive', require('./routes/hatena/anonymous_diary/archive'));

// kaggle
router.get('/rss/kaggle/discussion/:forumId/:sort?', require('./routes/kaggle/discussion'));
router.get('/rss/kaggle/competitions/:category?', require('./routes/kaggle/competitions'));

// eLife
router.get('/rss/elife/latest', require('./routes/elife/latest'));
router.get('/rss/elife/:tid', require('./routes/elife/subject'));

// PNAS
router.get('/rss/pnas/latest', require('./routes/pnas/latest'));
router.get('/rss/pnas/:tid', require('./routes/pnas/topic'));

// nature
router.get('/rss/nature/natmachintell/research', require('./routes/nature/natmachintell/research'));
router.get('/rss/nature/neuroscience/research', require('./routes/nature/neuroscience/research'));
router.get('/rss/nature/research', require('./routes/nature/research'));

// dlsite
router.get('/rss/dlsite/new/:type', require('./routes/dlsite/new'));
router.get('/rss/dlsite/campaign/:type/:free?', require('./routes/dlsite/campaign'));

// mcbbs
router.get('/rss/mcbbs/forum/:type', require('./routes/mcbbs/forum'));
router.get('/rss/mcbbs/post/:tid/:authorid?', require('./routes/mcbbs/post'));

// Pocket
router.get('/rss/pocket/trending', require('./routes/pocket/trending'));

// HK01
router.get('/rss/hk01/zone/:id', require('./routes/hk01/zone'));
router.get('/rss/hk01/channel/:id', require('./routes/hk01/channel'));
router.get('/rss/hk01/issue/:id', require('./routes/hk01/issue'));
router.get('/rss/hk01/tag/:id', require('./routes/hk01/tag'));
router.get('/rss/hk01/hot', require('./routes/hk01/hot'));

// 码农周刊
router.get('/rss/manong-weekly', require('./routes/manong-weekly/issues'));

// 每日猪价
router.get('/rss/pork-price', require('./routes/pork-price'));

// NOI 全国青少年信息学奥林匹克竞赛
router.get('/rss/noi', require('./routes/noi'));
router.get('/rss/noi/winners-list', require('./routes/noi/winners-list'));
router.get('/rss/noi/province-news', require('./routes/noi/province-news'));
router.get('/rss/noi/rg-news', require('./routes/noi/rg-news'));

// 中国工业化和信息部
router.get('/rss/gov/miit/zcwj', require('./routes/gov/miit/zcwj'));
router.get('/rss/gov/miit/wjgs', require('./routes/gov/miit/wjgs'));
router.get('/rss/gov/miit/zcjd', require('./routes/gov/miit/zcjd'));

// 中国国家认证认可监管管理员会
router.get('/rss/gov/cnca/jgdt', require('./routes/gov/cnca/jgdt'));
router.get('/rss/gov/cnca/hydt', require('./routes/gov/cnca/hydt'));

router.get('/rss/gov/cnca/zxtz', require('./routes/gov/cnca/zxtz'));

// clickme
router.get('/rss/clickme/:site/:grouping/:name', require('./routes/clickme'));

// 文汇报
router.get('/rss/whb/:category', require('./routes/whb/zhuzhan'));

// 三界异次元
router.get('/rss/3ycy/home', require('./routes/3ycy/home.js'));

// Emi Nitta official website
router.get('/rss/emi-nitta/:type', require('./routes/emi-nitta/home'));

// Alter China
router.get('/rss/alter-cn/news', require('./routes/alter-cn/news'));

// Visual Studio Code Marketplace
router.get('/rss/vscode/marketplace/:type?', require('./routes/vscode/marketplace'));

// 饭否
router.get('/rss/fanfou/user_timeline/:uid', require('./routes/fanfou/user_timeline'));
router.get('/rss/fanfou/home_timeline', require('./routes/fanfou/home_timeline'));
router.get('/rss/fanfou/favorites/:uid', require('./routes/fanfou/favorites'));
router.get('/rss/fanfou/trends', require('./routes/fanfou/trends'));
router.get('/rss/fanfou/public_timeline/:keyword', require('./routes/fanfou/public_timeline'));

// ITSlide
router.get('/rss/itslide/new', require('./routes/itslide/new'));

// Remote Work
router.get('/rss/remote-work/:caty?', require('./routes/remote-work/index'));

// China Times
router.get('/rss/chinatimes/:caty', require('./routes/chinatimes/index'));

// TransferWise
router.get('/rss/transferwise/pair/:source/:target', require('./routes/transferwise/pair'));

// chocolatey
router.get('/rss/chocolatey/software/:name?', require('./routes/chocolatey/software'));

// Nyaa
router.get('/rss/nyaa/search/:query?', require('./routes/nyaa/search'));

// 片源网
router.get('/rss/pianyuan/:media?', require('./routes/pianyuan/app'));

// IT home
router.get('/rss/ithome/:caty', require('./routes/ithome/index'));

// 巴哈姆特
router.get('/rss/bahamut/creation/:author/:category?', require('./routes/bahamut/creation'));
router.get('/rss/bahamut/creation_index/:category?/:subcategory?/:type?', require('./routes/bahamut/creation_index'));

// CentBrowser
router.get('/rss/centbrowser/history', require('./routes/centbrowser/history'));

// 755
router.get('/rss/755/user/:username', require('./routes/755/user'));

// IKEA
router.get('/rss/ikea/uk/new', require('./routes/ikea/uk/new'));
router.get('/rss/ikea/uk/offer', require('./routes/ikea/uk/offer'));

// Mastodon
router.get('/rss/mastodon/timeline/:site/:only_media?', require('./routes/mastodon/timeline'));

// Kernel Aliyun
router.get('/rss/aliyun-kernel/index', require('./routes/aliyun-kernel/index'));

// Vulture
router.get('/rss/vulture/:type', require('./routes/vulture/index'));

// xinwenlianbo
router.get('/rss/xinwenlianbo/index', require('./routes/xinwenlianbo/index'));

// Paul Graham - Essays
router.get('/rss/blogs/paulgraham', require('./routes/blogs/paulgraham'));

// invisionapp
router.get('/rss/invisionapp/inside-design', require('./routes/invisionapp/inside-design'));

// producthunt
router.get('/rss/producthunt/today', require('./routes/producthunt/today'));

// mlog.club
router.get('/rss/mlog-club/topics/:node', require('./routes/mlog-club/topics'));
router.get('/rss/mlog-club/projects', require('./routes/mlog-club/projects'));

// Chrome 网上应用店
router.get('/rss/chrome/webstore/extensions/:id', require('./routes/chrome/extensions'));

// RTHK
router.get('/rss/rthk-news/:lang/:category', require('./routes/rthk-news/index'));

// yahoo
router.get('/rss/yahoo-news/:region/:category?', require('./routes/yahoo-news/index'));

// Yahoo!テレビ
router.get('/rss/yahoo-jp-tv/:query', require('./routes/yahoo-jp-tv/index'));

// 白鲸出海
router.get('/rss/baijing', require('./routes/baijing'));

// 低端影视
router.get('/rss/ddrk/update/:name/:season?', require('./routes/ddrk/index'));
router.get('/rss/ddrk/tag/:tag', require('./routes/ddrk/list'));
router.get('/rss/ddrk/category/:category', require('./routes/ddrk/list'));
router.get('/rss/ddrk/index', require('./routes/ddrk/list'));

// 公主链接公告
router.get('/rss/pcr/news', require('./routes/pcr/news'));
router.get('/rss/pcr/news-tw', require('./routes/pcr/news-tw'));

// project-zero issues
router.get('/rss/project-zero-issues', require('./routes/project-zero-issues/index'));

// 平安银河实验室
router.get('/rss/galaxylab', require('./routes/galaxylab/index'));

// NOSEC 安全讯息平台
router.get('/rss/nosec/:keykind?', require('./routes/nosec/index'));

// Hex-Rays News
router.get('/rss/hex-rays/news', require('./routes/hex-rays/index'));

// 新趣集
router.get('/rss/xinquji/today', require('./routes/xinquji/today'));
router.get('/rss/xinquji/today/internal', require('./routes/xinquji/internal'));

// 英中协会
router.get('/rss/gbcc/trust', require('./routes/gbcc/trust'));

// Associated Press
router.get('/rss/apnews/topics/:topic', require('./routes/apnews/topics'));

// discuz
router.get('/rss/discuz/:ver([7|x])/:cid([0-9]{2})/:link(.*)', require('./routes/discuz/discuz'));
router.get('/rss/discuz/:ver([7|x])/:link(.*)', require('./routes/discuz/discuz'));
router.get('/rss/discuz/:link(.*)', require('./routes/discuz/discuz'));

// China Dialogue 中外对话
router.get('/rss/chinadialogue/topics/:topic', require('./routes/chinadialogue/topics'));
router.get('/rss/chinadialogue/:column', require('./routes/chinadialogue/column'));

// Scala Blog
router.get('/rss/scala/blog/:part?', require('./routes/scala-blog/scala-blog'));

// Minecraft Java版游戏更新
router.get('/rss/minecraft/version', require('./routes/minecraft/version'));

// 微信更新日志
router.get('/rss/weixin/miniprogram/release', require('./routes/tencent/wechat/miniprogram/release')); // 基础库更新

// 武汉肺炎疫情动态
router.get('/rss/coronavirus/caixin', require('./routes/coronavirus/caixin'));
router.get('/rss/coronavirus/dxy/data/:province?/:city?', require('./routes/coronavirus/dxy-data'));
router.get('/rss/coronavirus/dxy', require('./routes/coronavirus/dxy'));
router.get('/rss/coronavirus/scmp', require('./routes/coronavirus/scmp'));
router.get('/rss/coronavirus/nhc', require('./routes/coronavirus/nhc'));
router.get('/rss/coronavirus/mogov-2019ncov/:lang', require('./routes/coronavirus/mogov-2019ncov'));
router.get('/rss/coronavirus/qq/fact', require('./routes/tencent/factcheck'));
router.get('/rss/coronavirus/sg-moh', require('./routes/coronavirus/sg-moh'));

// 南京林业大学教务处
router.get('/rss/njfu/jwc/:category?', require('./routes/universities/njfu/jwc'));

// 日本経済新聞
router.get('/rss/nikkei/index', require('./routes/nikkei/index'));

// MQube
router.get('/rss/mqube/user/:user', require('./routes/mqube/user'));
router.get('/rss/mqube/tag/:tag', require('./routes/mqube/tag'));
router.get('/rss/mqube/latest', require('./routes/mqube/latest'));
router.get('/rss/mqube/top', require('./routes/mqube/top'));

// Letterboxd
router.get('/rss/letterboxd/user/diary/:username', require('./routes/letterboxd/userdiary'));
router.get('/rss/letterboxd/user/followingdiary/:username', require('./routes/letterboxd/followingdiary'));

// 网易大神
router.get('/rss/netease/ds/:id', require('./routes/netease/ds'));

// javlibrary
router.get('/rss/javlibrary/users/:uid/:utype', require('./routes/javlibrary/users'));
router.get('/rss/javlibrary/videos/:vtype', require('./routes/javlibrary/videos'));
router.get('/rss/javlibrary/stars/:sid', require('./routes/javlibrary/stars'));
router.get('/rss/javlibrary/bestreviews', require('./routes/javlibrary/bestreviews'));

// Last.FM
router.get('/rss/lastfm/recent/:user', require('./routes/lastfm/recent'));
router.get('/rss/lastfm/loved/:user', require('./routes/lastfm/loved'));
router.get('/rss/lastfm/top/:country?', require('./routes/lastfm/top'));

// piapro
router.get('/rss/piapro/user/:pid', require('./routes/piapro/user'));
router.get('/rss/piapro/public/:type/:tag?/:category?', require('./routes/piapro/public'));

// 凤凰网
router.get('/rss/ifeng/feng/:id/:type', require('./routes/ifeng/feng'));

// 网易公开课
router.get('/rss/open163/vip', require('./routes/netease/open/vip'));
router.get('/rss/open163/latest', require('./routes/netease/open/latest'));

// 爱下电子书
router.get('/rss/axdzs/:id1/:id2', require('./routes/novel/axdzs'));

// HackerOne
router.get('/rss/hackerone/hacktivity', require('./routes/hackerone/hacktivity'));

// 奶牛关
router.get('/rss/cowlevel/element/:id', require('./routes/cowlevel/element'));

// 2048
router.get('/rss/2048/bbs/:fid', require('./routes/2048/bbs'));

// Google News
router.get('/rss/google/news/:category/:locale', require('./routes/google/news'));

// 虛詞
router.get('/rss/p-articles/section/:section', require('./routes/p-articles/section'));
router.get('/rss/p-articles/contributors/:author', require('./routes/p-articles/contributors'));

// 好好住
router.get('/rss/haohaozhu/whole-house/:keyword?', require('./routes/haohaozhu/whole-house'));
router.get('/rss/haohaozhu/discover/:keyword?', require('./routes/haohaozhu/discover'));

// 东北大学
router.get('/rss/neu/news/:type', require('./routes/universities/neu/news'));

// 快递100
router.get('/rss/kuaidi100/track/:number/:id/:phone?', require('./routes/kuaidi100/index'));
router.get('/rss/kuaidi100/company', require('./routes/kuaidi100/supported_company'));

// 稻草人书屋
router.get('/rss/dcrsw/:name/:count?', require('./routes/novel/dcrsw'));

// 魔法纪录
router.get('/rss/magireco/announcements', require('./routes/magireco/announcements'));
router.get('/rss/magireco/event_banner', require('./routes/magireco/event_banner'));

// wolley
router.get('/rss/wolley', require('./routes/wolley/index'));

module.exports = router;
