import { url } from 'inspector';
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
                    Title: {article.title}
                </h1>
                <h1 className="text-lm-p-text dark:text-white font-Lato mb-4 text-center">
                    Author: {article.author}
                </h1>
                <div
                    className="text-white text-xl m-3 p-2"
                    dangerouslySetInnerHTML={{
                        __html: marked(markdownFile),
                    }}
                ></div>
            </div>
        </>
    );
}
