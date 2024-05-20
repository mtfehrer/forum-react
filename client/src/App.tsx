import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GenericPage from "./components/GenericPage";
import GenericLogin from "./components/GenericLogin";
import GenericForm from "./components/GenericForm";
import React, { useState, useEffect } from "react";

const App: React.FC = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState<
        { title: string; content: string; username: string; date: string }[]
    >([]);
    const [titleInput, setTitleInput] = useState<string>("");
    const [contentInput, setContentInput] = useState<string>("");
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + "/posts");
            const json = await response.json();
            setPosts(json);
        };
        getPosts();
    }, []);

    const updateInput = (field: string, input: string): void => {
        if (field === "username") {
            setUsernameInput(input);
        } else if (field === "password") {
            setPasswordInput(input);
        } else if (field === "Title") {
            setTitleInput(input);
        } else if (field === "Content") {
            setContentInput(input);
        }
    };

    const loginFetch = async (url: string) => {
        return await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
            }),
        });
    };

    const createPost = async () => {
        await fetch(process.env.REACT_APP_API_URL + "/createpost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") as string,
            },
            body: JSON.stringify({
                title: titleInput,
                content: contentInput,
                username: username,
            }),
        });
    };

    const onSignUp = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const response: Response = await loginFetch(process.env.REACT_APP_API_URL + "/create");

        if (response.status === 201) {
            setUsername(usernameInput);
            navigate("/");
        } else if (response.status === 500) {
            navigate("/error/servererror");
        }
    };

    const onSignIn = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const response: Response = await loginFetch(process.env.REACT_APP_API_URL + "/auth");

        let j = await response.json();

        if (response.status === 200) {
            setUsername(usernameInput);
            localStorage.setItem("token", "Bearer " + j["accessToken"]);
            navigate("/");
        } else if (response.status === 403 || response.status === 404) {
            navigate("/error/autherror");
        }
    };

    const onCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "") {
            alert("You must be signed in to create a post");
        } else {
            createPost();
            navigate("/");
        }
    };

    return (
        <>
            <Navbar username={username} />
            <Routes>
                <Route path="/" element={<Home postList={posts} />} />
                <Route
                    path="/about"
                    element={
                        <GenericPage
                            title="About"
                            content="This is a website dedicated to sharing information with all users of the site. To get started, create an account or log in to an existing one, then create a post!"
                        />
                    }
                />
                <Route
                    path="/contact"
                    element={<GenericPage title="Contact" content="I'm unavailable" />}
                />
                <Route
                    path="/signup"
                    element={
                        <GenericLogin title="Sign Up" onChange={updateInput} onSubmit={onSignUp} />
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <GenericLogin title="Sign In" onChange={updateInput} onSubmit={onSignIn} />
                    }
                />
                <Route
                    path="/createpost"
                    element={
                        <GenericForm
                            title="Create Post"
                            fields={["Title", "Content"]}
                            onChange={updateInput}
                            onSubmit={onCreatePost}
                        />
                    }
                />
                <Route path="/error">
                    <Route
                        path="/error/servererror"
                        element={<GenericPage title="Error" content="Internal server error" />}
                    />
                    <Route
                        path="/error/autherror"
                        element={<GenericPage title="Error" content="Incorrect login info" />}
                    />
                </Route>
                <Route path="*" element={<GenericPage title="Error" content="URL not found" />} />
            </Routes>
        </>
    );
};

export default App;
