const { Component } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");

class Footer extends Component {
  render() {
    const {
      logo,
      logoUrl,
      siteUrl,
      siteTitle,
      siteYear,
      author,
      links,
      showVisitorCounter,
      visitorCounterTitle,
    } = this.props;

    let footerLogo = "";
    if (logo) {
      if (logo.text) {
        footerLogo = logo.text;
      } else {
        footerLogo = <img src={logoUrl} alt={siteTitle} height="28" />;
      }
    } else {
      footerLogo = siteTitle;
    }

    return (
      <footer class="footer">
        <div class="container">
          <div class="level">
            <div class="level-start">
              <a class="footer-logo is-block mb-2" href={siteUrl}>
                {footerLogo}
              </a>
              <p class="is-size-7">
                <span
                  dangerouslySetInnerHTML={{
                    __html: `&copy; ${siteYear} ${author || siteTitle}`,
                  }}
                ></span>
                &nbsp;&nbsp;Powered by{" "}
                <a href="https://hexo.io/" target="_blank" rel="noopener">
                  Hexo
                </a>
                &nbsp;&&nbsp;
                <a
                  href="https://github.com/ppoffice/hexo-theme-icarus"
                  target="_blank"
                  rel="noopener"
                >
                  Icarus
                </a>
                {showVisitorCounter ? <br /> : null}
                {showVisitorCounter ? (
                  <span
                    id="busuanzi_container_site_uv"
                    dangerouslySetInnerHTML={{ __html: visitorCounterTitle }}
                  ></span>
                ) : null}
              </p>
            </div>
            <div class="level-end">
              {/* {Object.keys(links).length ? <div class="field has-addons">
                            {Object.keys(links).map(name => {
                                const link = links[name];
                                return <p class="control">
                                    <a class={`button is-transparent ${link.icon ? 'is-large' : ''}`} target="_blank" rel="noopener" title={name} href={link.url}>
                                        {link.icon ? <i class={link.icon}></i> : name}
                                    </a>
                                </p>;
                            })}
                        </div> : null} */}
              <div class="field has-addons">
                <p class="control">
                  <a
                    class="button is-transparent is-large"
                    style="padding-left: 0.9em; padding-right: 0.9em;"
                    target="_blank"
                    rel="noopener"
                    title="RSS Feed"
                    href="/feed.xml"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rss" width="18" height="29"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
                  </a>
                </p>
                <p class="control">
                  <a
                    class="button is-transparent is-large"
                    style="padding-left: 0.9em; padding-right: 0.9em;"
                    target="_blank"
                    rel="noopener"
                    title="Sitemap"
                    href="/sitemap.xml"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

module.exports = cacheComponent(Footer, "common.footer", (props) => {
  const { config, helper } = props;
  const { url_for, _p, date } = helper;
  const { logo, title, author, footer, plugins } = config;

  const links = {};
  if (footer && footer.links) {
    Object.keys(footer.links).forEach((name) => {
      const link = footer.links[name];
      links[name] = {
        url: url_for(typeof link === "string" ? link : link.url),
        icon: link.icon,
      };
    });
  }

  return {
    logo,
    logoUrl: url_for(logo),
    siteUrl: url_for("/"),
    siteTitle: title,
    siteYear: date(new Date(), "YYYY"),
    author,
    links,
    showVisitorCounter: plugins && plugins.busuanzi === true,
    visitorCounterTitle: _p(
      "plugin.visitor_count",
      '<span id="busuanzi_value_site_uv">0</span>'
    ),
  };
});
