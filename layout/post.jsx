const { Component } = require('inferno');
const Article = require('./common/article');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;

        return <><div><ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-9870073903926891"
         data-ad-slot="2788145755"
         data-ad-format="horizontal"
         data-full-width-responsive="true"></ins>
    <script
                  dangerouslySetInnerHTML={{
                    __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
                  }}></script></div><Article config={config} page={page} helper={helper} index={false} /></>;
    }
};
