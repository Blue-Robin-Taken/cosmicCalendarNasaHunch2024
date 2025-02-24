import { useEffect, useState } from 'react';

export default function LoadPosts() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('chat/api');
            const data = await res.json();
            setPosts(data);
        }
        fetchData();
    }, []);
    console.log(posts);
    return <>{JSON.stringify(posts)}</>;
}
