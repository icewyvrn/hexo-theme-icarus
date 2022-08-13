const moment = require("moment");
const { Component, Fragment } = require("inferno");
const Share = require("./share");
const Donates = require("./donates");
const Comment = require("./comment");
const ArticleLicensing = require("hexo-component-inferno/lib/view/misc/article_licensing");

/**
 * Get the word count of text.
 */
function getWordCount(content) {
  if (typeof content === "undefined") {
    return 0;
  }
  content = content.replace(/<\/?[a-z][^>]*>/gi, "");
  content = content.trim();
  return content
    ? (content.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length
    : 0;
}

module.exports = class extends Component {
  render() {
    const { config, helper, page, index } = this.props;
    const { article, plugins } = config;
    const { url_for, date, date_xml, __, _p } = helper;

    const indexLaunguage = config.language || "en";
    const language = page.lang || page.language || config.language || "en";
    const cover = page.cover ? url_for(page.cover) : null;
    const updateTime =
      article && article.update_time !== undefined ? article.update_time : true;
    const isUpdated =
      page.updated && !moment(page.date).isSame(moment(page.updated));
    const shouldShowUpdated =
      page.updated &&
      ((updateTime === "auto" && isUpdated) || updateTime === true);
    const isSticky = page.sticky || null;

    return (
      <Fragment>
        {/* Main content */}
        <div class="card-none" style="border-bottom: 1px dashed #d9d9d9;">
          <article
            class={`card-content article${
              "direction" in page ? " " + page.direction : ""
            }`}
            role="article"
            style={`${index ? "padding: 1rem 1rem;" : null}`}
          >
            {/* Post Cover Square */}
            {index && cover ? (
              <div
                class="post-cover-square"
                style="float: right;width: 100px;height: 96px;margin-left: 15px;margin-bottom: 10px;"
              >
                <a
                  href={url_for(page.link || page.path)}
                  title={page.title || cover}
                  style={`background-image:url(${cover});display: block;width: 100%;height: 100%;background-position: center;background-repeat: no-repeat;background-size: cover;background-color: #262a35;padding: 0;margin: 0;`}
                ></a>
              </div>
            ) : null}
            {/* Metadata */}
            {page.layout !== "page" ? (
              <div class="article-meta is-size-6 has-text-weight-semibold level is-mobile">
                <div class="level-left">
                  {/* Sticky*/}
                  {isSticky ? (
                    <span class="level-item">
                      <i
                        class="fas fa-arrow-alt-circle-up"
                        style="color:#3273dc"
                      ></i>
                      <span class="level-item" style="color:#3273dc">
                        &nbsp;Top
                      </span>
                    </span>
                  ) : null}
                  {/* Categories */}
                  {page.categories && page.categories.length ? (
                    <span class="level-item">
                      {(() => {
                        const categories = [];
                        page.categories.forEach((category, i) => {
                          categories.push(
                            <a class="link-muted" href={url_for(category.path)}>
                              {category.name}
                            </a>
                          );
                          if (i < page.categories.length - 1) {
                            categories.push(<span>&nbsp;/&nbsp;</span>);
                          }
                        });
                        return categories;
                      })()}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}
            {/* Title */}
            {page.title !== "" ? (
              <h1
                class={`title is-${index ? 4 : 3} is-size-${
                  index ? 2 : 4
                }-mobile`}
                style={`font-family: IBM Plex Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-weight: 600;margin-bottom: 0.6rem;line-height: 30px;`}
              >
                {index ? (
                  <a class="link-muted" href={url_for(page.link || page.path)}>
                    {page.title}
                  </a>
                ) : (
                  page.title
                )}
              </h1>
            ) : null}
            {/* Metadata */}
            {page.layout !== "page" ? (
              <div
                class="article-meta is-size-6 has-text-weight-semibold level is-mobile"
                style="margin-bottom: 1.1rem;"
              >
                <div class="level-left">
                  {/* Creation Date */}

                  {page.date && !shouldShowUpdated ? (
                    <span
                      class="level-item"
                      dangerouslySetInnerHTML={{
                        __html: _p(
                          // "article.created_at",
                          `<time dateTime="${date_xml(
                            page.date
                          )}" title="${new Date(
                            page.date
                          ).toLocaleString()}">${date(page.date)}</time>`
                        ),
                      }}
                    ></span>
                  ) : null}
                  {/* Last Update Date */}
                  {shouldShowUpdated && (
                    <span
                      class="level-item"
                      dangerouslySetInnerHTML={{
                        __html: _p(
                          // "article.updated_at",
                          `<time dateTime="${date_xml(
                            page.updated
                          )}" title="${new Date(
                            page.updated
                          ).toLocaleString()}">${date(page.updated)}</time>`
                        ),
                      }}
                    ></span>
                  )}
                  {/* author */}
                  {page.author ? (
                    <span class="level-item"> {page.author} </span>
                  ) : (
                    <span class="level-item"> {config.author} </span>
                  )}
                  {/* Read time */}
                  {article && article.readtime && article.readtime === true ? (
                    <span class="level-item">
                      {(() => {
                        const words = getWordCount(page._content);
                        const time = moment.duration(
                          (words / 150.0) * 60,
                          "seconds"
                        );
                        return `${_p(
                          "article.read_time",
                          time
                            .locale(index ? indexLaunguage : language)
                            .humanize()
                        )} (${_p("article.word_count", words)})`;
                      })()}
                    </span>
                  ) : null}
                  {/* Visitor counter */}
                  {!index && plugins && plugins.busuanzi === true ? (
                    <span
                      class="level-item"
                      id="busuanzi_container_page_pv"
                      dangerouslySetInnerHTML={{
                        __html: _p(
                          "plugin.visit_count",
                          '<span id="busuanzi_value_page_pv">0</span>'
                        ),
                      }}
                    ></span>
                  ) : null}
                </div>
              </div>
            ) : null}
            {/* Thumbnail */}
            {!index && cover ? (
              <div class="card-image" style="padding-bottom: 1.5rem;">
                {!index ? (
                  <span class="image">
                    <img
                      class="fill"
                      src={cover}
                      alt={page.title || cover}
                      style="max-height: 330px;"
                    />
                  </span>
                ) : null}
              </div>
            ) : null}
            {/* Adsense */}
            {!index ? (
              <div>
                <ins
                  class="adsbygoogle"
                  style="display:block; margin-bottom: 1rem;"
                  data-ad-client="ca-pub-9870073903926891"
                  data-ad-slot="7851984337"
                  data-ad-format="horizontal"
                  data-full-width-responsive="true"
                ></ins>
                <script
                  dangerouslySetInnerHTML={{
                    __html:
                      "(adsbygoogle = window.adsbygoogle || []).push({});",
                  }}
                ></script>
              </div>
            ) : null}
            {/* Content/Excerpt */}
            <div
              class="content"
              style={`${index ? "font-size: 1.1rem;" : null}`}
              dangerouslySetInnerHTML={{
                __html: index && page.excerpt ? page.excerpt : page.content,
              }}
            ></div>
            {/* Licensing block */}
            {!index &&
            article &&
            article.licenses &&
            Object.keys(article.licenses) ? (
              <ArticleLicensing.Cacheable
                page={page}
                config={config}
                helper={helper}
              />
            ) : null}
            {/* Tags */}
            {!index && page.tags && page.tags.length ? (
              <div class="article-tags is-size-7 mb-4">
                <span class="mr-2">#</span>
                {page.tags.map((tag) => {
                  return (
                    <a
                      class="link-muted mr-2"
                      rel="tag"
                      href={url_for(tag.path)}
                    >
                      {tag.name}
                    </a>
                  );
                })}
              </div>
            ) : null}
            {/* "Read more" button */}
            {/* {index && page.excerpt ? (
              <a
                class="article-more button is-small is-size-7"
                href={`${url_for(page.link || page.path)}#more`}
              >
                {__("article.more")}
              </a>
            ) : null} */}
            {/* Share button */}
            {!index ? (
              <Share config={config} page={page} helper={helper} />
            ) : null}
          </article>
        </div>
        {/* Adsense */}
        {!index ? (
          <div style="margin-top: 1rem;">
            <ins
              class="adsbygoogle"
              style="display:block"
              data-ad-client="ca-pub-9870073903926891"
              data-ad-slot="8204349881"
              data-ad-format="horizontal"
              data-full-width-responsive="true"
            ></ins>
            <script
              dangerouslySetInnerHTML={{
                __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
              }}
            ></script>
          </div>
        ) : null}
        {/* Donate button */}
        {!index ? <Donates config={config} helper={helper} /> : null}
        {/* Post navigation */}
        {!index && (page.prev || page.next) ? (
          <nav class="post-navigation mt-4 level is-mobile">
            {page.prev ? (
              <div class="level-start">
                <a
                  class={`article-nav-prev level level-item${
                    !page.prev ? " is-hidden-mobile" : ""
                  } link-muted`}
                  href={url_for(page.prev.path)}
                >
                  <i class="level-item fas fa-chevron-left"></i>
                  <span class="level-item">{page.prev.title}</span>
                </a>
              </div>
            ) : null}
            {page.next ? (
              <div class="level-end">
                <a
                  class={`article-nav-next level level-item${
                    !page.next ? " is-hidden-mobile" : ""
                  } link-muted`}
                  href={url_for(page.next.path)}
                >
                  <span class="level-item">{page.next.title}</span>
                  <i class="level-item fas fa-chevron-right"></i>
                </a>
              </div>
            ) : null}
          </nav>
        ) : null}
        {/* Comment */}
        {!index ? (
          <Comment config={config} page={page} helper={helper} />
        ) : null}
      </Fragment>
    );
  }
};
