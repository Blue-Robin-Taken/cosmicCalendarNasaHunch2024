export default function articles() {
    var fs = require('fs');

    var articleJSON = JSON.parse(
        fs.readFileSync('./src/app/articles/blogs.json', 'utf8')
    );
    return (
        <>
            <div className="flex flex-col p-3 m-1 justify-center items-center">
                <h1
                    className="m-10 text-4xl font-bold font-Chocolate mb-4 text-center text-lm-yellow-hl 
                            dark:text-dm-yellow-hl"
                >
                    Welcome to our blog!!!
                </h1>

                <i className="m-2 p-10 font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                    The following are written by the TerraChronos Team
                </i>

                <h2>Below are some of the blogs:</h2>
                <div>
                    {articleJSON.Blogs.map(
                        (
                            article: any // Note: remove any later or not hehe
                        ) => (
                            <div id={article.title}>
                                <h3>
                                    <a href={`./articles/${article.title}`}>
                                        {article.title}
                                    </a>
                                </h3>
                                <p>By: {article.author}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
