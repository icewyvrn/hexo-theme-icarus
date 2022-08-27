const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class BackToTop extends Component {
    render() {
        const { title, jsUrl } = this.props;

        return <Fragment>
            <a id="back-to-top" title={title} href="javascript:;">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up" stroke-width="3" width="18" viewBox="0 0 24 17"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </a>
            <script src={jsUrl} defer></script>
        </Fragment>;

    }
}

BackToTop.Cacheable = cacheComponent(BackToTop, 'plugin.backtotop', props => {
    const { helper, head } = props;
    if (head) {
        return null;
    }
    return {
        title: helper.__('plugin.backtotop'),
        jsUrl: helper.url_for('/js/back_to_top.js')
    };
});

module.exports = BackToTop;
