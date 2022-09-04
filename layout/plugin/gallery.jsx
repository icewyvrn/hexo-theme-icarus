/**
 * Light Gallery and Justified Gallery plugins JSX component.
 * @module view/plugin/gallery
 */
const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

/**
 * Light Gallery and Justified Gallery plugins JSX component.
 *
 * @see http://sachinchoolur.github.io/lightGallery/
 * @see http://miromannino.github.io/Justified-Gallery/
 * @example
 * <Gallery
 *     head={true}
 *     lightGallery={{
 *         jsUrl: '/path/to/lightgallery.js',
 *         cssUrl: '/path/to/lightgallery.css'
 *     }}
 *     justifiedGallery={{
 *         jsUrl: '/path/to/justifiedGallery.js',
 *         cssUrl: '/path/to/justifiedGallery.css'
 *     }} />
 */
class Gallery extends Component {
  render() {
    const { head, justifiedGallery } = this.props;
    if (head) {
      return (
        <>
          <link rel="stylesheet" href={justifiedGallery.cssUrl} />
        </>
      );
    }

    const js = `window.addEventListener("load", () => {
            if (typeof $.fn.justifiedGallery === 'function') {
                if ($('.justified-gallery > p > .gallery-item').length) {
                    $('.justified-gallery > p > .gallery-item').unwrap();
                }
                $('.justified-gallery').justifiedGallery();
            }
        });`;

    return (
      <>
        <script src={justifiedGallery.jsUrl} defer={true}></script>
        <script dangerouslySetInnerHTML={{ __html: js }}></script>
      </>
    );
  }
}

/**
 * Cacheable Light Gallery and Justified Gallery plugins JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Gallery.Cacheable
 *     head={true}
 *     helper={{ cdn: function() {...} }} />
 */
Gallery.Cacheable = cacheComponent(Gallery, 'plugin.gallery', (props) => {
  const { head, helper } = props;
  return {
    head,
    justifiedGallery: {
      jsUrl: helper.cdn('justifiedGallery', '3.8.1', 'dist/js/jquery.justifiedGallery.min.js'),
      cssUrl: helper.cdn('justifiedGallery', '3.8.1', 'dist/css/justifiedGallery.min.css'),
    },
  };
});

module.exports = Gallery;
