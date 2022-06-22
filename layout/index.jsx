const { Component, Fragment } = require('inferno');
const Paginator = require('hexo-component-inferno/lib/view/misc/paginator');
const Article = require('./common/article');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;
        const { __, url_for } = helper;

        return <Fragment>
            <div style="margin-bottom: 1rem;"><ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-9870073903926891"
         data-ad-slot="2892313450"
         data-ad-format="horizontal"</ins>
    <script
                  dangerouslySetInnerHTML={{
                    __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
                  }}></script></div>
            {page.posts.map(post => <Article config={config} page={post} helper={helper} index={true} />)}
            {page.total > 1 ? <Paginator
                current={page.current}
                total={page.total}
                baseUrl={page.base}
                path={config.pagination_dir}
                urlFor={url_for}
                prevTitle={__('common.prev')}
                nextTitle={__('common.next')} /> : null}
        </Fragment>;
    }
};
