import React, { useEffect, useState } from 'react';
import axios from "axios";

function Top() {
    const [user, setUser] = useState({
        id: "",
        name: "",
        posts: "",
    });

    useEffect(() => {
        axios.get("http://localhost/users")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <p>{user.id}</p>
            <p>{user.name}</p>
        </>
    );
}

export default Top;
