/**
 * Twitter/X card image.
 *
 * Same artwork as the Open Graph image. Next requires a separate file
 * convention to emit the `twitter:image` tag, so this re-exports rather than
 * duplicating the design.
 */
export const dynamic = 'force-static';
export { default, alt, size, contentType } from './opengraph-image';
