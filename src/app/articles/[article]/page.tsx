import { url } from 'inspector';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { marked } from 'marked';
export default async function Page({
    params,
}: {
    params: Promise<{ article: string }>;
}) {
    const articleParam = decodeURI((await params).article);
    var fs = require('fs');

    var articleJSON = JSON.parse(
        fs.readFileSync('./src/app/articles/blogs.json', 'utf8')
    );

    if (
        !articleJSON.Blogs.find((article: any) => article.title == articleParam)
    ) {
        console.log(articleJSON, articleParam);
        return (
            <>
                <h1>Article Not Found!</h1>
            </>
        );
    }

    const markdownFile = fs.readFileSync(
        `./src/app/articles/files/${articleParam}.md`,
        'utf-8'
    );
    const article = articleJSON.Blogs.find(
        (article: any) => article.title == articleParam
    );

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1
                    className="text-4xl font-bold font-Chocolate mb-4 text-center text-lm-yellow-hl 
                            dark:text-dm-yellow-hl"
                >
                    {article.title}
                </h1>
                <h1 className="text-lm-p-text dark:text-white font-Lato mb-4 text-center">
                    Author: {article.author}
                </h1>
                <div className="flex flex-col font-Lato dark:text-white m-5 p-3 [&_p]:m-5 [&_p]:p-3 [&_p]:text-xl [&_h2]:text-5xl [&_h2]:p-3 [&_h2]:m-5 [&_h3]:text-3xl [&_h3]:p-2 [&_h3]:m-4 text-center justify-center [&>span]:flex [&>span]:flex-col [&>span]:p-3 w-3/4">
                    <Latex>{marked(markdownFile).toString()}</Latex>
                </div>
            </div>
        </>
    );
}
