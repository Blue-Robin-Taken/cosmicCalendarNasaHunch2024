import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { marked } from 'marked';
import { promises as fs } from 'fs';
import path from 'path';

export default async function Page({
    params,
}: {
    params: Promise<{ article: string }>;
}) {
    const articleParam = decodeURI((await params).article);

    // Construct absolute path
    const jsonFilePath = path.join(
        process.cwd(),
        'src/app/articles/blogs.json'
    );
    const articlesData = await fs.readFile(jsonFilePath, 'utf8');
    const articleJSON = JSON.parse(articlesData);

    // Find article metadata
    const article = articleJSON.Blogs.find(
        (article: any) => article.title === articleParam
    );
    if (!article) {
        return <h1>Article Not Found!</h1>;
    }

    // Read Markdown file
    const markdownFilePath = path.join(
        process.cwd(),
        `src/app/articles/files/${articleParam}.md`
    );
    const markdownContent = await fs.readFile(markdownFilePath, 'utf8');

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold font-Chocolate mb-4 text-center text-lm-yellow-hl dark:text-dm-yellow-hl">
                {article.title}
            </h1>
            <h2 className="text-lm-p-text dark:text-white font-Lato mb-4 text-center">
                Author: {article.author}
            </h2>
            <div className="flex flex-col font-Lato dark:text-white m-5 p-3 text-center justify-center w-3/4">
                <Latex>{marked(markdownContent)}</Latex>
            </div>
        </div>
    );
}
