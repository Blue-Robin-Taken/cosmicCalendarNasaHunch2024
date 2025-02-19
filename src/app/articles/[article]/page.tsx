import { url } from 'inspector';

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

    return <></>;
}
