import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomeLayout from '../layouts/HomeLayout';

const HomeHoc = ({ component: Component, ...rest }) => {
    const Fun = (props) => {
        return (<HomeLayout ><Component{...props} /> </HomeLayout>);
    }
    return (
        <>
            <Routes >
                <Route {...rest} element={Fun(rest)} />
            </Routes>
        </>
    );
};

export default HomeHoc;