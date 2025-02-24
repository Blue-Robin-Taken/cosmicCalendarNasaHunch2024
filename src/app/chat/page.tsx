'use client';
import chatServerComponent from './actions';
import LoadPosts from './loadPosts';
export default function conversation() {
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        chatServerComponent(formData);
        console.log('sent');
    }
    return (
        <>
            <h1>Conversation</h1>
            <h2>Send a post here! (Nothing bad please!)</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" />
                <label>Post</label>
                <input type="text" name="body" />
                <button>Post!</button>
            </form>
            <LoadPosts />
        </>
    );
}
