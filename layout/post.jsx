const { Component } = require('inferno');
const Article = require('./common/article');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;

        return <div><div class="card widget" data-type="adsense"><div class="card-content"><div class="menu"><h3 class="menu-label">Advertisement</h3><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9870073903926891"
     crossorigin="anonymous"></script>
<!-- reisuke-leaderboard-fixed -->
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-9870073903926891"
     data-ad-slot="5069768705"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script></div></div></div><Article config={config} page={page} helper={helper} index={false} /></div>;
    }
};
