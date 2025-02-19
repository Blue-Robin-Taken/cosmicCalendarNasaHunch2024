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
    if (!articleJSON.Blogs.find((article) => article.title == articleParam)) {
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
    return (
        <>
            <div
                className=""
                dangerouslySetInnerHTML={{
                    __html: marked(markdownFile),
                }}
            ></div>
        </>
    );
}
