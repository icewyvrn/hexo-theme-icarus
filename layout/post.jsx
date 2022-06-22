const { Component } = require('inferno');
const Article = require('./common/article');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;

        return <><div style="margin-bottom: 1rem;"><ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-9870073903926891"
         data-ad-slot="2892313450"
         data-ad-format="horizontal"></ins>
    <script
                  dangerouslySetInnerHTML={{
                    __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
                  }}></script></div><Article config={config} page={page} helper={helper} index={false} /></>;
    }
};
