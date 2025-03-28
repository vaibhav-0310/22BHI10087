import React, { useEffect, useState } from 'react';
import axios from "axios";

function Popular() {
    const [posts, setPosts] = useState({
        id: "",
        postid: "",
        content: "",
    });

    useEffect(() => {
        axios.get("http://localhost/posts/?type=popular")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <p>{posts.id}</p>
            <p>{posts.id}</p>
            <p>{posts.content}</p>
        </>
    );
}

export default Popular;
