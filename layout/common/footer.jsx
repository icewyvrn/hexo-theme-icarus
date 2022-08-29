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
        footerLogo = <img src={logoUrl} alt={siteTitle} height="28" width="109.95" />;
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
                    __html: `&copy; ${siteYear} ${siteTitle}`,
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
                    target="_blank"
                    rel="noopener"
                    title="RSS Feed"
                    href="/feed.xml"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" stroke="currentColor" width="17"><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM112 416c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm157.533 0h-34.335c-6.011 0-11.051-4.636-11.442-10.634-5.214-80.05-69.243-143.92-149.123-149.123-5.997-.39-10.633-5.431-10.633-11.441v-34.335c0-6.535 5.468-11.777 11.994-11.425 110.546 5.974 198.997 94.536 204.964 204.964.352 6.526-4.89 11.994-11.425 11.994zm103.027 0h-34.334c-6.161 0-11.175-4.882-11.427-11.038-5.598-136.535-115.204-246.161-251.76-251.76C68.882 152.949 64 147.935 64 141.774V107.44c0-6.454 5.338-11.664 11.787-11.432 167.83 6.025 302.21 141.191 308.205 308.205.232 6.449-4.978 11.787-11.432 11.787z"/></svg>
                  </a>
                </p>
                <p class="control">
                  <a
                    class="button is-transparent is-large"
                    target="_blank"
                    rel="noopener"
                    title="Sitemap"
                    href="/sitemap.xml"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor" width="19"><path d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/></svg>
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
