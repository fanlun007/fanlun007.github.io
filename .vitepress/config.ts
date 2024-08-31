import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

//每页的文章数量
const pageSize = 10

export default defineConfig({
    title: 'Andrew blog',
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    description: 'vitepress,blog,blog-theme',
    ignoreDeadLinks: true,
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://github.com/fanlun008/fanlun008.github.io', //copyright link
        // 评论的仓库地址
        comment: {
            repo: 'airene/vitepress-blog-pure',
            themes: 'github-light',
            issueTerm: 'pathname'
        },
        nav: [
            { text: '主页', link: '/' },
            { text: '分类', link: '/pages/category' },
            { text: '标签', link: '/pages/tags' },
            { text: '于我', link: '/pages/about' }
            // { text: 'Airene', link: 'http://airene.net' }  -- External link test
        ],
        search: {
            provider: 'local'
        },
        //outline:[2,3],
        outline: {
            label: '文章摘要'
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/fanlun008/fanlun008.github.io' }]
    } as any,
    srcExclude: ['README.md'], // exclude the README.md , needn't to compiler

    vite: {
        //build: { minify: false }
        server: { port: 5000, hmr: true }
    }
    /*
      optimizeDeps: {
          keepNames: true
      }
      */
})
