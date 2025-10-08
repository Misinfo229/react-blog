import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Posts } from "../components/pages/Posts";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { NewPost } from "../components/pages/NewPost";
import { Search } from "../components/pages/Search";
import { SinglePost } from "../components/pages/SinglePost";
import { Edit } from "../components/pages/Edit";

export const MainRouter = () => {
    return (
        <BrowserRouter>
            {/* Header */}
            <Header />

            {/* Main content */}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/posts" element={<Posts />}></Route>
                    <Route path="/new-post" element={<NewPost />}></Route>
                    <Route path="/edit/:id" element={<Edit />}></Route>
                    <Route path="/post/:id" element={<SinglePost />}></Route>
                    <Route path="/search/:search" element={<Search />}></Route>
                    <Route path="*" element={
                        <div className="post not-found">
                            <div className="post-title">Error 404</div>
                        </div>
                    }></Route>
                </Routes>
            </section>

            {/* Sidebar */}
            <Sidebar/>

            {/* Footer */}
            <Footer/>
        </BrowserRouter>
    );
}