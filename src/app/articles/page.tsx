import fs from 'fs';
export default function articles() {
    let articleJSON = JSON.parse(
        fs.readFileSync('./src/app/articles/blogs.json', 'utf8')
    );
    return (
        <>
            <div className="flex flex-col p-3 m-1 justify-center items-center font-lato">
                <h1
                    className="m-10 text-4xl font-bold font-Chocolate mb-4 text-center text-lm-yellow-hl 
                            dark:text-dm-yellow-hl"
                >
                    Welcome to our blog!!!
                </h1>

                <i className="m-2 p-10 font-Lato text-3xl flex flex-col justify-center items-start text-lm-h1-text dark:text-dm-h1-text ps-16">
                    The following are written by the TerraChronos Team
                </i>

                <h2 className="align-middle text-center font-lato text-5xl">
                    Articles:
                </h2>
                <div>
                    {articleJSON.Blogs.map(
                        (
                            article // Note: remove any later or not hehe
                        ) => (
                            <div
                                key={article.title}
                                className="dark:bg-dm-grey p-5 rounded-md m-5 dark:text-dm-p-text justify-center align-middle flex flex-col bg-lm-navbar-text"
                            >
                                <a
                                    className="dark:text-dm-p-text text-lm-back font-lato text-3xl bg-lm-yellow p-3 rounded-lg m-5 align-middle"
                                    href={`./articles/${article.title}`}
                                >
                                    {article.title}
                                </a>

                                <p className="font-lato text-xl dark:text-lm-back align-middle p-3 m-3 text-lm-back">
                                    By: {article.author}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
